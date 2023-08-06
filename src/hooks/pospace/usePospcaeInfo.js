import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { getCookie } from "../../Util/Cookie";
import Request from "../../Util/Request";
import useLatest from "../useLatest";

function usePospaceInfo({
  audioRef,
  pospaceInfo,
  getPospaceToken,
  getPospaceInfo,
  setPospaceInfo,
  selectPospaceId,
  comment,
  deleteCommentId,
  setGlobalMsg,
  inputState,
  setInputState,
  reportText,
  editForm,
  setLikePospaceID,
  setShowReportModal,
  setPospaceCommentList,
}) {
  const colorCodes = ["#fa6e85", "#675eb9", "#5bcff5", "#00695C", "#FFB300", "#00FFAA"];

  const jwt = getCookie("anonode_jwt");
  const [pospaceToken, setPospaceToken] = useState(undefined);

  const [myIdentifier, setMyIdentifier] = useState(undefined);

  const [wsId, setWsId] = useState(null);
  const [ws, setWs, wsRef] = useLatest(undefined);
  const [pcList, setPcList, pcListRef] = useLatest([]);
  const [dataChannel, setDataChannel, dataChannelRef] = useLatest([]);

  const [chatList, setChatList] = useState([]);

  // Audio

  // 오디오 스트림 state
  const [myStream, setMyStream] = useState(undefined);

  // 오디오 스트림이 변경될때 사용되는 state
  const [changeMyStream, setChangeMyStream, changeMyStreamRef] = useLatest(null);
  const [chageMystreamVolume, setChageMystreamVolume, chageMystreamVolumeRef] = useLatest(null);
  // 원격 피어로부터 오디오 스트림을 받기 위한 state
  const [receiveStreamList, setReceiveStreamList] = useState([]);

  const refSelectMic = useRef(null);
  const [showMessage, setShowMessage] = useState(true);

  const [myConfigStream, setMyConfigStream] = useState(null);
  const myConfigStreamRef = useRef(null);

  const [isMyselfMuted, setIsMyselfMuted, isMyselfMutedRef] = useLatest(true);
  const [isAllMuted, setIsAllMuted] = useState(true);

  const [micList, setMicList] = useState([]);
  const [receiveVolumeObj, setReceiveVolumeObj] = useState([]);

  // const [startMediaRequestId, setStartMediaRequestId] = useState();
  const startMediaRequestId = useRef();

  const [changeMediaRequestId, setChangeMediaRequestId] = useState();

  const [userList, setUserList] = useState([]);

  const receiveAudioRefs = useRef([]);

  const receiveVolumnRefs = useRef([]);

  const [micConnected, setMicConnected] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // window.addEventListener("beforeunload", navigateRoomList);

    if (selectPospaceId) {
      getPospaceInfo(request_getPospaceInfoReq);
    }
  }, [selectPospaceId]);

  useEffect(() => {
    if (myStream === undefined && pospaceInfo && pospaceInfo.tolkOpen === true) {
      const fetchData = async () => {
        await startMedia();
        await getMicList();
      };

      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          var microphoneExists = devices.some((device) => "audioinput" === device.kind);
          if (microphoneExists) {
            fetchData();
          } else {
            console.log("마이크가 연결되지 않았습니다. ");
          }
        })
        .catch((err) => {
          console.log(err.name + ": " + err.message);
        });
    }
  }, [pospaceInfo]);

  // PospaceInfo를 조회성공한후 마이크(myStream)가 연결되면
  // 대화기능을 수행하는 PospaceToken으로 웹소켓연결을 준비함
  // 만약 PospaceToken을 받아오지못하면 webSocketConnection은 수행되지않음
  useEffect(() => {
    if (myStream && myStream.getAudioTracks().length > 0 && pospaceToken === undefined) {
      getPospaceToken(request_getPospaceToken);
    }
  }, [myStream, pospaceToken]);

  useEffect(() => {
    if (pospaceToken && ws === undefined) {
      webSocketConnection(pospaceToken);
    }
  }, [pospaceToken]);

  useEffect(() => {
    if (wsId && ws?.readyState === WebSocket.OPEN) {
      console.log(" myStream , pospaceToken , 소켓검증을 모두통과후 start_call 호출");
      start_Call();
    } else {
      console.log("소켓이 OPEN 상태가 아님", ws, ws?.readyState);
    }
  }, [wsId]);

  useEffect(() => {
    if (ws && myStream && ws.readyState === WebSocket.OPEN) {
      ws.onmessage = (message) => {
        let content = JSON.parse(message.data);
        let event = content?.event;
        let data = content.data ? JSON.parse(content.data) : null;
        let senderSId = content?.senderSId;

        let nickName = content?.nickName;
        let userIdentifier = content?.userIdentifier;
        let profileImgFileUrl = content?.profileImgFileUrl;

        console.log("Got message: ", content, data);

        switch (event) {
          case "start_call":
            console.log("! switch start_call", pcList);
            handle_Start_Call(senderSId, nickName, userIdentifier, profileImgFileUrl);
            break;

          case "offer":
            console.log("! switch offer", pcList);
            handle_Offer(data, senderSId, nickName, userIdentifier, profileImgFileUrl);
            break;

          case "answer":
            console.log("! switch answer", pcList);
            handle_Answer(data, userIdentifier);
            break;

          case "candidate":
            console.log("! switch candidate", pcList);
            handle_Candidate(data, userIdentifier);
            break;

          case "broadcast_GoodBye":
            console.log("! switch handle_Broadcast_GoodBye");
            handle_Broadcast_GoodBye(content);
            break;

          case "server_message":
            console.log("! switch server_message", pcList);
            handle_Server_Message(content);

            break;
          default:
            break;
        }
      };
    }
  }, [ws, myStream, pcList, dataChannel]);

  function webSocketConnection(pospaceToken) {
    // 유저의 토큰과 방 입장 토큰을 소켓의 요청 파라미터로 전달함

    const endpoint = `/ws?pospaceToken=${pospaceToken}&anonode_jwt=${jwt}`;

    // 'http'를 'ws'로 바꾼다 https도 적용됨
    const baseUrl = process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_LOCAL_URL;
    const url = `${baseUrl}${endpoint}`;

    const socket = new SockJS(url);

    // 이벤트 핸들러 등록
    socket.onopen = () => {
      console.log("온 오픈 소켓", jwt);
      setWs(socket);
      setWsId(getWsid(socket));
    };

    // 이벤트 핸들러 등록
    socket.onclose = (event) => {
      console.log("onclose event ", event);
      console.log(`Socket 닫힘. Code: ${event.code}, Reason: ${event.reason}`);
    };
  }

  const getWsid = (ws) => {
    const url = ws._transport.url;
    // const regex = /\/(\w+)\/websocket/;
    const regex = /\/ws\/\d+\/([^\/]+)\//;
    const match = url.match(regex);

    return match ? match[1] : null;
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      // 라우트가 변경될 때마다 cleanup을 실행
      cleanup();
    }
  }, [location, selectPospaceId]);

  const cleanup = () => {
    const myConfigStream = myConfigStreamRef.current;
    const ws = wsRef.current;
    const pcList = pcListRef.current;
    const dataChannel = dataChannelRef.current;

    if (myConfigStream) {
      myConfigStream.getTracks().forEach((track) => track.stop());
    }

    if (ws) {
      ws.onmessage = null;
      ws.onopen = null;
      ws.onclose = null;
      ws.onerror = null;
      ws.close();
      setWs(null);
    }
    pcList.forEach((pc, idx) => {
      pc?.close();
    });
    dataChannel.forEach((dc, idx) => {
      dc?.close();
    });
  };

  const send = useCallback(
    (message) => {
      ws?.send(JSON.stringify(message));
      console.log("시그널링 서버로 send :", message);
    },
    [ws]
  );

  function start_Call() {
    send({
      event: "start_call",

      senderSId: wsId,
      jwt: jwt,
    });
  }

  function renewalChatList(nickName, profileImgFileUrl, userIdentifier, message, msgType) {
    setChatList((prev) => [
      ...prev,
      { nickName: nickName, profileImgFileUrl: profileImgFileUrl, userIdentifier: userIdentifier, message: message, msgType: msgType },
    ]);
  }

  // sendmessage
  function chatget(param) {
    // string을 json으로 변환
    console.log("chatget ", param.data);

    const dataResult = JSON.parse(param.data);
    // const senderIdentifier = param.target.label;
    // const channelName = param.target.label;

    const senderIdentifier = param.target.label.split("-")[0];

    if (dataResult.message == "" || dataResult.message == null) {
      return;
    }

    console.log("pcListRef.current ", pcListRef.current, senderIdentifier);
    const nickName = pcListRef.current.find((pc) => pc.userIdentifier === senderIdentifier).nickName;
    const profileImgFileUrl = pcListRef.current.find((pc) => pc.userIdentifier === senderIdentifier).profileImgFileUrl;
    const userIdentifier = pcListRef.current.find((pc) => pc.userIdentifier === senderIdentifier).userIdentifier;
    renewalChatList(nickName, profileImgFileUrl, userIdentifier, dataResult.message, "regular");
  }

  function handle_Broadcast_GoodBye(content) {
    console.log("Got handle_Broadcast_GoodBye : ", content);

    const senderIdentifier = content?.userIdentifier;
    const senderSId = content?.senderSId;

    const newPcList = pcList.filter((pc) => pc.userIdentifier != senderIdentifier);
    setPcList(newPcList);

    const newReceiveStreamList = receiveStreamList.filter((item) => item.userIdentifier != senderIdentifier);
    setReceiveStreamList(newReceiveStreamList);

    // GoodBye이벤트를 보낸 pc와 일치하는 객체를 찾아 제거하고 새 배열을 반환

    const newDataChannel = dataChannel.filter((prev) => prev.label.split("-")[1] != senderIdentifier);

    setDataChannel(newDataChannel);
  }

  function handle_Server_Message(content) {
    console.log("Got handle_Server_Message : ", content);
    renewalChatList(content.nickName, content.message, content.msgType);
    // setChatList((prev) => [...prev, { nickName: content.nickName, message: content.message, msgType: content.msgType }]);
  }

  const [eventObj, setEventObj] = useState({});
  const [senderIdentifierValue, setSenderIdentifierValue] = useState([]);

  // 신규참가자 -> 기존참가자
  // 기존 참여자가 start_Call 요청을 받으면 새 참여자와 연결되는 각 peerConnection를 생성하고 userIdentifier를 추가하여 원격 피어를 식별할수있게 한다
  async function handle_Start_Call(senderSId, nickName, senderIdentifier, profileImgFileUrl) {
    // STUN 서버 설정 추가
    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
      ],
    };

    // // 새 참여자와 연결되는 각 peerConnection를 생성하고 userIdentifier를 추가하여 원격 피어를 식별할수있게 한다
    // const newPc = new RTCPeerConnection(configuration);

    // 새 참여자와 연결되는 각 peerConnection를 생성하고 userIdentifier를 추가하여 원격 피어를 식별할수있게 한다
    const newPc = new RTCPeerConnection(configuration);

    newPc.nickName = nickName;
    newPc.userIdentifier = senderIdentifier;
    newPc.profileImgFileUrl = profileImgFileUrl;
    setPcList((prev) => [...prev, newPc]);

    newPc.addEventListener("iceconnectionstatechange", (event) => {
      console.log("ICE connection state change: ", event, newPc);

      if (newPc.iceConnectionState === "connected" || newPc.iceConnectionState === "completed") {
        const { [newPc.userIdentifier]: _, ...newObj } = eventObj;
        const copySenderIdentifierValue = [...senderIdentifierValue];

        setEventObj(newObj);
        setSenderIdentifierValue(copySenderIdentifierValue.filter((item) => item !== newPc.userIdentifier));

        console.log("성공적인 연결이 완료됨 : ", newPc);
        console.log("iceConnectionState : ", newPc.iceConnectionState);
      }
    });

    // 오디오 track 송신 및 수신 코드
    // 원격 피어의 audio track을 수신하기 위한 이벤트 리스너
    newPc.addEventListener("track", (event) => {
      console.log(`원격 피어 ${senderSId}---${senderIdentifier}의 오디오 스트림 수신됨 -------------------`, event.streams[0]);
      let receiveAudioObj = { userIdentifier: senderIdentifier, stream: event.streams[0] };
      setReceiveStreamList((prevState) => [...prevState, receiveAudioObj]);
    });

    const audioStream = myStream;
    const audioTrack = audioStream.getAudioTracks()[0];
    // 내 피어 커넥션이 생성된 이후 즉시 addTrack을 한다 첫째 인자는 Stream에서의 Track부분, 둘째 인자는 Stream 자체
    // 시그널링 프로세스 도중에 예외가 발생하거나 지연될우려가 있기 때문
    newPc.addTrack(audioTrack, myStream);

    // WebRTC에서 로컬 후보자가 생성되기전에 candidate 리스너를 등록한다, 이후 로컬후보자가 생성되면 아래 이벤트 핸들러가 발동한다

    newPc.addEventListener("icecandidate", (event) => {
      console.log(event.candidate, "캔디데이트");
      if (event.candidate) {
        for (let i = 0; i < 50; i++) {
          send({
            event: "candidate",
            data: event.candidate,
            senderSId: wsId,
            jwt: jwt,
            mediatorUseSid: senderSId,
          });
        }
      }
    });

    // 상대방의 SDP를 전달받으면 그안에 포함되어있는 데이터 채널을 포착할수있도록 핸들러를 미리 등록함
    newPc.addEventListener("datachannel", function (event) {
      console.log("데이터 채널이 생성됨, ", event.channel);
      setDataChannel((prev) => [...prev, event.channel]);
    });

    const channelName = senderIdentifier + "-" + myIdentifier;

    // senderSId를 식별자로 한 데이터 채널 생성함 - 이때 상대방은  newPc.addEventListener("datachannel") 가 발동됨
    const dataChannelValue = newPc.createDataChannel(channelName, {
      reliable: true,
    });

    // 상대 피어로부터 채팅 메세지를 받는 이벤트 리스너
    dataChannelValue.addEventListener("message", chatget);

    newPc
      .createOffer()
      .then((offer) => newPc.setLocalDescription(offer))
      .then(() => {
        send({
          event: "offer",
          // data: offer,
          data: newPc.localDescription,

          senderSId: wsId,
          jwt: jwt,
          mediatorUseSid: senderSId,
        });
      })
      .then(() => {
        setSenderIdentifierValue((prev) => [...prev, { [senderIdentifier]: senderSId }]);
      })
      .catch((reason) => {
        console.error("연결중 offer 문제가 발생하였습니다 : ", reason);
      });
  }

  // 기존참가자 -> 신규참가자
  // 새 참여자에게 기존 참여자에게 offer를 받고 새 참여자가 다시 answer를 보내는 핸들러
  async function handle_Offer(data, senderSId, nickName, senderIdentifier, profileImgFileUrl) {
    // 이자리에서 조금 늦게 도착하는 candidate를 기다리기위해 기다리기
    // STUN 서버 설정 추가

    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
      ],
    };

    // 새 참여자와 연결되는 각 peerConnection를 생성하고 userIdentifier를 추가하여 원격 피어를 식별할수있게 한다
    const newPc = new RTCPeerConnection(configuration);

    newPc.setRemoteDescription(new RTCSessionDescription(data));

    newPc.nickName = nickName;
    newPc.userIdentifier = senderIdentifier;
    newPc.profileImgFileUrl = profileImgFileUrl;
    setPcList((prev) => [...prev, newPc]);

    newPc.addEventListener("iceconnectionstatechange", (event) => {
      console.log("ICE connection state change2: ", event, newPc);

      if (newPc.iceConnectionState === "connected" || newPc.iceConnectionState === "completed") {
        console.log("성공적인 연결이 완료됨2 : ", newPc.nickName);
        console.log("iceConnectionState : ", newPc.iceConnectionState);
        // 입장을 하는 피어는 연결이 완료되었다고 기존유저가 입장했다고 쓸필요가없다
        // 퇴장을 하는 피어는 기존에 퇴장유저와 연결되어있던 유저들에게만 퇴장했다고 써야한다
      }
    });

    // 오디오 track 송신 및 수신 코드
    // 원격 피어의 audio track을 수신하기 위한 이벤트 리스너
    newPc.addEventListener("track", (event) => {
      console.log(`원격 피어 ${senderSId}---${senderIdentifier}의 오디오 스트림 수신됨 -------------------`, event.streams[0]);
      let receiveAudioObj = { userIdentifier: senderIdentifier, stream: event.streams[0] };
      setReceiveStreamList((prevState) => [...prevState, receiveAudioObj]);
    });

    const audioStream = myStream;
    const audioTrack = audioStream.getAudioTracks()[0];
    // 내 피어 커넥션이 생성된 이후 즉시 addTrack을 한다 첫째 인자는 Stream에서의 Track부분, 둘째 인자는 Stream 자체이다
    // 시그널링 프로세스 도중에 예외가 발생하거나 지연될우려가 있기 때문암
    newPc.addTrack(audioTrack, myStream);

    // WebRTC에서 로컬 후보자가 생성되기전에 candidate 리스너를 등록한다, 이후 로컬후보자가 생성되면 아래 이벤트 핸들러가 발동한다
    newPc.addEventListener("icecandidate", (event) => {
      console.log(event.candidate, "캔디데이트");
      if (event.candidate) {
        for (let i = 0; i < 40; i++) {
          send({
            event: "candidate",
            data: event.candidate,
            senderSId: wsId,
            jwt: jwt,
            mediatorUseSid: senderSId,
          });
        }
      }
    });

    // 상대방의 SDP를 전달받으면 그안에 포함되어있는 데이터 채널을 포착할수있도록 핸들러를 미리 등록함
    newPc.addEventListener("datachannel", function (event) {
      console.log("데이터 채널이 생성됨, ", event.channel);
      setDataChannel((prev) => [...prev, event.channel]);
    });

    const channelName = senderIdentifier + "-" + myIdentifier;

    const dataChannelValue = newPc.createDataChannel(channelName, {
      reliable: true,
    });

    console.log("dataChannelValue : ", dataChannelValue, 48);

    // 상대 피어가 호출한 sendMessage에 있는 메세지를 받는 이벤트 리스너
    dataChannelValue.addEventListener("message", chatget);
    dataChannelValue.addEventListener("onerror ", (event) => console.log(`데이터채널 error : `, event));

    // setDataChannel((prev) => [...prev, dataChannelValue]);

    newPc
      .createAnswer()
      .then((answer) => newPc.setLocalDescription(answer))
      .then(() => {
        send({
          event: "answer",
          data: newPc.localDescription,
          senderSId: wsId,
          jwt: jwt,
          mediatorUseSid: senderSId,
        });
      })
      .then(() => {
        setSenderIdentifierValue((prev) => [...prev, { [senderIdentifier]: senderSId }]);
      })
      .catch((reason) => {
        console.error("연결중 answer 문제가 발생하였습니다 : ", reason);
      });
  }

  // 신규참가자 -> 기존참가자가 받음
  // 기존 참여자가 Answer을 받고 원격설정을 한뒤 시그널링이 완료됨.
  function handle_Answer(data, senderIdentifier) {
    if (pcList.length > 0) {
      pcList.map((pc) => {
        if (pc.userIdentifier === senderIdentifier) {
          pc.setRemoteDescription(new RTCSessionDescription(data));
          console.log("Answer 원격 설정 완료");
        } else {
          console.log("연결되지 않은 pc");
        }
      });
    }
  }

  function handle_Candidate(data, senderIdentifier) {
    pcList.map((pc) => {
      if (pc.userIdentifier === senderIdentifier) {
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  }

  // pcList, receiveStreamList이 변경될때 실행되며 아래 유효성 검사 모두 통과시에만 실행됨
  // headerSetUserList: userList를 생성 , volumeMeasurement: 원격 피어들인 userList가 생성되면 오디오 스트림 프로퍼티를 통해 원격 volumeList를 생성
  useEffect(() => {
    if (
      pcList &&
      receiveStreamList &&
      pcList.length === receiveStreamList.length // 들어오는 순서가 다를수 있으니 들어오는 타이밍을 일치시키기위해 갯수까지 유효성 검사실행
    ) {
      headerSetUserList(pcList, receiveStreamList);
    }
  }, [pcList, receiveStreamList]);

  useEffect(() => {
    if (changeMyStream) {
      console.log("오디오 변경시 실행");
      const updatedAudioTrack = changeMyStream.getAudioTracks()[0];
      console.log("Updated audio track:", updatedAudioTrack);

      const replaceTrackPromises = pcList.map((pc, index) => {
        console.log(`작업 커넥션 ${index + 1}`);
        const sender = pc.getSenders().find((sender) => sender.track.kind === "audio");

        const oldTrack = sender.track;
        console.log("oldTrack ", oldTrack);

        return sender
          .replaceTrack(updatedAudioTrack)
          .then(() => {
            oldTrack.stop(); // Replace track이 성공적으로 완료되면 이전 트랙을 중지
          })
          .catch((error) => {
            console.log("트랙교체 에러 : ", index + 1, error);
          });
      });

      Promise.all(replaceTrackPromises)
        .then(() => console.log("트랙교체 성공"))
        .catch((error) => console.error("트랙교체 에러 : ", error));
    }
  }, [changeMyStream]);

  async function headerSetUserList(pcList, receiveStreamList) {
    console.log("headerSetUserList", receiveStreamList, pcList);
    // 새 유저 배열을 매번만들어 추가와 삭제 모두 반영된 배열을 만든다
    // 또한 유효성 검사를 통해 오디오 스트림과 피어커넥션의 데이터 정합성 보장한다
    const newUserList = await Promise.all(
      pcList.map(async (pc, index) => {
        const findReceiveStreamObj = receiveStreamList.find((receiveStream) => receiveStream.userIdentifier === pc.userIdentifier);

        return {
          userIdentifier: pc.userIdentifier,
          name: pc.nickName,
          audioStream: findReceiveStreamObj.stream,
        };
        // 이전값을 복사한다면 제거는 안되고 추가만 되는데 이전값을 복사하지 않으면 제거는 되고 추가도 된다
      })
    );
    // newUserList의 user.audioStream , user.userIdentifier , userLisst가 존재할떄만 실행
    if (newUserList.every((user) => user.audioStream && user.userIdentifier) && newUserList.length > 0) {
      receiveMedia(newUserList);
    } else if (newUserList.length == 0) {
    }

    setUserList(newUserList);
  }

  useEffect(() => {
    if (userList.length > 0) {
      receiveAudioRefs.current.forEach((item, index) => {
        if (item && item.srcObject == null) {
          const userIdentifier = item.getAttribute("data-useridentifier");
          const user = userList.find((user) => user.userIdentifier === userIdentifier);

          if (user && user.audioStream) {
            item.srcObject = user.audioStream;
          }
        }
      });
    }
  }, [userList]);

  // 원격 피어 오디오 receiveStreamList를 받아서 audio 태그의 receiveAudioRef에 할당하는 함수

  // 마이크 목록을 가져오고 선택하는 함수
  async function getMicList() {
    console.log("getMicList", navigator.mediaDevices);
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter((device) => device.kind === "audioinput");
      setMicList(audioDevices);
    } catch (error) {
      const newErrorMessage = error?.response?.data;
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
    }
  }

  // 기본 마이크 장치만 반환하는 함수
  async function getDefaultMicrophone() {
    // enumerateDevices는 Promise를 반환함으로 값으로 사용
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter((device) => device.kind === "audioinput");
    const defaultMic = audioDevices.find((device) => device.deviceId === "default");
    console.log("전체 오디오: ", audioDevices);
    console.log("기본 오디오 장치: ", defaultMic);
    return defaultMic;
  }

  // 마이크를 선택하면 선택한 audio정보를 가지고 오디오 Stream을 생성함
  function audioSetting(deviceId) {
    return {
      video: false,
      audio: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        // AGC(Automatic Gain Control), 마이크의 입력 볼륨을 조정하여 모든 참가자에게
        // 균일한 오디오 레벨을 보장한다
        autoGainControl: true,

        // AEC (반향 제거), 마이크에서 캡처한 오디오에서 에코(반향)을 제거하는 데 사용되는 음향 기술이며
        // 스피커에서 나오는 오디오를 마이크로 캡처하기 전에 식별하고 제거하여 피드백 루프를 방지한다
        // 일반적인 반향은 벽이나 바닥, 천장 등의 표면에서 발생하는 반사된 소리이지만, 나의 경우 내 스피커에서 나오는 한 사이클을 돌아온 내목소리를 반향으로 인식하기 때문에 효과는 있다

        // 문제1 : true로 설정시 반향과 함께 중간중간 마이크소리를 제거하는 문제가 있다 , 3.25: 모바일 수화기모드에서 테스트해봄 autoGainControl 설정이 없어도 마이크 제거가 발생하지 않고 양쪽 모두 잘들렸음
        // 문제2 : false로 설정시 하울링을 제거하지못하는 문제가 발생했다
        // 특이점 : true로 설정시 스마트폰에서는 미디어 음량과 마이크 사용에서 -> 통화모드로 스피커 음량이 바뀜 이때 통화모드에서 스피커모드 , 수화기모드가 존재한다
        // true로 설정시 통화모드에 따라 마이크 감도가 바뀐다 이때 수화기모드시 입과 모바일 하단의 감도정도에서만 작동된다
        echoCancellation: true,

        // 노이즈 억제, 캡처된 오디오 스트림의 배경 노이즈를 줄여 전반적인 오디오 품질을 향상시킨다
        // 문제 : true로 설정시 소리를 제거하진 않지만 5초이상 이어서 말하게 될경우 마이크의 음량을 줄여버리는 문제가 있다
        noiseSuppression: true,
      },
    };
  }

  async function startMedia() {
    try {
      // Promise를 사용하여 내 오디오 장치를 생성
      const defaultMic = await getDefaultMicrophone();

      // 오디오 설정을 위한 Constraints 생성
      const audioConstraints = audioSetting(defaultMic ? defaultMic.deviceId : refSelectMic.current.value);

      // Promise를 사용하여 내 오디오 스트림을 생성
      const myAudioStreamValue = await navigator.mediaDevices.getUserMedia(audioConstraints);

      if (!myAudioStreamValue) {
        throw new Error("오디오 스트림 error");
      }

      audioRef.current.srcObject = myAudioStreamValue;

      // setMyStream이 호출되야 대화방의 start_Call , ws.onmessage을 사용할수있도록 만든다
      setMyStream(myAudioStreamValue);
      setMyConfigStream(myAudioStreamValue);
      myConfigStreamRef.current = myAudioStreamValue;
    } catch (error) {
      const newErrorMessage = error?.response?.data;
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
      console.log("startMedia error catch : ", error);
    }
  }

  // 내 오디오(마이크) Stream을 변경하고 출력값에 할당 하는 함수
  const changeMedia = useCallback(async () => {
    try {
      const changeMicId = refSelectMic.current.value;

      // Promise를 사용하여 내 오디오 스트림을 생성
      const changeAudioStreamValue = await navigator.mediaDevices.getUserMedia(audioSetting(changeMicId));

      if (!changeAudioStreamValue) {
        throw new Error("오디오 스트림 error");
      }

      audioRef.current.srcObject = changeAudioStreamValue;

      changeAudioStreamValue.getAudioTracks().forEach((track) => {
        track.enabled = isMyselfMuted; // 모든 오디오 트랙을 비활성화(음소거)
      });

      setChangeMyStream(changeAudioStreamValue);
      setMyConfigStream(changeAudioStreamValue);
    } catch (error) {
      const newErrorMessage = error?.response?.data;
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
      console.log("startMedia error catch : ", error);
    }
  }, [isMyselfMuted]);

  async function receiveMedia(newUserList) {
    newUserList.map((user, idx) => {
      const audioContext = new AudioContext();
      const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(user.audioStream);
      const analyserNode = audioContext.createAnalyser();
      mediaStreamAudioSourceNode.connect(analyserNode);

      const pcmData = new Float32Array(analyserNode.fftSize);

      // 상대방의 볼륨을 측정하여 말하고있다는 모션을 조명요소를 통해 제어하기
      const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);

        let sumSquares = 0.0;
        for (const amplitude of pcmData) {
          sumSquares += amplitude * amplitude;
        }

        let resultVolume = Math.sqrt(sumSquares / pcmData.length) * 15;

        const LightElement = receiveVolumnRefs.current.find((item) => item && item.getAttribute("data-useridentifier") === user.userIdentifier);

        const volumeValue = resultVolume * 10;

        if (LightElement) {
          LightElement.value = volumeValue;

          const LightElementIndex = LightElement.getAttribute("data-userindex");

          const color = colorCodes[LightElementIndex];

          if (LightElement && volumeValue > 0) {
            LightElement.style.boxShadow = `
              0 0 ${volumeValue * 15 * 2}px ${volumeValue}px ${color}, 
              0 0 ${volumeValue * 25 * 2}px ${volumeValue * 2}px ${color}, 
              0 0 ${volumeValue * 35 * 2}px ${volumeValue * 3}px ${color}, 
              0 0 ${volumeValue * 45 * 2}px ${volumeValue * 4}px ${color}, 
              0 0 ${volumeValue * 55 * 2}px ${volumeValue * 5}px ${color}
            `;
            LightElement.style.backgroundColor = color;
          }
        }

        window.requestAnimationFrame(onFrame);
      };
      window.requestAnimationFrame(onFrame);
    });
  }

  // 마이크 변경을 수행한다
  // 이전 오디오기기의 볼륨 측정 requestAnimationFrame를 취소시키고 changeMedia하는 함수
  function prevVolMeasStop(e) {
    if (startMediaRequestId) {
      window.cancelAnimationFrame(startMediaRequestId);
      // setStartMediaRequestId(null);
      startMediaRequestId.current = null;
    }
    window.cancelAnimationFrame(changeMediaRequestId);
    changeMedia(e);
  }

  // 내 마이크를 음소거 한다
  const muteMyself = useCallback(() => {
    if (myConfigStream) {
      myConfigStream.getAudioTracks().forEach((track) => {
        console.log("track : ", track, myConfigStream, isMyselfMuted, isMyselfMutedRef.current);
        track.enabled = !isMyselfMuted;
      });
      setIsMyselfMuted(!isMyselfMuted);
    }
  }, [myConfigStream, isMyselfMuted]);

  // 전체 대화자들을 음소거 한다
  const muteAll = useCallback(() => {
    receiveAudioRefs.current.forEach((audioElem) => {
      if (audioElem) {
        audioElem.muted = isAllMuted;
      }
    });
    setIsAllMuted((prevState) => !prevState);
  }, [receiveAudioRefs, isAllMuted]);

  const request_getPospaceToken = useMemo(() => {
    return new Request(
      "/pospace/access",
      {
        params: {
          pospaceId: selectPospaceId,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        const myIdentifier = Object.keys(res.data);
        const pospaceToken = Object.values(res.data);
        setMyIdentifier(myIdentifier[0]);
        setPospaceToken(pospaceToken[0]);
      },
      null,
      null
    );
  }, [selectPospaceId, jwt]);

  const request_getPospaceInfoReq = useMemo(() => {
    return new Request(
      "/view/pospace/info",
      {
        params: {
          pospaceId: selectPospaceId,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setPospaceInfo(res.data);
        setMyIdentifier(res.data);
      },
      null,
      null
    );
  }, [selectPospaceId, jwt]);

  const request_deletePospaceReq = useMemo(() => {
    return new Request(
      "/pospace/delete",
      {
        params: {
          pospaceId: selectPospaceId,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      null,
      null,
      null
    );
  }, [selectPospaceId, jwt]);

  const request_postPospaceComment = useMemo(() => {
    return new Request(
      "/pospace/comment/create",
      {
        headers: {
          Authorization: jwt,
        },
      },
      { pospaceId: selectPospaceId, pospaceCommentContent: comment },
      (res) => {
        setPospaceCommentList(res.data);
      },
      null,
      null
    );
  }, [comment, selectPospaceId, jwt]);

  const request_deletePospaceComment = useMemo(() => {
    return new Request(
      "/pospace/comment/delete",
      {
        params: {
          commentId: deleteCommentId,
        },

        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setPospaceCommentList(res.data);
      },
      null,
      null
    );
  }, [deleteCommentId, jwt]);

  const request_getPospaceComment = useMemo(() => {
    return new Request(
      "/pospace/comment/list",
      {
        params: {
          pospaceId: selectPospaceId,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setPospaceCommentList(res.data);
      },
      null,
      null
    );
  }, [selectPospaceId]);

  const request_postPospaceLike = useMemo(() => {
    return new Request(
      "/pospace/like",
      {
        params: {
          pospaceId: selectPospaceId,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      () => {
        console.log("pospaceInfo ", pospaceInfo);
        setPospaceInfo((prevState) => ({
          ...prevState,
          pospaceLikeCount: prevState.pospaceLikeCount + 1,
        }));
      },
      null,
      () => {
        setLikePospaceID(null);
      }
    );
  }, [selectPospaceId, jwt]);

  const request_postPospaceReport = useMemo(() => {
    return new Request(
      "/pospace/report",
      {
        headers: {
          Authorization: jwt,
        },
      },
      {
        pospaceId: selectPospaceId,
        reportReason: reportText,
      },
      () => {
        setShowReportModal(false);
        setGlobalMsg((prev) => [...prev, "신고가 접수되었습니다"]);
      },
      null,
      null
    );
  }, [selectPospaceId, reportText, jwt]);

  const request_patchPospace = useMemo(() => {
    return new Request(
      "/pospace/update",
      {
        headers: {
          Authorization: jwt,
        },
      },
      {
        pospaceId: selectPospaceId,
        visibility: editForm.visibility === "" ? null : editForm.visibility,
        tolkOpen: editForm.tolkOpen,
        pospaceContent: editForm.pospaceContent,
        maxAnnode: editForm.maxAnnode === "" ? null : editForm.maxAnnode,
        deleteFileImgList: editForm.deleteFileImgList,
      },
      () => {
        getPospaceInfo(request_getPospaceInfoReq);
      },
      null,
      null
    );
  }, [selectPospaceId, editForm, jwt]);

  const onEnterPressedMessage = (event) => {
    if (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (inputState !== "") {
          sendMessage(null, inputState, "regular");
          setInputState("");
        }
      }
    } else {
      if (inputState !== "") {
        sendMessage(null, inputState, "regular");
        setInputState("");
      }
    }
  };

  const onEnterPressedComment = (event, postPospaceComment, setComment) => {
    if (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (comment !== "") {
          postPospaceComment(request_postPospaceComment);
          setComment("");
        }
      }
    } else {
      if (comment !== "") {
        postPospaceComment(request_postPospaceComment);
        setComment("");
      }
    }
  };

  const sendMessage = useCallback(
    (event, message, myIdentifier) => {
      const messageData = JSON.stringify({ message: message, myIdentifier: myIdentifier });
      console.log("sendMessaging", message);

      dataChannel.map((channel) => {
        if (channel.readyState === "open") {
          channel.send(messageData);
        } else if (channel.readyState === "closed") {
          console.log(`${channel} 데이터채널이 closed 입니다. 제거합니다.`);
          setDataChannel((prev) => prev.filter((ch) => ch !== channel));
        }
      });

      // setChatList((prev) => [...prev, { nickName: "Me", message: inputState, msgType:  }]);
      renewalChatList(" ", null, null, inputState, "regular");
      setInputState("");
    },
    [dataChannel, inputState]
  );

  return {
    myIdentifier,
    userList,
    receiveAudioRefs,
    receiveVolumnRefs,
    isMyselfMuted,
    muteMyself,
    isAllMuted,
    muteAll,

    chatList,

    micList,
    refSelectMic,
    prevVolMeasStop,
    webSocketConnection,
    onEnterPressedComment,
    onEnterPressedMessage,
    request_getPospaceInfoReq,
    request_deletePospaceReq,
    request_postPospaceLike,
    request_postPospaceReport,
    request_patchPospace,
    request_deletePospaceComment,
    request_getPospaceComment,
    cleanup,
  };
}

export default usePospaceInfo;
