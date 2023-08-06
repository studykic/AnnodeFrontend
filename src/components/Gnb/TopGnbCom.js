import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGet from "../../hooks/axios/useGet";
import usePost from "../../hooks/axios/usePost";
import useTopGnb from "../../hooks/useTopGnb";
import {
  BorderBottomItem,
  ModalWrapper2,
  StyledImg,
  StyledLink,
  TopGnbByUserProfile,
  TopGnbContainer,
  TopPendingFollowOverlay,
} from "../../styledCom/Gnb/TopGnbCom.style";
import { AccountBtnBox, Nickname, ProfileImg } from "../../styledCom/Input.style";

const TopGnbCom = ({ setLoginState, setGlobalMsg }) => {
  const navigate = useNavigate();

  // 로그인을 하거나 브라우저 쿠키에 jwt가 존재하면 jwt를 상태에 저장
  const [state, setState] = useState(false);

  const [accept, setAccept] = useState(null);
  const [annodeFollowId, setAnnodeFollowId] = useState(null);

  const [pendingFollowers, setPendingFollowers] = useState(undefined);

  const [trigger, setTrigger] = useState(undefined);

  const { getReq: getPendingFollows } = useGet(setGlobalMsg);
  const { postReq: postFollowAccpet } = usePost(setGlobalMsg);

  const { request_postFollowAccept, request_getPendingFollows } = useTopGnb({ setPendingFollowers, accept, annodeFollowId });

  useEffect(() => {
    if (trigger !== undefined) {
      postFollowAccpet(request_postFollowAccept);
    }
  }, [trigger]);

  const navigateRoomList = (e) => {
    e?.preventDefault();
    setTimeout(() => {
      navigate("/space");
      // 다시 대화방으로 돌아오는걸 방지하기위해 홈에서 새로고침
      window.location.reload();
    }, 0);
  };

  return (
    <>
      <TopGnbContainer>
        <StyledLink
          className="homeLogo"
          to="/space"
          onClick={() => {
            const allUri = window.location.pathname;

            const firstUri = allUri.split("/")[1];

            const isSpaceUri = firstUri === "space";
            if (isSpaceUri) {
              navigateRoomList();
            }
          }}
        >
          <StyledImg src="/Pospace.png" width={"100%"} alt="Logo" />
        </StyledLink>
        <div
          className="pendingFollow"
          onClick={() => {
            if (!state) {
              getPendingFollows(request_getPendingFollows);
            }

            setState((prev) => !prev);
            if (pendingFollowers !== undefined) {
              setPendingFollowers(undefined);
              setAnnodeFollowId(null);
              setAccept(null);
              setTrigger(undefined);
            }
          }}
        >
          받은 Follow
        </div>
      </TopGnbContainer>

      <TopPendingFollowOverlay
        modalOpen={state}
        name="modalOverlay"
        onClick={(e) => {
          if (e.target.getAttribute("name") === "modalOverlay") {
            setState(false);
          }
        }}
      >
        <ModalWrapper2>
          {pendingFollowers?.map((item) => (
            <BorderBottomItem key={item.followRequsterIdentifier}>
              <TopGnbByUserProfile>
                <ProfileImg width={"50px"} height={"50px"} src={item.profileImgFileUrl} />
                <Nickname>{item.requesterNickName}</Nickname>
              </TopGnbByUserProfile>

              <AccountBtnBox>
                <div
                  name="accept"
                  value="accept"
                  onClick={() => {
                    setAnnodeFollowId(item.annodeFollowId);
                    setAccept(true);
                    setTrigger((prev) => !prev);
                  }}
                >
                  수락
                </div>
                <div
                  name="accept"
                  value="reject"
                  onClick={() => {
                    setAnnodeFollowId(item.annodeFollowId);
                    setAccept(false);
                    setTrigger((prev) => !prev);
                  }}
                >
                  거절
                </div>
              </AccountBtnBox>
            </BorderBottomItem>
          ))}
        </ModalWrapper2>
      </TopPendingFollowOverlay>
    </>
  );
};

export default TopGnbCom;
