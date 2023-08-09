import React from "react";

import MyinfoCom from "../components/Myinfo/MyinfoCom";

const MyInfo = ({ fcmToken, setGlobalMsg, setLoginState, setFirstCheck }) => {
  return <MyinfoCom fcmToken={fcmToken} setLoginState={setLoginState} setGlobalMsg={setGlobalMsg} setFirstCheck={setFirstCheck} />;
};

export default MyInfo;
