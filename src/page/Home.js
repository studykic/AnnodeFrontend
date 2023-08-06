import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginCom from "../components/Home/LoginCom";
import PasswordResetForm from "../components/Home/PasswordResetForm";
import { Aaa, Bbb, HomeCon, TopSession } from "../styledCom/Home.style";
import { PasswordResetLabel } from "../styledCom/Login/LoginCom.style";

const Home = ({ setGlobalMsg, loginState, setLoginState, firstCheck }) => {
  const navigate = useNavigate();

  // 역할 : 비밀번호 모달창을 띄우는 상태값
  const [findPasswordWindow, setFindPasswordWindow] = useState(false);
  const [modal, setModal] = useState(false);

  // 모달창(카테고리 보기)이 켜져있으면 body에 스크롤 방지 이벤트 리스너 등록
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      // 컴포넌트가 마운트 해제될 때 스크롤 방지 이벤트 리스너 제거
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [modal]);

  useEffect(() => {
    if (firstCheck === undefined) {
      return;
    }
    if (!firstCheck) {
      navigate("/");
    }
  }, []);

  return (
    <HomeCon>
      <Aaa>
        <img src="/Pospace.png" width={"80%"} alt="Logo" />
      </Aaa>

      {window.location.pathname === "/" && firstCheck ? null : (
        <TopSession>
          <LoginCom loginState={loginState} setLoginState={setLoginState} setGlobalMsg={setGlobalMsg} />

          <Link to="/signUp">계정 생성</Link>
        </TopSession>
      )}

      {findPasswordWindow ? <PasswordResetForm setGlobalMsg={setGlobalMsg}></PasswordResetForm> : null}

      <Bbb>
        <PasswordResetLabel
          onClick={() => {
            setFindPasswordWindow((prev) => !prev);
          }}
        >
          <h3>비밀번호 변경</h3>
        </PasswordResetLabel>

        <PasswordResetLabel
          onClick={() => {
            setFindPasswordWindow((prev) => !prev);
          }}
        >
          <Link to="/termsAndConditions">
            <h3>Pospace 이용약관 및 개인정보처리방침</h3>
          </Link>
        </PasswordResetLabel>
      </Bbb>
    </HomeCon>
  );
};

export default Home;
