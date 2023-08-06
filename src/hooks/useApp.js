import { useMemo } from "react";
import { removeCookie } from "../Util/Cookie";
import Request from "../Util/Request";

function useApp({ jwt, fcmToken, setLoginState, setFirstCheck, setMyInfo }) {
  const request_postFirstCheck = useMemo(() => {
    return new Request(
      "/user/fcmToken",
      {
        headers: {
          Authorization: jwt,
        },
      },
      {
        fcmToken: fcmToken,
      },
      (res) => {
        setFirstCheck(true);
        setMyInfo(res.data);
      },
      (err) => {
        if (err.response.status === 401) {
          removeCookie("anonode_jwt");
          setLoginState(false);
          setFirstCheck(false);
        }
      },
      null
    );
  }, [fcmToken, jwt]);
  return { request_postFirstCheck };
}

export default useApp;
