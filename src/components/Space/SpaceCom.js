import React, { useEffect, useState } from "react";
import useGet from "../../hooks/axios/useGet";
import useSpace from "../../hooks/space/useSpace";
import {
  Content,
  ContentBox,
  ContentText,
  HeartBox,
  PospaceImg,
  PospaceImgBox,
  PospaceItem,
  SpaceContainer,
  StyledCarousel,
  StyledMdRefresh,
  UserDiv,
  UserProfileImg,
  UserWrapper,
} from "../../styledCom/Space/Space.style";

import { uniqueId } from "lodash";
import { FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePost from "../../hooks/axios/usePost";
import useTime from "../../hooks/useTime";
import PospaceInfo from "../Pospace/PospaceInfoCom";
import UserInfoCom from "../UserInfo/UserInfoCom";

const SpaceCom = ({ setGlobalMsg }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pospaceId } = useParams();

  const [lastSegment, setLastSegment] = useState(null);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [pospaceModal, setPospaceModal] = useState(false);
  const [pospaceList, setPospaceList] = useState([]);

  const [isFirstReq, setIsFirstReq] = useState(true);

  const [selectPospaceId, setSelectPospaceId] = useState(null);

  const [likePospaceID, setLikePospaceID] = useState(undefined);

  const { request_getRoomListReq, request_postPospaceLike, scrollEvent } = useSpace({
    isFirstReq,
    pospaceList,
    setPospaceList,
    likePospaceID,
    setLikePospaceID,
  });

  const { getReq: getRoomList } = useGet(setGlobalMsg);
  const { postReq: postPospaceLike } = usePost(setGlobalMsg);

  // 들어오자마자 게시글 10개 가져옴 최신순으로
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    getRoomList(request_getRoomListReq);
    setIsFirstReq(false);

    window.addEventListener("beforeunload", scrollToTop);

    // url의 파라미터를 이용하여 첫 접근시 발동
    if (pospaceId) {
      const pospaceIdNumber = pospaceId.match(/\d+/)[0];
      setSelectPospaceId(pospaceIdNumber);
      setPospaceModal(true);
      navigate(`/space/${pospaceId}`);
    }

    return () => {
      window.removeEventListener("beforeunload", scrollToTop);
    };
  }, []);

  useEffect(() => {
    const scrollEventHandler = () => {
      scrollEvent(getRoomList, request_getRoomListReq);
    };

    window.addEventListener("scroll", scrollEventHandler);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
    };
  }, [request_getRoomListReq]);

  useEffect(() => {
    if (pospaceModal) {
      document.body.style.overflow = "hidden";
      // 컴포넌트가 마운트 해제될 때 스크롤 방지 이벤트 리스너 제거
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [pospaceModal]);

  const refreshOnclick = () => {
    window.location.reload();
  };

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastSegmentValue = pathSegments.pop() || pathSegments.pop();
    setLastSegment(lastSegmentValue);
  }, [location]);

  useEffect(() => {
    if (likePospaceID) {
      postPospaceLike(request_postPospaceLike);
    }
  }, [likePospaceID]);

  const { formatDateTime } = useTime();

  return (
    <SpaceContainer>
      {pospaceList?.length > 0 &&
        pospaceList?.map((item, index) => (
          <PospaceItem
            key={item.pospaceId + uniqueId}
            name="space"
            onClick={(e) => {
              navigate(`./pospace${item.pospaceId}`);
              setSelectPospaceId(item.pospaceId);
              setPospaceModal(true);
            }}
          >
            <HeartBox
              onClick={(e) => {
                e.stopPropagation();
                setLikePospaceID(item.pospaceId);
              }}
            >
              <FaRegHeart size={24} className="FaRegHeart" /> {item.pospaceLikeCount}
            </HeartBox>

            {/* <ImageWrapper>
              {item?.pospaceImgFileUrlList.map((img, idx) =>
                idx === 0 ? <Image key={idx} src={img} alt={`Image ${idx + 1}`} /> : <ImageCount key={idx}>{idx + 1}</ImageCount>
              )}
            </ImageWrapper> */}

            <StyledCarousel infiniteLoop showArrows={false} interval={3000} preventMovementUntilSwipeScrollTolerance swipeScrollTolerance={50}>
              {Array.from(item?.pospaceImgFileUrlList || []).map((url, index) => (
                <PospaceImgBox key={index}>
                  <PospaceImg src={url} alt="프로필 이미지" />
                </PospaceImgBox>
              ))}
            </StyledCarousel>

            {item.pospaceContent && <ContentText>{item.pospaceContent}</ContentText>}

            <UserWrapper
              name="userInfo"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`./userInfo${item.writerIdentifier}`);
                setUserInfoModal(item.writerIdentifier);
              }}
            >
              <UserDiv>
                <UserProfileImg src={item.writerProfileImgFileUrl} />
                {item.writerNickname}
              </UserDiv>
            </UserWrapper>
            <ContentBox>
              <Content>{formatDateTime(item.createdTime)}</Content>
              <Content>{item.pospaceKind}</Content>
            </ContentBox>
          </PospaceItem>
        ))}

      <StyledMdRefresh size={25} onClick={refreshOnclick} />

      {pospaceModal && (
        <PospaceInfo
          lastSegment={lastSegment}
          pospaceModal={pospaceModal}
          setPospaceModal={setPospaceModal}
          selectPospaceId={selectPospaceId}
          setSelectPospaceId={setSelectPospaceId}
          setGlobalMsg={setGlobalMsg}
        />
      )}

      {/* userInfoModal에는 열람하고싶은 유저의 Identifier가 할당됨 */}
      {userInfoModal && <UserInfoCom userInfoModal={userInfoModal} setUserInfoModal={setUserInfoModal} lastSegment={lastSegment} setGlobalMsg={setGlobalMsg} />}
    </SpaceContainer>
  );
};

export default SpaceCom;
