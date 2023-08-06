import React from "react";
import theme from "../../Util/theme";
import usePost from "../../hooks/axios/usePost";
import usePasswordResetet from "../../hooks/login/usePasswordReset";
import useForm from "../../hooks/useForm";
import BlueBtn from "../../styledCom/BlueBtn";
import { PassWordResetContainer, PassWordResetInput, PassWordResetInputWrapper } from "../../styledCom/Login/PasswordResetForm.style";

const PasswordResetForm = ({ setGlobalMsg }) => {
  // const [email, setEmail] = useState("");
  // const [mailAuthCode, updatePasswordResetForm] = useState("");

  // const [resetPassword, setResetPassword] = useState("");

  const {
    resultForm: passwordResetForm,
    updateForm: updatePasswordResetForm,
    resetAll,
  } = useForm({
    email: "",
    mailAuthCode: "",
    resetPassword: "",
  });

  const { request_mailAuth, request_passwordReset } = usePasswordResetet(passwordResetForm, resetAll, setGlobalMsg);

  const { loading: mailAuthLoading, postReq: postMailAuth } = usePost(setGlobalMsg);
  const { loading: passwordResetloading, postReq: postPasswordReset } = usePost(setGlobalMsg);

  return (
    <PassWordResetContainer>
      <h2>비밀번호 변경</h2>

      <PassWordResetInputWrapper>
        <PassWordResetInput
          type="email"
          name="email"
          placeholder="Email"
          value={passwordResetForm.email}
          onChange={(e) => updatePasswordResetForm(e)}
          required
        />

        <BlueBtn
          onClick={() => {
            postMailAuth(request_mailAuth);
          }}
          loading={mailAuthLoading}
        >
          인증번호 요청
        </BlueBtn>
      </PassWordResetInputWrapper>

      <span>
        <PassWordResetInput
          type="text"
          placeholder="인증번호"
          id="mailAuthCode"
          name="mailAuthCode"
          value={passwordResetForm.mailAuthCode}
          onChange={(e) => {
            updatePasswordResetForm(e);
          }}
        />
      </span>

      <span>
        <PassWordResetInput
          type="text"
          placeholder="새 비밀번호 입력"
          name="resetPassword"
          value={passwordResetForm.resetPassword}
          onChange={(e) => updatePasswordResetForm(e)}
          required
        />
      </span>
      <span>비밀번호는 8자리 이상이며 영문자, 숫자를 포함</span>
      <span>특수문자를 사용시 [ "@", "!", "#", "*", "?" ] 중 사용</span>
      <BlueBtn
        btnColor={theme.mainColor}
        onClick={() => {
          postPasswordReset(request_passwordReset);
        }}
        loading={passwordResetloading}
      >
        비밀번호 변경
      </BlueBtn>
    </PassWordResetContainer>
  );
};

export default PasswordResetForm;
