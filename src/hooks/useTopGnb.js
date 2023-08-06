import { useMemo } from "react";
import { getCookie } from "../Util/Cookie";
import Request from "../Util/Request";

function useTopGnb({ setPendingFollowers, accept, annodeFollowId }) {
  const jwt = getCookie("anonode_jwt");

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

  return {
    request_postFollowAccept,
    request_getPendingFollows,
  };
}

export default useTopGnb;
