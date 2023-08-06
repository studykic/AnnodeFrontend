import { getCookie } from "../Util/Cookie";
import Request from "../Util/Request";

function useGetImg({ profileImgFileName, setImg }) {
  const jwt = getCookie("anonode_jwt");

  const request_getProfileImg = new Request(
    "/file/profileImg/find",
    {
      params: {
        profileImgFileName: profileImgFileName,
      },
      headers: {
        Authorization: jwt,
      },
      responseType: "blob",
    },
    null,
    null,
    null,
    null
  );

  return {
    request_getProfileImg,
  };
}

export default useGetImg;
