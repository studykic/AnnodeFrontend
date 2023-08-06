import { useMemo } from "react";
import { getCookie } from "../../Util/Cookie";
import Request from "../../Util/Request";

function useBan({ userSearchInput, setSearchUser, targetIdentifier, setTargetIdentifier }) {
  const jwt = getCookie("anonode_jwt");

  const request_postBan = new Request(
    "/admin/user/ban",
    {
      params: {
        targetIdentifier: targetIdentifier,
      },
      headers: {
        Authorization: jwt,
      },
    },
    null,
    null,
    null,
    null
  );

  const request_getUserSearch = useMemo(() => {
    return new Request(
      "/user/search",
      {
        params: {
          userSearchInput: userSearchInput,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        const user = res.data;
        console.log(user);
        setSearchUser(user);
        setTargetIdentifier(user.userIdentifier);
      },
      null,
      null
    );
  }, [userSearchInput, jwt]);

  return {
    request_postBan,
    request_getUserSearch,
  };
}

export default useBan;
