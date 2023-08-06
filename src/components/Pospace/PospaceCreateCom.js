import React, { useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFileText } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosGlobe, IoIosMic } from "react-icons/io";
import { RiGroupLine } from "react-icons/ri";

import useGet from "../../hooks/axios/useGet";
import usePost from "../../hooks/axios/usePost";
import usePospace from "../../hooks/pospace/usePospace";
import useForm from "../../hooks/useForm";
import BlueBtn from "../../styledCom/BlueBtn";
import { StyledInput, StyledOption, StyledSelect } from "../../styledCom/Input.style";
import { StyledInputFile } from "../../styledCom/Pospace/PospaceCom.style";
import {
  CrossFollowUserListBox,
  InputTextBox,
  NoneSelectImg,
  PospaceCreateBox,
  PospaceImgBox,
  SelectImg,
  StyledLabel,
  StyledTextArea,
  UserNickName,
} from "../../styledCom/Pospace/PospaceCreateCom.style";
const PospaceCreateCom = ({ setGlobalMsg }) => {
  const [crossFollowUserList, setCrossFollowUserList] = useState([]);

  const [userTagList, setUserTagList] = useState([]);

  const {
    resultForm: pospaceForm,
    updateForm: updatePospaceForm,
    resetAll,
  } = useForm({
    pospaceContent: "",
    maxAnnode: "2",
    visibility: "FOLLOWER",
    pospaceImgs: [],
    tolkOpen: true,
  });

  const { request_postPospaceCreate, request_getCrossFollowUserList } = usePospace({
    pospaceForm,
    setCrossFollowUserList,
    userTagList,
    setCrossFollowUserList,
    setUserTagList,
    resetAll,
  });

  const { getReq } = useGet(setGlobalMsg);
  const { postReq, loading: postingLoading } = usePost(setGlobalMsg);

  useEffect(() => {
    getReq(request_getCrossFollowUserList);
  }, []);

  function toggleUserTag(item) {
    setUserTagList((prev) => {
      if (prev.includes(item.userIdentifier)) {
        // 이미 리스트에 식별 코드가 있으면 제거
        return prev.filter((prevItem) => prevItem !== item.userIdentifier);
      } else {
        // 리스트에 식별 코드가 없으면 추가
        return [...prev, item.userIdentifier];
      }
    });
  }

  return (
    <PospaceCreateBox>
      <StyledInputFile
        id="pospaceImgs"
        type="file"
        name="pospaceImgs"
        accept="image/*"
        onChange={(e) => {
          // 선택된 파일들을 배열로 변환합니다.
          let selectedFiles = Array.from(e.target.files);

          // 선택된 파일이 10개 이상인 경우, 앞에서부터 10개만 선택합니다.
          if (selectedFiles.length > 10) {
            selectedFiles = selectedFiles.slice(0, 10);
            setGlobalMsg((prev) => [...prev, "10장 이하의 사진이 등록됩니다"]);
          }

          // updatePospaceForm 함수에 선택된 파일들을 전달합니다.
          updatePospaceForm(e.target.name, selectedFiles);
        }}
        multiple
      />

      <PospaceImgBox>
        <StyledLabel htmlFor="pospaceImgs">
          <span>Picture</span>
        </StyledLabel>

        {pospaceForm.pospaceImgs.length > 0 ? (
          pospaceForm.pospaceImgs.map((file, idx) => <SelectImg key={idx} src={URL.createObjectURL(file)} alt="프로필 이미지" />)
        ) : (
          <NoneSelectImg>
            <AiOutlinePicture />{" "}
          </NoneSelectImg>
        )}
      </PospaceImgBox>

      <InputTextBox>
        <StyledLabel>
          {" "}
          <BsFileText />
          Content
        </StyledLabel>
        {/* <StyledInput /> */}
        <StyledTextArea
          id="pospaceContent"
          name="pospaceContent"
          value={pospaceForm.pospaceContent}
          placeholder="300자 이내 작성"
          maxLength="300"
          onChange={updatePospaceForm}
        />
      </InputTextBox>

      <InputTextBox>
        <StyledLabel>
          {" "}
          <RiGroupLine />
          Max
        </StyledLabel>

        <StyledSelect name="maxAnnode" value={pospaceForm.maxAnnode} onChange={updatePospaceForm}>
          <StyledOption value="2">2명</StyledOption>
          <StyledOption value="4">4명</StyledOption>
          <StyledOption value="6">6명</StyledOption>
        </StyledSelect>
      </InputTextBox>

      <InputTextBox>
        <StyledLabel htmlFor="tolkOpen">
          <IoIosMic size={30} />
          Pospace 대화허용
        </StyledLabel>
        <StyledInput
          type="checkbox"
          placeholder="대화허용"
          id="tolkOpen"
          name="tolkOpen"
          checked={pospaceForm.tolkOpen}
          onChange={(e) => {
            updatePospaceForm(e.target.name, e.target.checked);
          }}
        />
      </InputTextBox>

      <InputTextBox>
        <StyledLabel htmlFor="visibility">
          {" "}
          <IoIosGlobe />
          공개 범위
        </StyledLabel>
        <StyledSelect name="visibility" value={pospaceForm.visibility} onChange={updatePospaceForm}>
          <StyledOption value="ALL">ALL</StyledOption>
          <StyledOption value="FOLLOWER">FOLLOWER</StyledOption>
          <StyledOption value="CROSSFOLLOW">CROSS FOLLOW</StyledOption>
        </StyledSelect>
      </InputTextBox>

      {crossFollowUserList.length > 0 && (
        <CrossFollowUserListBox>
          <StyledLabel htmlFor="userListTag">User Tag List</StyledLabel>
          {crossFollowUserList.map((item, index) => (
            <UserNickName
              key={index}
              onClick={() => {
                toggleUserTag(item);
              }}
            >
              {userTagList.includes(item.userIdentifier) && <FaCheck />} {/* item.userIdentifier가 userTagList에 포함되어 있을 때만 아이콘 표시 */}
              {item.nickName}
            </UserNickName>
          ))}
        </CrossFollowUserListBox>
      )}
      <BlueBtn
        btnColor="#4D88FD"
        loading={postingLoading}
        onClick={() => {
          if (!postingLoading) {
            postReq(request_postPospaceCreate);
          }
        }}
      >
        작성
      </BlueBtn>
    </PospaceCreateBox>
  );
};

export default PospaceCreateCom;
