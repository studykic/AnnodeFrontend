import React from "react";
import usePost from "../../hooks/axios/usePost";
import useLogin from "../../hooks/login/useLogin";
import useForm from "../../hooks/useForm";
import { LoginBox, LoginInfputBox, LoginInput, LoninInputWrapper } from "../../styledCom/Login/LoginCom.style";

const LoginCom = ({ loginState, setLoginState, setGlobalMsg }) => {
  // 역할 : 로그인 요청에 파라미터로 사용되는 값을 만든다.
  const { resultForm: loginForm, updateForm: updateLoginForm } = useForm({ email: "", password: "" });

  // 역할 : 로그인 성공 , 실패마다 호출되는 콜백함수를 구현했으며 응답데이터와 에러메세지를 반환한다.
  // 로그인 요청에서 콜백함수 2개를 이용하여 데이터와 에러메세지를 받아온다.
  const { request_login } = useLogin(loginForm, setLoginState);

  // 역할 : 콜백함수를 호출해주고 로딩상태를 반환한다.
  // 응답값을 반환하진 않으며 일반적인 get 요청 메소드와 로딩상태를 반환한다.
  const { loading: loginLoading, postReq: postLogin } = usePost(setGlobalMsg);

  return (
    <LoginBox>
      <LoginInfputBox>
        <LoninInputWrapper>
          <LoginInput
            type="text"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) => {
              updateLoginForm(e);
            }}
          />
          <LoginInput
            type="password"
            name="password"
            placeholder="password"
            value={loginForm.password}
            onChange={(e) => {
              updateLoginForm(e);
            }}
          />
        </LoninInputWrapper>
        <span
          onClick={() => {
            postLogin(request_login);
          }}
        >
          로그인
        </span>
      </LoginInfputBox>
    </LoginBox>
  );
};

export default LoginCom;
