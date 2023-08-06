import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.modalOpen ? fadeIn : null)} 0.5s forwards;
  z-index: 999;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 5vh;

  overflow: auto;

  width: ${(props) => (props.width ? props.width : "90vw")};
  height: ${(props) => (props.height ? props.height : "80vh")};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: #242731;

  padding: 1rem;
  border-radius: 8px;

  box-shadow: 0px 0px 10px 2px #6c5dd3;
`;

export const CreateBtnBox = styled.div`
  height: 10%;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ModalInput = styled.input`
  font-size: 1.2rem;

  padding: 0.5em;
  margin: 0.5em 0;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    width: 50%;
  }

  ::placeholder {
    color: #bbb;
    opacity: 1;
  }

  &:focus {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const ModalTextarea = styled.textarea`
  font-size: 1.1rem;
  line-height: 1.5;
  width: 90%;
  height: 50%;

  padding: 0.5em;
  margin: 0.5em 0;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  outline: none;
  resize: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    width: 95%;
  }

  ::placeholder {
    color: #bbb;
    opacity: 1;
  }

  &:focus {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
`;
