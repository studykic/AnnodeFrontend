import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { getCookie } from "../../Util/Cookie";
import Request from "../../Util/Request";
import useLatest from "../useLatest";

function useSpace({ pospaceList, setPospaceList, isFirstReq, likePospaceID, setLikePospaceID }) {
  const jwt = getCookie("anonode_jwt");
  const initCursor = 1;
  const [followCursor, setfollowCursor, followCursorRef] = useLatest(initCursor);
  const [publicCursor, setPublicCursor, publicCursorRef] = useLatest(initCursor);
  const [crossCursor, setCrossCursor, crossCursorRef] = useLatest(initCursor);

  const [loading, setLoading] = useState(false);

  const scrollEvent = debounce(
    (getRoomList, request_getRoomListReq) => {
      const eventRate = 0.7;
      const totalWindowHeight = document.documentElement.scrollHeight;
      const defaultWindowHeight = document.documentElement.clientHeight;
      const currentScrollHeightFromBottom = document.documentElement.scrollTop + defaultWindowHeight;
      const eventTriggerPosition = totalWindowHeight * eventRate;

      if (currentScrollHeightFromBottom >= eventTriggerPosition && !loading) {
        setLoading(true);
        getRoomList(request_getRoomListReq);
      }
    },
    [400]
  );

  // const scrollEvent = debounce(
  //   (getRoomList, request_getRoomListReq) => {
  //     const eventRate = 0.7;
  //     const totalWindowHeight = document.documentElement.scrollHeight;
  //     const defaultWindowHeight = document.documentElement.clientHeight;
  //     const currentScrollHeightFromBottom = document.documentElement.scrollTop + defaultWindowHeight;
  //     const eventTriggerPosition = totalWindowHeight * eventRate;

  //     if (currentScrollHeightFromBottom >= eventTriggerPosition && !loading) {
  //       setLoading(true);
  //       getRoomList(request_getRoomListReq);
  //     }
  //   },
  //   [600]
  // );

  // 방 목록을 가져온다
  const request_getRoomListReq = useMemo(() => {
    return new Request(
      "/pospace/list",
      {
        params: {
          isFirstReq: isFirstReq,
          followPospaceIdx: followCursorRef.current,
          publicPospaceIdx: publicCursorRef.current,
          crossFollowPospaceIdx: crossCursorRef.current,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        const newRoomList = res.data.content;

        // 다음순서의 방 조회에 사용할 커서값
        const followLastItem = newRoomList.reduce((lowest, current) => {
          if (current.pospaceKind !== "FOLLOWER") {
            return lowest;
          }

          return lowest === null || current.pospaceId < lowest.pospaceId ? current : lowest;
        }, null);

        const publicLastItem = newRoomList.reduce((lowest, current) => {
          if (current.pospaceKind !== "ALL") {
            return lowest;
          }

          return lowest === null || current.pospaceId < lowest.pospaceId ? current : lowest;
        }, null);

        const crossLastItem = newRoomList.reduce((lowest, current) => {
          if (current.pospaceKind !== "CROSSFOLLOW") {
            return lowest;
          }

          return lowest === null || current.pospaceId < lowest.pospaceId ? current : lowest;
        }, null);

        const followNextCursor = followLastItem ? followLastItem.pospaceId - 1 : 0;
        const publicNextCursor = publicLastItem ? publicLastItem.pospaceId - 1 : 0;
        const crossNextCursor = crossLastItem ? crossLastItem.pospaceId - 1 : 0;

        setPospaceList((prev) => [...prev, ...newRoomList]);

        setfollowCursor(followNextCursor);
        setPublicCursor(publicNextCursor);
        setCrossCursor(crossNextCursor);
      },
      null,
      () => {
        setLoading(false);
      }
    );
  }, [isFirstReq, pospaceList, followCursor, publicCursor, crossCursor, jwt]);

  const request_postPospaceLike = useMemo(() => {
    return new Request(
      "/pospace/like",
      {
        params: {
          pospaceId: likePospaceID,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        const newPospaceList = [...pospaceList];
        for (let key in res.data) {
          newPospaceList.map((pospace) => {
            if (pospace.pospaceId == key) {
              pospace.pospaceLikeCount = res.data[key];
            }
          });
        }
        setPospaceList(newPospaceList);
      },
      null,
      () => {
        setLikePospaceID(null);
      }
    );
  }, [likePospaceID, jwt]);

  return {
    request_getRoomListReq,
    request_postPospaceLike,
    scrollEvent,
  };
}

export default useSpace;
