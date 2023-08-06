import React, { useState } from "react";
import UserInfoCom from "../../components/UserInfo/UserInfoCom";
import useBan from "../../hooks/admin/useBan";
import useGet from "../../hooks/axios/useGet";
import usePost from "../../hooks/axios/usePost";
import BlueBtn from "../../styledCom/BlueBtn";
import { FieldWrapper, StyledInput, StyledLabel } from "../../styledCom/Input.style";

const Ban = ({ setGlobalMsg }) => {
  const [userInfoModal, setUserInfoMoal] = useState(false);

  const [targetIdentifier, setTargetIdentifier] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState(null);

  const { getReq: getUserSearch } = useGet(setGlobalMsg);

  const { postReq: postBan } = usePost(setGlobalMsg);

  const { request_postBan, request_getUserSearch } = useBan({ userSearchInput, setSearchUser, targetIdentifier, setTargetIdentifier });

  function onEnterPressed(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getUserSearch(request_getUserSearch);
    }
  }

  return (
    <div>
      <FieldWrapper>
        <StyledLabel>친구등록라벨</StyledLabel>
        <StyledInput
          type="text"
          value={userSearchInput}
          placeholder="UserCode , Email , PhoneNumber"
          onChange={(e) => {
            setUserSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            onEnterPressed(e);
          }}
        ></StyledInput>
      </FieldWrapper>
      <span
        onClick={() => {
          getUserSearch(request_getUserSearch);
        }}
      >
        검색
      </span>

      <BlueBtn
        onClick={() => {
          postBan(request_postBan);
        }}
      >
        Ban
      </BlueBtn>
      {searchUser && (
        <div
          key={searchUser.userIdentifier}
          onClick={(e) => {
            e.stopPropagation();
            setUserInfoMoal(searchUser.userIdentifier);
          }}
        >
          <div>{searchUser.nickName}</div>
          <img src={searchUser.profileImgFileUrl} width={"50px"} height={"50px"} />
        </div>
      )}

      {userInfoModal && <UserInfoCom userInfoModal={userInfoModal} setUserInfoModal={setUserInfoMoal} setGlobalMsg={setGlobalMsg} />}
    </div>
  );
};

export default Ban;
