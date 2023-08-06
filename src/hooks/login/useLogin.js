import Cookies from "js-cookie";
import Request from "../../Util/Request";

function useLogin(loginForm, setLoginState) {
  const loginSuccess = (res) => {
    Cookies.set("anonode_jwt", `Bearer ${res.data.jwt}`, { expires: 14 });
    // setCookie("anonode_jwt", `Bearer ${res.data.jwt}`);
    setLoginState(true);
  };

  // const loginSuccess = (res) => {
  //   const jwt = res.data.jwt;

  //   setCookie("anonode_jwt", `Bearer ${jwt}`, 14); // 쿠키 유지 기간을 14일로 설정

  //   if (jwt && window.AndroidBridge) {
  //     // 안드로이드에 jwt를 전달합니다.
  //     window.AndroidBridge.onLoginSuccess(jwt);
  //   }
  //   setLoginState(true);
  // };

  const request_login = new Request(
    "/login",
    {
      withCredentials: true,
    },
    {
      email: loginForm.email,
      password: loginForm.password,
    },
    loginSuccess,
    null,
    null
  );

  return { request_login };
}

export default useLogin;
