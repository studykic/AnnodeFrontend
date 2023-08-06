import { Link } from "react-router-dom";
import styled from "styled-components";

export const TopGnbContainer = styled.div`
  position: fixed;
  left: 0;

  width: 100vw;
  top: calc(var(--vh, 1vh) * 0);
  height: calc(var(--vh, 1vh) * 5);

  display: flex;
  justify-content: space-between;

  align-items: center;

  border-bottom: 0.1px solid gray;

  box-sizing: border-box;
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  font-size: 1.4rem;
  color: #aaa;
  z-index: 10000;
  overflow: hidden;
  padding: 0rem 5rem;

  & span {
    font-size: 0.9rem;
  }

  & .pendingFollow {
    font-weight: 600;
    transition: all 1s;

    :hover {
      color: #ffffff;
    }
  }

  & .homeLogo {
    width: 15%;
  }

  @media (max-width: 768px) {
    padding: 0rem 1rem;
    & .homeLogo {
      width: 50%;
    }
  }
`;

export const RightNav = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #aaa;
`;

export const StyledLink = styled(Link)`
  overflow: hidden;
`;

export const StyledImg = styled.img`
  overflow: hidden;
`;

export const TopPendingFollowOverlay = styled.div`
  position: absolute;
  top: calc(var(--vh, 1vh) * 0);
  transform: ${(prev) => (prev.modalOpen ? "translateY(5vh)" : "translateY(-85vh)")};
  left: 0;
  right: 0;

  width: 100vw;
  height: 15vh;

  overflow: scroll;

  background-color: black;

  z-index: 9999;

  transition: 0.5s transform;
  border-bottom: 5px solid gray;
`;

export const ModalWrapper2 = styled.div`
  width: 100%;
`;

export const BorderBottomItem = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-around;

  align-items: center;

  padding: 1rem 0rem;

  border-bottom: 2px solid gray;
`;

export const TopGnbByUserProfile = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 0.3rem;

  padding: 0rem 0.5rem;

  min-width: 20vw;
`;
