import { useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../Util/Cookie";
import Request from "../../Util/Request";

function useMyinfo({ fcmToken, newUserinfoForm, setLoginState, setGlobalMsg }) {
  const jwt = getCookie("anonode_jwt");
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState({
    nickName: "",
    email: "",
    userIdentifier: "",
    profileImgFileUrl: "",
    userCreatedDate: "",
    followerCount: "",
  });
  const [profileImg, setProfileImg] = useState(null);

  // axios와 관련된 메소드

  // img 파일을 서버에서 가져온다
  const getProfileImgSuccess = (res) => {
    const imageUrl = URL.createObjectURL(res.data); // 받아온 데이터로 이미지 URL 생성
    setProfileImg(imageUrl);
  };

  const reqBodyEditItem = useCallback(() => {
    const formData = new FormData();

    // resultObject를 배열로 만들어 순회하면서 FormData에 추가시킨다.
    Object.entries(newUserinfoForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }, [newUserinfoForm]);

  const request_getMyinfo = new Request(
    "/user/info",
    {
      headers: {
        Authorization: jwt,
      },
    },
    null,
    (res) => {
      setMyInfo(res.data);
    },
    null,
    null
  );

  const request_postLogout = new Request(
    "/user/logout",
    {
      headers: {
        Authorization: jwt,
      },
    },
    { fcmToken: fcmToken },
    null,
    null,
    null
  );

  const request_postEditItem = new Request(
    "/user/info/update",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: jwt,
      },
    },
    reqBodyEditItem(),
    () => {
      setGlobalMsg((prev) => [...prev, "수정완료"]);
    },
    null,
    null
  );

  const request_deleteUser = new Request(
    "/user/delete",
    {
      headers: {
        Authorization: jwt,
      },
    },
    null,
    null,
    null,
    null
  );

  // 로그아웃을 수행한다 이때 api요청이 아닌 쿠키에서 jwt를 지우는 방식.
  function logOut() {
    if (jwt) {
      removeCookie("anonode_jwt");
      setLoginState(false);
      navigate("/");
    }
  }

  return {
    myInfo,
    profileImg,
    request_getMyinfo,
    request_postLogout,
    request_postEditItem,
    request_deleteUser,
    logOut,
  };
}

export default useMyinfo;
