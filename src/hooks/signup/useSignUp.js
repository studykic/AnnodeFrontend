import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../../Util/Request";

function useSignUp(signUpForm, setGlobalMsg, passwordCheckValue) {
  const navigate = useNavigate();
  const [passwordMismatch, setPasswordMismatch] = useState(true);

  // 비밀번호 재확인 검사
  const checkingPasswordsMatch = (e) => {
    if (e.target.name === "passwordCheck") {
      if (signUpForm.password !== e.target.value) {
        setPasswordMismatch(true);
      } else {
        setPasswordMismatch(false);
      }
    } else if (e.target.name === "password") {
      if (passwordCheckValue !== e.target.value) {
        setPasswordMismatch(true);
      } else {
        setPasswordMismatch(false);
      }
    }
  };

  // 회원가입 폼을 post하기전 유효성 검사
  const validateForm = () => {
    let newErrorMessage;
    // 비밀번호 유효성 검사
    if (signUpForm.password.length < 8 || signUpForm.password.search(/\d/) === -1 || signUpForm.password.search(/[a-zA-Z]/) === -1) {
      newErrorMessage = "비밀번호는 8자리 이상이며 영문자, 숫자를 포함해야 합니다";
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
      return false;
    }

    // 비밀번호 일치 검사
    if (passwordMismatch) {
      newErrorMessage = "비밀번호가 일치하지 않습니다.";
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
      return false;
    }

    // 닉네임 유효성 검사는 서버에서 수행

    // 이메일 인증코드
    if (signUpForm.mailAuthCode.length !== 6) {
      newErrorMessage = "이메일 인증코드는 6자리를 입력해야합니다.";
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
      return false;
    }

    // 이메일 인증코드
    if (signUpForm.termsAndConditionsCheck === false) {
      newErrorMessage = "이용약관에 동의하지않았습니다.";
      setGlobalMsg((prev) => [...prev, newErrorMessage]);
      return false;
    }

    // 모든 검사를 통과한 경우
    return true;
  };

  const reqBodySignUp = () => {
    const signupFormData = new FormData();

    const filteredEntries = Object.entries(signUpForm).filter(([key, value]) => !(key === "profileImageFile" && value === null));

    filteredEntries.forEach(([key, value]) => {
      signupFormData.append(key, value);
    });

    return signupFormData;
  };

  const signUpSuccess = () => {
    navigate("/");
  };

  const requestAuthSuccess = () => {
    setGlobalMsg((prev) => [...prev, "5분 이내 인증번호를 입력해주세요."]);
  };

  const request_mailAuth = new Request(
    "/mailConfirm",
    {
      withCredentials: true,
    },
    {
      eventName: "signUp",
      email: signUpForm.email,
    },
    requestAuthSuccess,
    null,
    null
  );

  const request_phoneAuth = new Request(
    "/phoneConfirm",
    {
      withCredentials: true,
    },
    {
      eventName: "signUp",
      phoneNumber: signUpForm.phoneNumber,
    },
    requestAuthSuccess,
    null,
    null
  );

  const request_signUp = new Request(
    "/signup",
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    reqBodySignUp(),
    signUpSuccess,
    null,
    null
  );

  return { passwordMismatch, checkingPasswordsMatch, validateForm, request_mailAuth, request_signUp, request_phoneAuth };
}

export default useSignUp;
