import Request from "../../Util/Request";

function usePasswordReset(passwordResetForm, resetAll, setGlobalMsg) {
  const requestMailAuthSuccess = () => {
    setGlobalMsg((prev) => [...prev, "5분 이내로 인증번호를 입력해주세요."]);
  };
  const requestPasswordResetSuccess = () => {
    setGlobalMsg((prev) => [...prev, "성공적으로 변경되었습니다."]);
    resetAll();
  };

  const request_mailAuth = new Request(
    "/mailConfirm",
    {
      withCredentials: true,
    },
    {
      eventName: "resetPassword",
      email: passwordResetForm.email,
    },
    requestMailAuthSuccess,
    null,
    null
  );

  const request_passwordReset = new Request(
    "/passwordReset",
    {},
    { email: passwordResetForm.email, resetPassword: passwordResetForm.resetPassword, mailAuthCode: passwordResetForm.mailAuthCode },
    requestPasswordResetSuccess,
    null,
    null
  );

  return { request_mailAuth, request_passwordReset };
}

export default usePasswordReset;
