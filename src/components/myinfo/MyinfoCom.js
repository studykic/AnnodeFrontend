import React from "react";

import { useEffect, useState } from "react";
import { FaCalendarDay, FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import theme from "../../Util/theme";
import useDelete from "../../hooks/axios/useDelete";
import useGet from "../../hooks/axios/useGet";
import usePost from "../../hooks/axios/usePost";
import useMyinfo from "../../hooks/myinfo/useMyinfo";
import useForm from "../../hooks/useForm";
import { StyledLabel, UserInfoItem, UserInfoItemBox, UserInfoText } from "../../styledCom/Input.style";
import {
  AccountBtnBox,
  ChangeUserInfoItem,
  Imglabel,
  MyInfoContainer,
  NickNameWrapper,
  TermsAndConditionsLink,
  UserProfileImage,
} from "../../styledCom/Myinfo/MyinfoCom.style";
import UserInfoCom from "../UserInfo/UserInfoCom";

const MyinfoCom = ({ fcmToken, setGlobalMsg, setLoginState, setFirstCheck }) => {
  const [userInfoModal, setUserInfoMoal] = useState(false);
  const [openState, setOpenState] = useState(false);
  const {
    resultForm: newUserinfoForm,
    updateForm,
    resetEntry,
  } = useForm({
    profileImgFile: null,
    nickName: "",
  });

  // 첫 렌더링시 방 정보를 파라미터의 roomId로 가져온다
  const { getReq: getMyinfo } = useGet(setGlobalMsg);

  const { postReq } = usePost(setGlobalMsg);

  const { deleteReq: deleteUser } = useDelete(setGlobalMsg);

  const { loading: editItemLoading, postReq: postEditItem } = usePost(setGlobalMsg);

  const { myInfo, profileImg, request_getMyinfo, request_postLogout, request_postEditItem, request_deleteUser, logOut } = useMyinfo({
    fcmToken,
    newUserinfoForm,
    setLoginState,
    setGlobalMsg,
  });

  function nickNameEditOpen(event) {
    setOpenState(!openState);
    resetEntry(event);
  }

  function editAndRenewal(request_postEditItem) {
    postEditItem(request_postEditItem).then((res) => {
      getMyinfo(request_getMyinfo);
    });
  }

  const navigate = useNavigate();
  const location = useLocation();
  const [lastSegment, setLastSegment] = useState(null);

  useEffect(() => {
    getMyinfo(request_getMyinfo);
  }, []);

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const lastSegmentValue = pathSegments.pop() || pathSegments.pop();
    setLastSegment(lastSegmentValue);
  }, [location]);

  return (
    <MyInfoContainer>
      <TermsAndConditionsLink>
        <Link to="/termsAndConditions">이용약관 및 개인정보처리방침</Link>
      </TermsAndConditionsLink>

      <input
        type="file"
        name="profileImgFile"
        id="profileImgFile"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          updateForm(e.target.name, e.target.files[0]);
        }}
      />

      <AccountBtnBox>
        <div
          onClick={() => {
            if (window.confirm("로그아웃을 하시겠습니까?")) {
              postReq(request_postLogout);
              logOut();
              setFirstCheck(false);
            }
          }}
        >
          Logout
        </div>

        <div
          onClick={() => {
            if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
              deleteUser(request_deleteUser);
            }
          }}
        >
          계정제거
        </div>
      </AccountBtnBox>

      <Imglabel htmlFor="profileImgFile">
        <UserProfileImage src={newUserinfoForm.profileImgFile ? URL.createObjectURL(newUserinfoForm.profileImgFile) : myInfo.profileImgFileUrl} alt="" />
      </Imglabel>

      <UserInfoItem
        onClick={() => {
          if (!window.AndroidBridge) {
            const url = `${myInfo.email}`;

            navigator.clipboard.writeText(url);
            setGlobalMsg((prev) => [...prev, "Email이 복사되었습니다"]);
          }
        }}
      >
        {" "}
        <UserInfoText> {myInfo.email} </UserInfoText>
      </UserInfoItem>

      <NickNameWrapper openState={openState}>
        <UserInfoItemBox>
          <UserInfoItem name="nickName" onClick={nickNameEditOpen}>
            <div name="nickName"> {myInfo.nickName}</div>
            <MdEdit size={25} color="#4549C8" />
          </UserInfoItem>

          <UserInfoItem
            onClick={() => {
              if (!window.AndroidBridge) {
                const url = `${myInfo.userIdentifier}`;

                navigator.clipboard.writeText(url);
                setGlobalMsg((prev) => [...prev, "UserCode가 복사되었습니다"]);
              }
            }}
          >
            <StyledLabel>Code</StyledLabel>
            {myInfo.userIdentifier}
          </UserInfoItem>
        </UserInfoItemBox>

        {openState ? (
          <ChangeUserInfoItem
            type="text"
            placeholder="2 ~ 20자 NickName 변경"
            name="nickName"
            value={newUserinfoForm.nickName}
            maxLength={20}
            onChange={(e) => {
              updateForm(e);
            }}
          />
        ) : null}
      </NickNameWrapper>

      <UserInfoItemBox>
        <UserInfoItem>
          {" "}
          <FaCalendarDay color={theme.mainColor} />{" "}
          {new Date(myInfo.userCreatedDate).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })}
        </UserInfoItem>

        <UserInfoItem>
          <FaUser color={theme.mainColor} />
          {myInfo.followerCount}
        </UserInfoItem>
      </UserInfoItemBox>

      <AccountBtnBox>
        <div
          onClick={() => {
            editAndRenewal(request_postEditItem);
          }}
          loading={editItemLoading}
        >
          Edit
        </div>

        <div
          btnColor={"gray"}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`./userInfo${myInfo.userIdentifier}`);
            setUserInfoMoal(myInfo.userIdentifier);
          }}
        >
          작성글
        </div>
      </AccountBtnBox>

      {userInfoModal && <UserInfoCom userInfoModal={userInfoModal} lastSegment={lastSegment} setUserInfoModal={setUserInfoMoal} setGlobalMsg={setGlobalMsg} />}
    </MyInfoContainer>
  );
};

export default MyinfoCom;
