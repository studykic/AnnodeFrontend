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

export const UserInfoComBox = styled.div`
  position: fixed;
  left: 0;

  top: calc(var(--vh, 1vh) * 5);

  width: 100vw;
  height: calc(var(--vh, 1vh) * 90);

  background-color: #121212;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  overflow: scroll;
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;

  flex-wrap: wrap;

  width: 100%;
  height: 15%;

  padding: 1rem 0rem;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 0.3rem;

  padding: 0rem 0.5rem;

  min-width: 20vw;
`;

export const FollowBtn = styled.div`
  margin-left: 2rem;
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0rem 0.5rem;
  background: linear-gradient(45deg, #fa6e85, #675eb9, #5bcff5);

  box-shadow: 0px 4px 1rem rgba(0, 0, 0, 0.5);

  border-radius: 0.5rem;
`;

export const UserPospaceItem = styled.div`
  overflow: scroll;
  height: 80%;
`;

export const PospaceInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 15%;

  overflow-x: hidden;
  border-bottom: 2px solid black;
`;

export const PospaceContentBox = styled.div`
  width: 50%;
`;

export const PospaceContent = styled.div`
  width: 100%;
  margin-left: 0.5rem;
  color: ${(props) => (props.color ? props.color : "#e8e6e3")};

  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;

  line-height: 1.7;

  padding: 0.3rem;

  box-sizing: border-box;
`;

export const NoneImg = styled.div`
  width: 60px;
  height: 60px;
`;

export const PospaceLikeCount = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 10%;
`;

export const PospaceKind = styled.div`
  margin-left: 0.5rem;

  max-width: 20%;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.7rem;
`;

export const AiOutlineIdcardBox = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;
