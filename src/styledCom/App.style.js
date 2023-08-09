import styled, { keyframes } from "styled-components";

export const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ErrorMessageCom = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  animation: ${fadeInOut} 3s;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const LodingBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  background: linear-gradient(145deg, #fa6e85, #675eb9, #5bcff5);
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const LodingText = styled.h1`
  font-family: "Lora", serif;
`;
