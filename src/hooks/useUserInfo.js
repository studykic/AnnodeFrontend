import { debounce } from "lodash";
import { useMemo } from "react";
import { getCookie } from "../Util/Cookie";
import Request from "../Util/Request";
import useLatest from "./useLatest";

// latestValueRef는 항상 즉시 변경되는 상태값을 가리킨다.
function useUserInfo({ modalRef, scrollAreaRef, userInfoModal, setUserInfo, setUserPospaceList, isFirstReq, setGlobalMsg }) {
  const jwt = getCookie("anonode_jwt");
  const initCursor = 1;
  const [userPospaceCursor, setuserPospaceCursor, userPospaceCursorRef] = useLatest(initCursor);

  const scrollEvent = debounce(
    (getRoomList, request_getRoomListReq2) => {
      const eventRate = 0.8;
      const totalWindowHeight = scrollAreaRef.current.scrollHeight; // Use the modal's scrollHeight
      const clientHeight = scrollAreaRef.current.clientHeight; // Use the modal's clientHeight
      const currentScrollHeightFromBottom = scrollAreaRef.current.scrollTop + clientHeight; // Use the modal's scrollTop

      if (currentScrollHeightFromBottom >= totalWindowHeight * eventRate) {
        console.log("Scroll event triggered");
        getRoomList(request_getRoomListReq2);
      }
    },
    [600]
  );

  const request_getUserinfo = new Request(
    "/user/info",
    {
      params: {
        userIdentifier: userInfoModal,
      },
      headers: {
        Authorization: jwt,
      },
    },
    null,
    (res) => {
      setUserInfo(res.data);
    },
    null,
    null
  );

  const request_postFollow = new Request(
    "/user/follow",
    {
      params: {
        userIdentifier: userInfoModal,
      },
      headers: {
        Authorization: jwt,
      },
    },
    null,
    () => {
      setGlobalMsg((prev) => [...prev, "Follow를 보냈습니다"]);
    },
    null,
    null
  );

  const request_postUnFollow = new Request(
    "/user/follow/delete",
    {
      params: {
        userIdentifier: userInfoModal,
      },
      headers: {
        Authorization: jwt,
      },
    },
    null,
    () => {
      setUserInfo((prev) => {
        return { ...prev, followRelationShip: false };
      });
    },
    null,
    null
  );

  // 방 목록을 가져온다
  const request_getRoomListReq2 = useMemo(() => {
    return new Request(
      "/user/info/pospace/list",
      {
        params: {
          userPospaceIdx: userPospaceCursorRef.current,
          userIdentifier: userInfoModal,
          isFirstReq: isFirstReq,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        const newRoomList = res.data.content;

        const userPospaceCursor = newRoomList.length > 0 ? newRoomList[newRoomList.length - 1].pospaceId - 1 : 0;

        setUserPospaceList((prev) => [...prev, ...newRoomList]);

        setuserPospaceCursor(userPospaceCursor);
      },
      null,
      null
    );
  }, [userPospaceCursor, isFirstReq, jwt]);

  return { userPospaceCursor, scrollEvent, request_getUserinfo, request_postFollow, request_postUnFollow, request_getRoomListReq2 };
}

export default useUserInfo;
