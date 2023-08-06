import styled, { keyframes } from "styled-components";
import theme, { borderAnimation } from "../Util/theme";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
`;

export const StyledSignUpForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  left: ${(props) => (props.slideIn ? "-100vw" : 0)};

  max-width: 100vw;

  max-height: 100vh;

  transition: 0.5s all;
`;

export const FieldWrapper = styled.div`
  display: flex;

  flex-direction: row;

  justify-content: space-between;
  width: auto;

  max-width: 95vw;

  border-bottom: 2px solid gray;

  margin-top: 3rem;

  & > input {
    margin-left: 1rem;
  }

  & label {
    white-space: pre-wrap;
  }

  & * {
    white-space: nowrap;
  }
`;

export const SignUpPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  min-width: 100vw;

  height: 92vh;
  padding-bottom: 2vh;

  box-sizing: border-box;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5em;
  font-weight: 600;
  color: ${theme.mainColor};
`;

export const StyledInput = styled.input`
  padding: 0.5em;
  border: none;
  border-radius: 3px;

  width: ${(props) => (props.width ? props.width : "auto")};

  background-color: transparent;
  color: ${theme.fontColor};

  & ::placeholder {
    color: ${theme.mainColor};
    display: none;
  }
`;

export const StyledInputFile = styled.input`
  display: none;
`;

export const ErrorMessage = styled.div`
  margin-top: 0.5em;
  font-weight: 900;
  color: #fae100;
`;

export const ImageUploadWrapper = styled.div`
  align-self: center;
  display: flex;

  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  min-height: 20vh;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
    margin-left: -10%;
  }
`;

export const StyledImage = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;

  border-radius: 50%;
  border: 3px solid #667784;
  animation: ${borderAnimation} 3s ease-in-out infinite;

  margin-top: 1rem;
`;

export const DummyImage = styled.div`
  width: 7rem;
  height: 7rem;
  object-fit: cover;

  border-radius: 50%;
  border: 3px solid #667784;
  background-color: #667784;
  animation: ${borderAnimation} 3s ease-in-out infinite;

  margin-top: 1rem;
`;

export const NoneProfileImg = styled.div`
  margin-top: 1rem;
  transition: all 0.5s;
  font-size: 1.2rem;
  font-weight: 600;

  color: #c2bbec;

  :hover {
    color: #6c5dd3;
    font-size: 1.3rem;
  }
`;

export const SignUpBox = styled.div`
  height: 100vh;
  max-height: 100vh;

  overflow-y: hidden;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const H2Title = styled.h2`
  margin-left: 1rem;
`;

export const AccountBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  font-size: 1.2rem;
  font-weight: 600;

  width: 50%;
`;
