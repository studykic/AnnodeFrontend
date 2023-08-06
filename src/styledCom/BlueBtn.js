import React from "react";
import styled, { keyframes } from "styled-components";

const pulseButtonBorder = keyframes`
  0% {
    color: #ef6c00
  }
  50% {
    color: #ffc107
  }
  100% {
    color: #ef6c00
  }
`;

const BlueBtn = styled.span`
  background: ${(props) => (props.btnColor ? props.btnColor : "linear-gradient(2deg, #e91e63, #ff9190)")};

  text-align: center;
  color: #e6e8ea;
  padding: 0.7rem;

  border-radius: 4px;
  cursor: pointer;

  transition: transform 0.2s, background-color 0.5s, color 0.5s;

  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};

  &:hover {
    transform: scale(1.05);
    color: #fff;
  }
`;

const ColorChangingText = styled.span`
  font-weight: 600;
  display: inline-block;
  animation: ${(props) => (props.loading == "true" ? pulseButtonBorder : null)} 0.7s infinite;
`;

function BlueBtnBox({ children, onClick, loading, width, height, btnColor }) {
  const stringLoading = loading?.toString();

  return (
    <BlueBtn onClick={onClick} width={width} height={height} btnColor={btnColor}>
      <ColorChangingText loading={stringLoading}> {children}</ColorChangingText>
    </BlueBtn>
  );
}

export default React.memo(BlueBtnBox);
