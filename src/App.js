import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { getCookie } from "./Util/Cookie";
import GnbCom from "./components/Gnb/GnbCom";
import TopGnbCom from "./components/Gnb/TopGnbCom";
import Space from "./components/Space/SpaceCom";
import usePost from "./hooks/axios/usePost";
import useApp from "./hooks/useApp";
import Ban from "./page/Admin/Ban";
import Friend from "./page/Friend";
import Home from "./page/Home";
import MyInfo from "./page/MyInfo";
import NotPage from "./page/NotPage";
import PospaceCreate from "./page/PospaceCreate";
import PospaceView from "./page/PospaceView";
import SignUp from "./page/SignUp";
import TermsAndConditions from "./page/TermsAndConditions";
import { ErrorMessageCom, LodingBox, LodingText } from "./styledCom/App.style";

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
  console.warn = function () {};
}

function App() {
  const jwt = getCookie("anonode_jwt");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 변수 추가

  const [myInfo, setMyInfo] = useState(null);

  const [fcmToken, setFcmToken] = useState(null);
  const [loginState, setLoginState] = useState(null);
  const [GlobalMsg, setGlobalMsg] = useState([]);
  const [appMsg, setAppMsg] = useState(null);

  const [firstCheck, setFirstCheck] = useState(undefined);
  const location = useLocation();

  const { request_postFirstCheck } = useApp({ jwt, fcmToken, setLoginState, setFirstCheck, setMyInfo });

  const { postReq: postFirstCheck } = usePost(setGlobalMsg);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 0.5초 후에 로딩 상태를 false로 설정
    }, 700);

    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    setVh();

    if (jwt) {
      // getFcmToken이 호출완료되면 실행될 콜백 함수 정의
      window.receiveFcmToken = function (token) {
        if (token) {
          setFcmToken(token);
          postFirstCheck(request_postFirstCheck);
        } else {
        }
      };

      // 모바일일 경우 JavaScript 인터페이스를 통해 FCM 토큰을 가져옴
      if (window.AndroidBridge) {
        window.AndroidBridge.getFcmToken();
      } else {
        postFirstCheck(request_postFirstCheck);
      }
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  useEffect(() => {
    if (loginState) {
      if (jwt) {
        // getFcmToken이 호출완료되면 실행될 콜백 함수 정의
        window.receiveFcmToken = function (token) {
          if (token) {
            setFcmToken(token);
            postFirstCheck(request_postFirstCheck);
          } else {
          }
        };

        // 모바일일 경우 JavaScript 인터페이스를 통해 FCM 토큰을 가져옴
        if (window.AndroidBridge) {
          window.AndroidBridge.getFcmToken();
        } else {
          postFirstCheck(request_postFirstCheck);
        }
      }
    }
  }, [loginState, jwt]);

  useEffect(() => {
    if (fcmToken) {
      postFirstCheck(request_postFirstCheck);
    }
  }, [fcmToken]);

  useEffect(() => {
    if (GlobalMsg.length > 0) {
      setAppMsg(GlobalMsg[0]);

      const timer = setTimeout(() => {
        setGlobalMsg(GlobalMsg.slice(1));
        setAppMsg(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [GlobalMsg]);

  useEffect(() => {
    if (firstCheck === undefined) {
      return;
    }
    if (firstCheck) {
      const path = window.location.pathname;
      if (path === "/") {
        navigate("/space");
      }
    } else {
      navigate("/");
    }
  }, [firstCheck]);

  if (isLoading) {
    return (
      <LodingBox>
        <LodingText>Pospace</LodingText>
      </LodingBox>
    );
  }

  return (
    <div className="AppContainer">
      {appMsg && <ErrorMessageCom>{appMsg}</ErrorMessageCom>}

      {jwt && <TopGnbCom loginState={loginState} setLoginState={setLoginState} setGlobalMsg={setGlobalMsg} />}
      <Routes>
        {/* 로그인과 회원가입 비밀번호 찾기를 수행하며 로그인 성공시 룸리스트로 이동시킨다 */}
        <Route path="/" element={<Home setGlobalMsg={setGlobalMsg} loginState={loginState} setLoginState={setLoginState} firstCheck={firstCheck} />} />
        <Route path="/signUp" element={<SignUp setGlobalMsg={setGlobalMsg} />} />
        <Route path="/space" element={<Space setGlobalMsg={setGlobalMsg} />} />
        <Route path="/space/:pospaceId/*" element={<Space setGlobalMsg={setGlobalMsg} />} />
        <Route path="/view/pospace/:pospaceId" element={<PospaceView setGlobalMsg={setGlobalMsg} />} />

        <Route
          path="/myInfo"
          element={<MyInfo fcmToken={fcmToken} setLoginState={setLoginState} setFirstCheck={setFirstCheck} setGlobalMsg={setGlobalMsg} />}
        />
        <Route
          path="/myInfo/:pospaceId/*"
          element={<MyInfo fcmToken={fcmToken} setLoginState={setLoginState} setFirstCheck={setFirstCheck} setGlobalMsg={setGlobalMsg} />}
        />
        <Route path="/pospaceCreate" element={<PospaceCreate setGlobalMsg={setGlobalMsg} />} />
        <Route path="/friend" element={<Friend setGlobalMsg={setGlobalMsg} />} />

        <Route path="/friend/:pospaceId/*" element={<Friend setGlobalMsg={setGlobalMsg} />} />

        <Route path="/termsAndConditions" element={<TermsAndConditions setGlobalMsg={setGlobalMsg} />} />
        <Route path="/a745278552515702" element={<Ban setGlobalMsg={setGlobalMsg} />} />
        <Route path="/*" element={<NotPage />} />
      </Routes>
      {jwt && <GnbCom myInfo={myInfo} />}
    </div>
  );
}

export default App;
