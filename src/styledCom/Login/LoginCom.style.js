import styled, { keyframes } from "styled-components";
import theme from "../../Util/theme";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
`;

export const SuccessMessage = styled.div`
  position: absolute;
  top: 10vh;
  width: 100vw;
  box-sizing: border-box;

  background-color: #28a745;
  color: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  animation: ${fadeIn} 1s forwards, ${slideIn} 0.5s forwards;
`;

export const LoginBox = styled.div`
  box-sizing: border-box;

  width: 100vw;

  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export const LoginInfputBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  justify-content: space-around;

  width: 100%;
`;

export const LoninInputWrapper = styled.div`
  display: flex;
  width: 100%;

  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

export const LoginInput = styled.input`
  width: 35%;
  border: none;
  background-color: transparent;
  color: white;
  margin-bottom: 1rem;
  border-bottom: 2px ${theme.mainColor} solid;
`;

export const PasswordResetLabel = styled.div`
  width: 40%;
  margin-top: 1rem;
  margin-left: 2rem;
  padding: 1rem;
  background-color: #333;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 1rem 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;

  h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const PasswordResetMessage = styled.span`
  display: block;
  max-width: 400px; // 혹은 적당한 퍼센트값. 예: 80%
  margin: auto; // 가운데 정렬을 위해 사용
  padding: 20px; // 필요에 따라 조절
  line-height: 1.5; // 행간 설정. 가독성을 위해 보통 1.5~1.6을 사용합니다.
  text-align: justify; // 양쪽 정렬
  cursor: pointer;
  white-space: pre-line;
`;
