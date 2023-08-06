import styled from "styled-components";

export const GnbContainer = styled.div`
  position: fixed;
  left: 0;

  width: 100vw;
  top: calc(var(--vh, 1vh) * 95);
  height: calc(var(--vh, 1vh) * 5);

  display: flex;
  justify-content: space-around;
  align-items: center;

  box-sizing: border-box;
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  font-size: 1.4rem;
  color: #aaa;
  z-index: 100;

  opacity: ${(props) => (props.scrollDirection === "down" ? 0 : 1)};

  transition: 0.2s;
  & span {
    font-size: 0.9rem;
  }

  & .imgLink {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    overflow: hidden;
  }
`;

export const MyInfoImg = styled.img`
  height: 85%;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  border-radius: 50%;

  border: 1px solid gray;
`;
