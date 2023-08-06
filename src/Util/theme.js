// theme.js

import { keyframes } from "styled-components";

export const textShadowAnimation = keyframes`
  0% {
    text-shadow: 1px 1px 1rem #d9306e, -1px -1px 1rem #d9306e;
  }
  25% {
    text-shadow: 1.5px 1.5px 1.5rem #007BFF, -1.5px -1.5px 1.5rem #007BFF;
  }
  50% {
    text-shadow: 2px 2px 2rem #9C27B0, -2px -2px 2rem #9C27B0;
  }
  75% {
    text-shadow: 1.5px 1.5px 1.5rem #E91E63, -1.5px -1.5px 1.5rem #E91E63;
  }
  100% {
    text-shadow: 1px 1px 1rem #FF5722, -1px -1px 1rem #FF5722;
  }
`;

export const borderAnimation = keyframes`
  0%, 100% {
    box-shadow: 0px 0px 1rem #007BFF;
  }
  25% {
    box-shadow: 0px 0px 2rem #9C27B0;
  }
  50% {
    box-shadow: 0px 0px 3rem #E91E63;
  }
  75% {
    box-shadow: 0px 0px 2rem #FF5722;
  }
`;

export const theme = {
  mainColor: "#E91E63",
  hardMainColor: "#de1547",
  softMainColor: "#ff9190",
  blueBtn: "#4067E4",
  darkFontColor: "#aaa",
  fontColor: "#F4F4F4",
  backgroundColor: "#121212",
  sectionColor1: "#1C1C1C",
  sectionColor2: "#242424",
  navbarColor: "#616161",
};

export default theme;
