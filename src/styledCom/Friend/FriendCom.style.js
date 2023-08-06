import styled from "styled-components";
import theme from "../../Util/theme";

export const FriendComBox = styled.div`
  position: absolute;
  left: 0;
  top: calc(var(--vh, 1vh) * 5);

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 90);
`;

export const Ttt = styled.div`
  height: 100%;
  overflow: scroll;
`;

export const UserSearchBox = styled.div`
  margin-top: 1rem;

  width: 90%;

  height: 7vh;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 0rem 1rem;
`;

export const User = styled.div`
  max-width: 50%;
`;

export const UserSearchBar = styled.div`
  display: flex;
  flex-direction: row;

  width: 70%;

  white-space: nowrap;

  justify-content: space-around;
  align-items: center;

  & span {
    cursor: pointer;
  }
`;

export const StyledUserSearchInput = styled.input`
  width: ${(props) => (props.width ? props.width : "70%")};
  padding: 0.5em;
  border: 2px solid gray;
  border-radius: 1rem;

  background-color: transparent;
  color: ${theme.fontColor};

  & ::placeholder {
    color: ${theme.mainColor};
    display: none;
  }
`;

export const MiddleBox = styled.div`
  margin-top: 1rem;
  height: 50vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const FollowsBox = styled.div`
  width: 40%;
  height: 100%;

  padding: 0.7rem;
  border-radius: 1rem;

  overflow-y: scroll;
  background-color: #212121;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.7);
`;

export const PendingFollowerBox = styled.div`
  width: 40%;
  height: 100%;

  padding: 0.7rem;
  border-radius: 1rem;

  overflow-y: scroll;
  background-color: #212121;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.7);
`;

export const BorderBottomItem = styled.div`
  padding: 1rem 0rem;

  border-bottom: 2px solid gray;
`;

export const UserByPhone = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20%;
`;

export const PhoneConnectBtn = styled.div`
  margin-top: 2rem;
  padding: 0.5rem;

  width: fit-content;
`;

export const FollowBtn = styled.div`
  font-size: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0rem 0.5rem;
  background: linear-gradient(45deg, #fa6e85, #675eb9, #5bcff5);

  border-radius: 0.5rem;
`;
