import styled from "styled-components";
import theme from "../Util/theme";

export const FieldWrapper = styled.div`
  display: flex;

  flex-direction: row;

  width: ${(props) => (props.width ? props.width : "auto")};

  margin-top: 3rem;

  & > input {
    margin-left: 1rem;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5em;
  font-weight: 600;
  color: ${theme.mainColor};
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  white-space: nowrap;
`;

export const StyledInput = styled.input`
  width: ${(props) => (props.width ? props.width : "50%")};
  padding: 0.5em;
  border: none;
  border-radius: 3px;

  background-color: transparent;
  color: ${theme.fontColor};

  & ::placeholder {
    color: ${theme.mainColor};
    display: none;
  }
`;

export const StyledTextArea = styled.textarea`
  margin-left: 1rem;
  height: 2.5rem;
  padding: 0.5em;
  overflow-y: hidden;

  background-color: transparent;
  color: ${theme.fontColor};

  /* border: 2px solid gray; */

  border-radius: 1rem;
`;

export const StyledSelect = styled.select`
  margin-left: 1rem;
  height: 2.5rem;

  padding: 0rem 0.5rem;
  overflow-y: hidden;
  border: 2px solid gray;
  background-color: transparent;
  color: ${theme.fontColor};

  border-radius: 1rem;

  &:focus {
    background-color: ${theme.backgroundColor};
    color: ${theme.fontColor};
    outline: none;
  }
`;
export const StyledOption = styled.option``;

export const UserInfoItemBox = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-around;

  width: 90vw;
`;

export const UserInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  border-bottom: 2px solid gray;

  min-width: 40%;
`;

export const UserInfoText = styled.div`
  text-align: center;
  margin-bottom: 0.5em;
  min-width: 50vw;
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.3rem;

  padding: 0rem 0.5rem;

  min-width: 20vw;
`;

export const ProfileImg = styled.img`
  width: ${(props) => (props.width ? props.width : "35px")};
  height: ${(props) => (props.height ? props.height : "35px")};

  aspect-ratio: 1 / 1;

  object-fit: cover;

  border-radius: 50%;
`;

export const Nickname = styled.div`
  max-width: 60%; // 또는 max-width 사용
  margin-left: 0.5rem;
  font-weight: 600;
  display: block; // 또는 inline-block
  align-items: center;
  text-align: center;
  color: ${(props) => (props.color ? props.color : "#e8e6e3")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  padding: 0.3rem;
`;

export const AccountBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  font-size: 1.1rem;
  font-weight: 600;

  width: ${(props) => (props.width ? props.width : "50%")};
`;
