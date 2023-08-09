import React, { useEffect, useRef, useState } from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import { FaArrowLeft, FaRegHeart, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../../Util/theme";
import useGet from "../../hooks/axios/useGet";
import usePost from "../../hooks/axios/usePost";
import useUserInfo from "../../hooks/useUserInfo";
import BlueBtn from "../../styledCom/BlueBtn";
import { Nickname, ProfileImg } from "../../styledCom/Input.style";
import {
  AiOutlineIdcardBox,
  FollowBtn,
  ModalWrapper,
  NoneImg,
  PospaceContent,
  PospaceContentBox,
  PospaceInfoBox,
  PospaceKind,
  PospaceLikeCount,
  UserInfoBox,
  UserInfoComBox,
  UserPospaceItem,
  UserProfile,
} from "../../styledCom/UserInfoCom.style";
import PospaceInfoCom from "../Pospace/PospaceInfoCom";

const UserInfoCom = ({ userInfoModal, setUserInfoModal, lastSegment, setGlobalMsg }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef();
  const scrollAreaRef = useRef();

  const [userInfo, setUserInfo] = useState(null);
  const [userpospaceList, setUserPospaceList] = useState([]);

  const [pospaceModal, setPospaceModal] = useState(false);
  const [selectPospaceId, setSelectPospaceId] = useState(null);
  const [isFirstReq, setIsFirstReq] = useState(true);

  //    userInfoModal에는 열람하고싶은 유저의 Identifier가 할당됨
  const { userPospaceCursor, scrollEvent, request_getUserinfo, request_postFollow, request_postUnFollow, request_getRoomListReq2 } = useUserInfo({
    scrollAreaRef,
    modalRef,
    userInfoModal,
    setUserInfo,
    setUserPospaceList,
    isFirstReq,
    setGlobalMsg,
  });

  const { getReq: getUserInfo } = useGet(setGlobalMsg);
  const { getReq } = useGet(setGlobalMsg);
  // const { getReq: getPospaceInfo } = useGet(setGlobalMsg);
  const { postReq } = usePost(setGlobalMsg);

  useEffect(() => {
    if (userInfoModal) {
      document.body.style.overflow = "hidden";

      getUserInfo(request_getUserinfo);
      getReq(request_getRoomListReq2);
      setIsFirstReq(false);

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [userInfoModal]);

  useEffect(() => {
    const scrollEventHandler = () => {
      if (scrollAreaRef.current && userPospaceCursor != 0) {
        scrollEvent(getReq, request_getRoomListReq2);
        // scrollEvent();
      }
    };

    const modal = scrollAreaRef.current;
    modal.addEventListener("scroll", scrollEventHandler);
    return () => {
      modal.removeEventListener("scroll", scrollEventHandler);
    };
  }, [userPospaceCursor, request_getRoomListReq2]);

  // 뒤로가기를 발동하면 모든 Pospace가 닫히게됨, 하나의 레이어씩 닫기는 나가기 버튼을 통해 만들기
  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      setSelectPospaceId(null);
      setPospaceModal(false);
      setUserInfoModal(false);
    });
  }, [lastSegment]);

  return (
    <UserInfoComBox
      modalOpen={userInfoModal}
      name="modalOverlay"
      onClick={(e) => {
        if (e.target.getAttribute("name") === "modalOverlay") {
          setUserInfoModal(false);
        }
      }}
    >
      <ModalWrapper ref={modalRef}>
        {userInfo && (
          <UserInfoBox key={userInfo.userIdentifier}>
            <UserProfile>
              <ProfileImg src={userInfo.profileImgFileUrl} width={"50px"} height={"50px"} />
              <Nickname>{userInfo.nickName}</Nickname>
            </UserProfile>

            <Nickname
              onClick={() => {
                if (!window.AndroidBridge) {
                  const copyContent = `${userInfo.email}`;

                  navigator.clipboard.writeText(copyContent);
                  setGlobalMsg((prev) => [...prev, "email이 복사되었습니다"]);
                }
              }}
            >
              {userInfo.email}
            </Nickname>
            <Nickname>
              {" "}
              <FaUser color={theme.mainColor} /> {userInfo.followerCount}
            </Nickname>

            <Nickname
              onClick={() => {
                if (!window.AndroidBridge) {
                  const copyContent = `${userInfo.userIdentifier}`;

                  navigator.clipboard.writeText(copyContent);
                  setGlobalMsg((prev) => [...prev, "친구코드가 복사되었습니다"]);
                }
              }}
            >
              <AiOutlineIdcardBox>
                {" "}
                <AiOutlineIdcard size={25} /> {userInfo.userIdentifier}
              </AiOutlineIdcardBox>
            </Nickname>

            {userInfo.followRelationShip ? (
              <FollowBtn
                btnColor={"green"}
                onClick={() => {
                  if (window.confirm("UnFollow 확인")) {
                    postReq(request_postUnFollow);
                  }
                }}
              >
                UnFollow
              </FollowBtn>
            ) : (
              <FollowBtn
                btnColor={"green"}
                onClick={() => {
                  postReq(request_postFollow);
                }}
              >
                Follow
              </FollowBtn>
            )}
          </UserInfoBox>
        )}

        <UserPospaceItem ref={scrollAreaRef}>
          {userpospaceList.map((item) => (
            <PospaceInfoBox
              key={item.pospaceId}
              onClick={() => {
                // navigate(`./pospace${item.pospaceId}`);
                setSelectPospaceId(item.pospaceId);
                setPospaceModal(true);
              }}
            >
              {item.pospaceImgFileUrlList.length > 0 ? <img src={item.pospaceImgFileUrlList[0]} width={"60px"} height={"60px"} alt="" /> : <NoneImg />}

              <PospaceContentBox>{item.pospaceContent != "" && <PospaceContent>{item.pospaceContent}</PospaceContent>}</PospaceContentBox>

              <PospaceLikeCount>
                <FaRegHeart />
                <span>{item.pospaceLikeCount}</span>
              </PospaceLikeCount>

              <PospaceKind color="black">{item.pospaceKind}</PospaceKind>
            </PospaceInfoBox>
          ))}
        </UserPospaceItem>

        <BlueBtn
          btnColor={"gray"}
          onClick={() => {
            setUserInfoModal(false);
          }}
        >
          <FaArrowLeft />
        </BlueBtn>
      </ModalWrapper>

      {pospaceModal && (
        <PospaceInfoCom
          lastSegment={lastSegment}
          pospaceModal={pospaceModal}
          setPospaceModal={setPospaceModal}
          selectPospaceId={selectPospaceId}
          setSelectPospaceId={setSelectPospaceId}
          setGlobalMsg={setGlobalMsg}
        ></PospaceInfoCom>
      )}
    </UserInfoComBox>
  );
};

export default UserInfoCom;
