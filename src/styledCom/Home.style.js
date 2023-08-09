import styled from "styled-components";

export const HomeCon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  min-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const HomeLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopSession = styled.div`
  display: flex;
  height: 20vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const HomeSectionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
