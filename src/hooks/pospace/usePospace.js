import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Util/Cookie";
import Request from "../../Util/Request";

function usePospace({ pospaceForm, userTagList, setCrossFollowUserList, setUserTagList, resetAll }) {
  const jwt = getCookie("anonode_jwt");

  const navigate = useNavigate();

  const pospaceFormData = () => {
    const formData = new FormData();
    // Add the pospaceContent, maxAnnode, and visibility to the form data

    const newPospaceForm = { ...pospaceForm, userTagList: userTagList };

    const list = ["pospaceContent", "maxAnnode", "visibility", "userTagList", "tolkOpen"];

    list.forEach((element) => {
      formData.append(element, newPospaceForm[element]);
    });

    Array.from(newPospaceForm.pospaceImgs).forEach((file, index) => {
      formData.append(`profileImageFiles`, file);
    });

    return formData;
  };

  const request_postPospaceCreate = new Request(
    "/pospace/create",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: jwt,
      },
    },
    pospaceFormData(),
    () => {
      setCrossFollowUserList([]);
      setUserTagList([]);
      resetAll();
      navigate("/space");
    },
    null,
    null
  );

  const request_getCrossFollowUserList = new Request(
    "/user/follow/cross/list",
    {
      headers: {
        Authorization: jwt,
      },
    },
    null,
    (res) => {
      setCrossFollowUserList(res.data);
    },
    null,
    null
  );

  return { request_postPospaceCreate, request_getCrossFollowUserList };
}

export default usePospace;
