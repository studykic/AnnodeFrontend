import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGet from "../../hooks/axios/useGet";
import usePost from "../../hooks/axios/usePost";
import useFriend from "../../hooks/friend/useFriend";
import useGetImg from "../../hooks/useGetImg";
import {
  BorderBottomItem,
  FollowBtn,
  FollowsBox,
  FriendComBox,
  MiddleBox,
  PendingFollowerBox,
  PhoneConnectBtn,
  StyledUserSearchInput,
  Ttt,
  User,
  UserByPhone,
  UserSearchBar,
  UserSearchBox,
} from "../../styledCom/Friend/FriendCom.style";
import { AccountBtnBox, Nickname, ProfileImg, UserProfile } from "../../styledCom/Input.style";
import UserInfoCom from "../UserInfo/UserInfoCom";

const FriendCom = ({ setGlobalMsg }) => {
  const [contactData, setContactData] = useState(undefined);

  useEffect(() => {
    getFollows(request_getFollowList);
    getPendingFollows(request_getPendingFollows);
  }, []);

  const [userInfoByphoneList, setUserInfoByphoneList] = useState([]);

  const [userInfoModal, setUserInfoModal] = useState(false);
  const [trigger, setTrigger] = useState(undefined);
  const [accept, setAccept] = useState(null);
  const [annodeFollowId, setAnnodeFollowId] = useState(null);
  //   const { resultForm: followAcceptForm, updateForm: updateFollowAcceptForm } = useForm({ accept: "", annodeFollowId: "" });

  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState(null);

  const [follows, setFollows] = useState([]);
  const [userIdentifier, setUserIdentifier] = useState(null);
  const [pendingFollowers, setPendingFollowers] = useState([]);

  const [img, setImg] = useState();
  const profileImgFileName = follows.map((item) => item.followProfileImgFileName);

  const { request_getProfileImg } = useGetImg({ profileImgFileName, setImg });
  const {
    request_getFollowList,
    request_getPendingFollows,
    request_postFollow,
    request_postFollowAccept,
    request_getUserSearch,
    request_postUserInfoListByPhone,
  } = useFriend({
    accept,
    annodeFollowId,
    userIdentifier,
    setUserIdentifier,
    setPendingFollowers,
    setFollows,
    userSearchInput,
    setSearchUser,
    contactData,
    setUserInfoByphoneList,
    setGlobalMsg,
  });
  const { getReq: getPendingFollows } = useGet(setGlobalMsg);
  const { getReq: getUserSearch } = useGet(setGlobalMsg);
  const { getReq: getFollows } = useGet(setGlobalMsg);
  const { postReq: postFollowAccpet } = usePost(setGlobalMsg);
  const { postReq: postUserInfoByPhone, loading: postUserInfoByPhoneLoading } = usePost(setGlobalMsg);
  const { postReq: postFollow } = usePost(setGlobalMsg);

  useEffect(() => {
    if (trigger !== undefined) {
      postFollowAccpet(request_postFollowAccept);
    }
  }, [trigger]);

  useEffect(() => {
    if (userIdentifier) {
      postFollow(request_postFollow);
    }
  }, [userIdentifier]);

  function onEnterPressed(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getUserSearch(request_getUserSearch);
    }
  }

  function phone() {
    // 만약 AndroidBridge가 존재하면 연락처를 요청
    if (window.AndroidBridge) {
      window.receiveContacts = (data) => {
        setContactData(JSON.parse(data));
      };
      window.handlePermissionDenied = (data) => {
        setGlobalMsg((prev) => [...prev, "연락처 접근을 허용해주세요"]);
      };
      window.AndroidBridge.sendContactsToWeb();
    }
  }

  useEffect(() => {
    if (contactData !== undefined) {
      postUserInfoByPhone(request_postUserInfoListByPhone);
    }
  }, [contactData]);

  const navigate = useNavigate();
  const location = useLocation();
  const [lastSegment, setLastSegment] = useState(null);

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastSegmentValue = pathSegments.pop() || pathSegments.pop();
    setLastSegment(lastSegmentValue);
  }, [location]);

  // useEffect(() => {
  //   if (!userInfoModal) {
  //     navigate("/friend");
  //   }
  // }, [userInfoModal]);

  return (
    <FriendComBox>
      <UserSearchBox>
        <User>
          {searchUser && (
            <UserProfile
              key={searchUser.userIdentifier}
              onClick={(e) => {
                e.stopPropagation();
                setUserInfoModal(searchUser.userIdentifier);
                navigate(`./userInfo${searchUser.userIdentifier}`);
              }}
            >
              <ProfileImg width={"2.5rem"} height={"2.5rem"} src={searchUser.profileImgFileUrl} />
              <Nickname>{searchUser.nickName}</Nickname>
            </UserProfile>
          )}
        </User>

        <UserSearchBar>
          <StyledUserSearchInput
            type="text"
            value={userSearchInput}
            placeholder=" Email , Phone , UserCode"
            onChange={(e) => {
              setUserSearchInput(e.target.value);
            }}
            onKeyDown={(e) => {
              onEnterPressed(e);
            }}
          />

          <span
            onClick={() => {
              if (userSearchInput === "" || userSearchInput === null) {
                return;
              }
              getUserSearch(request_getUserSearch);
            }}
          >
            검색
          </span>
        </UserSearchBar>
      </UserSearchBox>
      <MiddleBox>
        <FollowsBox>
          <h3>Following</h3>
          {follows.map((item, idx) => (
            <BorderBottomItem key={`${item.followIdentifier} Following`}>
              <UserProfile
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`./userInfo${item.followIdentifier}`);
                  setUserInfoModal(item.followIdentifier);
                }}
              >
                <ProfileImg src={item.followprofileImgFileUrl} width={"35px"} height={"35px"} />
                <Nickname>{item.followNickName}</Nickname>
              </UserProfile>
            </BorderBottomItem>
          ))}

          {userInfoModal && (
            <Nickname userInfoModal={userInfoModal} lastSegment={lastSegment} setUserInfoModal={setUserInfoModal} setGlobalMsg={setGlobalMsg} />
          )}
        </FollowsBox>

        <PendingFollowerBox>
          <h3>요청받은 Follow</h3>
          {pendingFollowers.map((item) => (
            <BorderBottomItem key={`${item.followRequsterIdentifier} pendingFollower`}>
              <UserProfile
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`./userInfo${item.followRequsterIdentifier}`);
                  setUserInfoModal(item.followRequsterIdentifier);
                }}
              >
                <ProfileImg src={item.profileImgFileUrl} />
                <Nickname>{item.requesterNickName}</Nickname>
              </UserProfile>

              <AccountBtnBox width="100%">
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
        </PendingFollowerBox>
      </MiddleBox>

      {window.AndroidBridge && (
        <PhoneConnectBtn
          onClick={() => {
            if (!postUserInfoByPhoneLoading) {
              phone();
            }
          }}
        >
          연락처로 친구찾기
        </PhoneConnectBtn>
      )}
      <UserByPhone>
        {userInfoByphoneList.length > 0 && (
          <Ttt>
            {userInfoByphoneList.map((userInfo) => (
              <UserProfile key={`${userInfo.userIdentifier} UserByPhone`}>
                <ProfileImg src={userInfo.profileImgFileUrl} width={"40px"} height={"40px"} />
                <Nickname>{userInfo.nickName}</Nickname>
                <Nickname>{userInfo.phoneNumber}</Nickname>
                <FollowBtn
                  onClick={() => {
                    setUserIdentifier(userInfo.userIdentifier);
                  }}
                >
                  Follow
                </FollowBtn>
              </UserProfile>
            ))}
          </Ttt>
        )}
      </UserByPhone>

      {userInfoModal && <UserInfoCom userInfoModal={userInfoModal} setUserInfoModal={setUserInfoModal} lastSegment={lastSegment} setGlobalMsg={setGlobalMsg} />}
    </FriendComBox>
  );
};

export default FriendCom;
