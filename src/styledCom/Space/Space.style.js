import { IoMdClose } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import styled, { keyframes } from "styled-components";
import theme from "../../Util/theme";

export const SpaceContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  width: 100vw;

  align-items: center;

  /* background: linear-gradient(179deg, #681d37, ${theme.sectionColor1}); */
`;

export const PospaceItem = styled.div`
  background-color: #212121;
  box-shadow: 0px 0px 40px rgba(210, 180, 140, 0.4);
  padding: 1rem;

  margin: 1rem;
  margin-top: 7rem;
  border-radius: 0.3rem;

  width: 85%;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const rotate3D = keyframes`
  0% { transform: perspective(600px) scale(1) rotateY(0deg); }
  50% { transform: perspective(600px) scale(1.1) rotateY(-180deg); }
  100% { transform: perspective(600px) scale(1) rotateY(-360deg); }
`;

export const HeartBox = styled.div`
  width: fit-content;
  padding: 0.5rem;

  & > .FaRegHeart {
    animation: ${rotate3D} 5s infinite ease-in-out;
    transition: 0.1s all;

    &:active {
      scale: 1.2;
      fill: red;
    }
  }
`;

export const Content = styled.div`
  margin: 10px 0; // 내용 사이의 간격을 적절하게 설정
`;

export const ContentText = styled.div`
  max-height: 15vh;
  text-align: center;
  overflow: scroll;

  line-height: 2.5;

  padding: 1rem 0rem;

  border-bottom: 2px solid gray;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px; // 사용자 정보 부분은 아래에 더 많은 간격을 둡니다.
  cursor: pointer;
`;

export const UserDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const UserProfileImg = styled.img`
  height: 3rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 10px;
  object-fit: cover;
`;

export const StyledCloseIconBox = styled.div`
  background-color: rgba(32, 32, 32, 0.9);

  width: 100vw;
  height: fit-content;

  display: flex;

  justify-content: end;
  align-items: center;
`;

export const StyledCloseIcon = styled(IoMdClose)`
  padding: 0.5rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const Image = styled.img`
//   max-width: 90vw;
//   max-height: 90vh;
//   object-fit: cover; // 이미지의 비율을 유지하면서, 가능한 한 많은 영역을 채우게끔 설정
// `;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 140vh;
  object-fit: contain;
`;

export const StyledMdRefresh = styled(MdRefresh)`
  z-index: 10000;
`;

export const StyledCarousel = styled(Carousel)``;

export const PospaceImgBox = styled.div``;

export const PospaceImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: cover;

  @media (min-width: 768px) {
    max-height: 60vh;
    object-fit: contain;
  }
`;
