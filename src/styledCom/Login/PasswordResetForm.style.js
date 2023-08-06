import styled from "styled-components";
import theme from "../../Util/theme";
export const PassWordResetContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  & > * {
    margin-top: 2rem;
  }
`;

export const PassWordResetInputWrapper = styled.div`
  width: 90%;

  display: flex;
  flex-direction: row;

  justify-content: space-around;
`;

export const PassWordResetInput = styled.input`
  border: none;
  background-color: transparent;
  /* height: 100%; */
  color: ${theme.fontColor};

  margin-bottom: 1rem;
  border-bottom: 2px ${theme.mainColor} solid;
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

export const AuthCodeLabel = styled.label`
  display: block;
  margin-top: 1rem;
`;
