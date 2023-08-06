import React from "react";
import LoginCom from "../components/Home/LoginCom";

const Login = ({ loginState, setLoginState, setGlobalMsg }) => {
  return <LoginCom loginState={loginState} setLoginState={setLoginState} setGlobalMsg={setGlobalMsg} />;
};

export default Login;
