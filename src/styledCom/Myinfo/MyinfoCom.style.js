import styled, { keyframes } from "styled-components";
import theme from "../../Util/theme";

export const MyInfoContainer = styled.div`
  position: absolute;
  left: 0;
  top: calc(var(--vh, 1vh) * 5);

  width: 100vw;
  height: calc(var(--vh, 1vh) * 90);

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const glow = keyframes`
  0% {
    box-shadow: 0 0 1px #3498db;
  }
  50% {
    box-shadow: 0 0 9px #3498db, 0 0 9px #3498db;
  }
  100% {
    box-shadow: 0 0 1px #3498db;
  }
`;

export const EditBadge = styled.span`
  display: inline-block;
  background-color: #3498db;
  border-radius: 3px;
  padding: 2px 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: ${glow} 2s infinite;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c3e50;
  }
`;

export const Imglabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  transition: all 0.3s ease;
`;

export const UserProfileImage = styled.img`
  cursor: pointer;

  width: 7rem;
  height: 7rem;
  object-fit: cover;

  border-radius: 50%;
  border: 3px solid #667784;
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

export const UserInfoItem = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;

  width: 100%;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #242731;
  }
`;

export const NickNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 100%;

  height: ${(props) => (props.openState ? "15%" : "auto")};

  margin-bottom: 0.5rem;

  border-radius: 5px;

  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #242731;
  }
`;

export const ChangeUserInfoItem = styled.input`
  min-width: 30%;
  border: none;
  background-color: transparent;

  color: ${theme.fontColor};

  margin-bottom: 1rem;
  border-bottom: 2px ${theme.mainColor} solid;
`;

export const TermsAndConditionsLink = styled.div`
  margin-top: 0.5rem;
  position: absolute;
  top: calc(var(--vh, 1vh) * 0);

  align-self: self-end;
`;
