import React, { useRef, useState } from "react";
import theme from "../../Util/theme";
import usePost from "../../hooks/axios/usePost";
import useSignUp from "../../hooks/signup/useSignUp";
import useForm from "../../hooks/useForm";
import BlueBtn from "../../styledCom/BlueBtn";
import {
  AccountBtnBox,
  DummyImage,
  ErrorMessage,
  FieldWrapper,
  H2Title,
  ImageUploadWrapper,
  NoneProfileImg,
  SignUpBox,
  SignUpPage,
  StyledImage,
  StyledInput,
  StyledInputFile,
  StyledLabel,
  StyledSignUpForm,
} from "../../styledCom/SIgnup.style";
import TermsAndConditionsCom from "./TermsAndConditionsCom";

const SignUpCom = ({ setGlobalMsg }) => {
  const imgInputRef = useRef(null);

  const [slideIn, setSlideIn] = useState(false);
  const [profileImage, setProfileImage] = useState();

  const [termsAndConditionModal, setTermsAndConditionModal] = useState(false);

  const { resultForm: signUpForm, updateForm: updateSignUpForm } = useForm({
    email: "",
    phoneNumber: "",
    nickName: "",
    password: "",
    mailAuthCode: "",
    phoneAuthCode: "",
    profileImageFile: null,
    accountPublic: false,
    termsAndConditionsCheck: false,
  });

  const [passwordCheckValue, setPasswordCheckValue] = useState("");

  const { passwordMismatch, checkingPasswordsMatch, validateForm, request_mailAuth, request_signUp, request_phoneAuth } = useSignUp(
    signUpForm,
    setGlobalMsg,
    passwordCheckValue
  );

  // 메일인증요청
  const { loading: mailAuthLoading, postReq: postMailAuth } = usePost(setGlobalMsg);

  // 회원가입요청
  const { loading: signUpLoading, postReq: postSignUp } = usePost(setGlobalMsg);

  const { loading: phoneAuthLoading, postReq: postPhoneAuth } = usePost(setGlobalMsg);

  return (
    <SignUpBox>
      <StyledSignUpForm className="styledSignUpForm" slideIn={slideIn}>
        <SignUpPage>
          <H2Title>계정 생성</H2Title>
          <FieldWrapper>
            <StyledLabel htmlFor="nickName">NickName </StyledLabel>
            <StyledInput
              type="text"
              placeholder="닉네임 (수정가능)"
              id="nickName"
              name="nickName"
              value={signUpForm.nickName}
              onChange={(e) => {
                updateSignUpForm(e);
              }}
            />
          </FieldWrapper>

          <FieldWrapper>
            <StyledLabel htmlFor="email">Email ( Id ) </StyledLabel>
            <StyledInput
              type="text"
              placeholder="Anonode@00000.com"
              id="email"
              name="email"
              value={signUpForm.email}
              onChange={(e) => {
                updateSignUpForm(e);
              }}
            />
          </FieldWrapper>

          <FieldWrapper>
            <StyledLabel htmlFor="email">Phone</StyledLabel>
            <StyledInput
              type="phoneNumber"
              placeholder="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              value={signUpForm.phoneNumber}
              onChange={(e) => {
                updateSignUpForm(e);
              }}
            />
          </FieldWrapper>

          <FieldWrapper>
            <StyledLabel htmlFor="password">비밀번호 </StyledLabel>
            <StyledInput
              type="password"
              placeholder="비밀번호"
              id="password"
              name="password"
              value={signUpForm.password}
              onChange={(e) => {
                checkingPasswordsMatch(e);
                updateSignUpForm(e);
              }}
            />
          </FieldWrapper>

          <span>비밀번호는 8자리 이상이며 영문자, 숫자를 포함</span>
          <span>특수문자를 사용시 [ "@", "!", "#", "*", "?" ] 중 사용</span>

          <FieldWrapper>
            <StyledLabel htmlFor="passwordCheck">비밀번호 재확인 </StyledLabel>
            <StyledInput
              type="password"
              placeholder="비밀번호 재 확인"
              id="passwordCheck"
              name="passwordCheck"
              value={passwordCheckValue}
              onChange={(e) => {
                console.log(e.target.value);
                setPasswordCheckValue(e.target.value);
                checkingPasswordsMatch(e);
              }}
            />
          </FieldWrapper>

          {passwordMismatch && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </SignUpPage>

        <SignUpPage>
          <H2Title>계정 생성</H2Title>
          <BlueBtn
            btnColor={"#4067E4"}
            onClick={() => {
              setTermsAndConditionModal(true);
            }}
          >
            이용약관 및 개인정보처리방침 동의
          </BlueBtn>

          <FieldWrapper>
            <StyledLabel htmlFor="nickName">메일 인증번호 </StyledLabel>
            <StyledInput
              width="30%"
              type="text"
              placeholder="6자리"
              id="mailAuthCode"
              name="mailAuthCode"
              value={signUpForm.mailAuthCode}
              onChange={(e) => {
                updateSignUpForm(e);
              }}
            />

            <BlueBtn
              onClick={() => {
                postMailAuth(request_mailAuth);
              }}
              loading={mailAuthLoading}
            >
              Email 인증번호 받기
            </BlueBtn>
          </FieldWrapper>

          <FieldWrapper>
            <StyledLabel htmlFor="nickName">Phone 인증번호 </StyledLabel>
            <StyledInput
              width="30%"
              type="text"
              placeholder="6자리"
              id="phoneAuthCode"
              name="phoneAuthCode"
              value={signUpForm.phoneAuthCode}
              onChange={(e) => {
                updateSignUpForm(e);
              }}
            />

            <BlueBtn
              onClick={() => {
                postPhoneAuth(request_phoneAuth);
              }}
              loading={phoneAuthLoading}
            >
              Phone 인증번호 받기
            </BlueBtn>
          </FieldWrapper>

          <ImageUploadWrapper>
            <StyledInputFile
              ref={imgInputRef}
              id="file"
              type="file"
              accept="image/*"
              name="profileImageFile"
              onChange={(e) => {
                updateSignUpForm(e.target.name, e.target.files[0]);
                setProfileImage(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <StyledLabel htmlFor="file">
              {profileImage ? <StyledImage src={profileImage} alt="프로필 이미지" /> : <DummyImage src={profileImage} alt="프로필 이미지" />}{" "}
            </StyledLabel>

            <NoneProfileImg
              onClick={(e) => {
                updateSignUpForm("profileImageFile", null);
                setProfileImage(null);
                imgInputRef.current.value = "";
              }}
            >
              <div>사진 선택안함</div>
            </NoneProfileImg>
          </ImageUploadWrapper>

          <FieldWrapper>
            <StyledLabel htmlFor="accountPublic">공개 계정</StyledLabel>
            <StyledInput
              width="5%"
              type="checkbox"
              placeholder="공개범위"
              id="accountPublic"
              name="accountPublic"
              onChange={(e) => {
                updateSignUpForm(e.target.name, e.target.checked);
              }}
            />

            <BlueBtn
              btnColor={theme.blueBtn}
              onClick={() => {
                if (validateForm()) {
                  postSignUp(request_signUp);
                }
              }}
              loading={signUpLoading}
            >
              회원가입
            </BlueBtn>
          </FieldWrapper>
        </SignUpPage>

        {termsAndConditionModal && (
          <TermsAndConditionsCom
            termsAndConditionModal={termsAndConditionModal}
            updateSignUpForm={updateSignUpForm}
            setTermsAndConditionModal={setTermsAndConditionModal}
          />
        )}
      </StyledSignUpForm>

      <AccountBtnBox>
        <div
          btnColor="blue"
          onClick={() => {
            setSlideIn(false);
          }}
        >
          이전
        </div>
        <div
          onClick={() => {
            setSlideIn(true);
          }}
        >
          다음
        </div>
      </AccountBtnBox>
    </SignUpBox>
  );
};

export default SignUpCom;
