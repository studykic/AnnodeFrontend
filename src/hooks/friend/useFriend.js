import { useMemo } from "react";
import { getCookie } from "../../Util/Cookie";
import Request from "../../Util/Request";

function useFriend({
  setPendingFollowers,
  accept,
  annodeFollowId,
  userIdentifier,
  setUserIdentifier,
  setFollows,
  userSearchInput,
  setSearchUser,
  contactData,
  setUserInfoByphoneList,
  setGlobalMsg,
}) {
  const jwt = getCookie("anonode_jwt");

  const request_getFollowList = useMemo(() => {
    return new Request(
      "/user/follow/list",
      {
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setFollows(res.data);
      },
      null,
      null
    );
  }, [jwt]);

  const request_getPendingFollows = useMemo(() => {
    return new Request(
      "/user/follow/request/list",
      {
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setPendingFollowers(res.data);
      },
      null,
      null
    );
  }, [jwt]);

  // follow 요청을 보냄
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
        setSearchUser(res.data);
      },
      null,
      null
    );
  }, [userSearchInput, jwt]);

  // follow 요청을 보냄
  const request_postFollow = useMemo(() => {
    return new Request(
      "/user/follow",
      {
        params: {
          userIdentifier: userIdentifier,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setUserIdentifier(null);
        setGlobalMsg((prev) => [...prev, "Follow를 보냈습니다"]);
      },
      null,
      null
    );
  }, [userIdentifier, jwt]);

  // follow 요청을 수락하거나 거절
  const request_postFollowAccept = useMemo(() => {
    return new Request(
      "/user/follow/accept",
      {
        headers: {
          Authorization: jwt,
        },
      },
      {
        accept: accept,
        annodeFollowId: annodeFollowId,
      },
      () => {
        setPendingFollowers((prev) => prev.filter((item) => item.annodeFollowId != annodeFollowId));
      },
      null,
      null
    );
  }, [accept, annodeFollowId]);

  const request_postUserInfoListByPhone = useMemo(() => {
    return new Request(
      "/user/phone/list",
      {
        headers: {
          Authorization: jwt,
        },
      },
      contactData,
      (res) => {
        setUserInfoByphoneList(res.data);
      },
      null,
      null
    );
  }, [contactData, jwt]);

  return {
    request_getFollowList,
    request_getPendingFollows,
    request_postFollow,
    request_postFollowAccept,
    request_getUserSearch,
    request_postUserInfoListByPhone,
  };
}

export default useFriend;
