import React, { useEffect, useMemo, useState } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getCookie } from "../Util/Cookie";
import Request from "../Util/Request";
import useGet from "../hooks/axios/useGet";
import { SelectImg, StyledCarousel } from "../styledCom/Pospace/PospaceCom.style";

const PospaceView = ({ setGlobalMsg }) => {
  const jwt = getCookie("anonode_jwt");
  const { pospaceId } = useParams();

  const [pospaceInfo, setPospaceInfo] = useState();
  const { getReq: getPospaceInfo } = useGet(setGlobalMsg);

  const request_getPospaceInfoReq = useMemo(() => {
    return new Request(
      "/view/pospace/info",
      {
        params: {
          pospaceId: pospaceId,
        },
        headers: {
          Authorization: jwt,
        },
      },
      null,
      (res) => {
        setPospaceInfo(res.data);
      },
      null,
      null
    );
  }, [pospaceId, jwt]);

  useEffect(() => {
    if (pospaceId) {
      getPospaceInfo(request_getPospaceInfoReq);
    }
  }, []);

  return pospaceInfo ? (
    <>
      {pospaceInfo && (
        <div>
          <div>
            <img width={"50px"} height={"50px"} src={pospaceInfo.writerSimpleRes.profileImgFileUrl}></img>

            <span> 이름: {pospaceInfo.writerSimpleRes.nickName}</span>
            <span>
              {" "}
              작성시간:
              {new Date(pospaceInfo.pospceCreatedTime).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
          {pospaceInfo.pospaceImgFileUrlList.length >= 1 ? (
            <StyledCarousel infiniteLoop>
              {Array.from(pospaceInfo.pospaceImgFileUrlList).map((url, index) => (
                <div key={index}>
                  <SelectImg src={url} alt="프로필 이미지" />
                </div>
              ))}
            </StyledCarousel>
          ) : null}

          <div>글내용: {pospaceInfo.pospaceContent}</div>
          <div>
            <FaRegHeart /> {pospaceInfo.pospaceLikeCount}
          </div>
          <div>
            {" "}
            <FaRegComment /> {pospaceInfo.pospaceCommentList.length}
          </div>
          <div>공개범위: {pospaceInfo.visibility}</div>
        </div>
      )}
    </>
  ) : (
    <span>어플에서 로그인이 필요한 게시물입니다</span>
  );
};

export default PospaceView;
