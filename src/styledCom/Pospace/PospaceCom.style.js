import { FaRegHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MessageSend = styled.div`
  position: fixed;

  bottom: calc(var(--vh, 1vh) * 0);

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100vw;
`;

export const StyledInputChat = styled.input`
  width: 85%;
  padding: 0.5rem 0px;
  padding-left: 1rem; // 입력된 문자열 왼쪽에 여백 추가
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #2b2b2b;

  color: white;
`;

export const SendBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  background: linear-gradient(145deg, #fa6e85, #675eb9, #5bcff5);
`;

export const StyledInputFile = styled.input`
  display: none;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: calc(var(--vh, 1vh) * 5);
  left: 0;
  right: 0;

  width: 100vw;
  height: calc(var(--vh, 1vh) * 95);

  z-index: 999;
  background-color: #121212;
`;

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
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

export const PostInteractionBox = styled.div`
  align-self: self-start;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  font-size: 1.2rem;

  width: 85%;

  margin-top: 0.5rem;
`;

export const BottomBox = styled.div`
  position: relative;

  box-sizing: border-box;

  bottom: calc(var(--vh, 1vh) * 0);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
`;

export const BottomEventBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  padding: 0.5rem;
`;

export const PostDetailInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 60%;
`;

export const UserInteractionBox = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-around;
  align-items: center;

  padding: 0px 0.5rem;

  width: 35%;
  max-width: 35%;
  overflow: hidden;
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  bottom: calc(var(--vh, 1vh) * 0);

  width: 100%;
  height: calc(var(--vh, 1vh) * 40);

  background-color: rgba(50, 50, 50, 1);

  transform: ${(props) => (props.commentModal ? "translateY(-0%)" : "translateY(100%)")};
  transition: all 0.3s;
`;

export const CommentWindow = styled.div`
  width: 100%;
  height: auto;

  padding: 1rem 0rem;

  overflow: scroll;
`;

export const UserCommentBox = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  overflow: hidden;
  min-height: 25%;

  margin-top: 1rem;

  padding-left: 1.5rem;

  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

export const CommenterBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  width: 80%;
`;

export const ProfileImg = styled.img`
  border-radius: 50%;
`;

export const ProfileName = styled.div`
  width: 60%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #a9a9a9;

  margin-left: 1rem;

  font-weight: 700;
  font-size: 1.5rem;
`;

export const CommentContent = styled.div`
  line-height: 2.5;
  font-size: 1.2rem;

  border-radius: 8px;
  margin: 1rem;
`;

export const StringContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 12%;
`;

export const ChatSection = styled.section`
  width: 45%;
  height: 100%;
  overflow-y: scroll;
  border-radius: 20px;

  background-color: #212121;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const ChatMessage = styled.div`
  margin: 0.7rem;
  animation: ${fadeIn} 0.5s ease-in;
  background-color: rgba(128, 128, 128, 0.1);
  border-radius: 15px;
  padding: 5px 1rem;
  border: 1px solid #696661;
  overflow-x: hidden;
  text-align: start;
  word-wrap: break-word;
`;

export const Message = styled.span`
  color: "#6c5dd3";
  word-wrap: break-word;
`;

export const Nickname = styled.span`
  color: "#6c5dd3";
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const PospaceContentBox = styled.div`
  align-self: self-end;
  min-width: 30%;
  max-width: 50%;
  height: 100%;
  overflow: scroll;

  background-color: #212121;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  border-radius: 1rem;

  line-height: 2;

  padding: 1rem;

  box-sizing: border-box;
`;

export const PospaceContentEditBox = styled.textarea`
  align-self: self-end;
  min-width: 30%;
  width: 50%;
  height: 100%;
  overflow: scroll;

  background-color: #212121;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  border-radius: 1rem;

  line-height: 2;

  padding: 1rem;

  box-sizing: border-box;
  color: white;
`;

export const StringContentBox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

export const PospaceContentBox2 = styled.div`
  width: 85%;
  height: 50%;
  overflow: scroll;

  background-color: #212121;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  border-radius: 1rem;

  line-height: 2.5;

  padding: 1.5rem;

  box-sizing: border-box;
`;

export const EditPospaceContentBox2 = styled.textarea`
  width: 85%;
  height: 50%;
  overflow: scroll;

  background-color: #212121;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  border-radius: 1rem;

  line-height: 2.5;

  padding: 1.5rem;

  box-sizing: border-box;

  color: white;
`;

export const ChatSection2 = styled.section`
  width: 85%;
  height: 40%;
  overflow-y: scroll;
  border-radius: 20px;

  background-color: #212121;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const StyledCarousel = styled(Carousel)`
  height: 55vh;

  background-color: black;
`;

export const SelectImg = styled.img`
  width: auto;
  height: 55vh;

  object-fit: contain;
`;

export const ImgDeleteBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 1rem;

  font-weight: 900;

  font-size: 0.9rem;
  color: white;
`;

export const SelectImg2 = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: cover;
`;

export const MuteButtonBox = styled.div`
  width: 100%;
  height: 5%;
  font-size: 0.8rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const MuteButton = styled.button`
  width: 45%;
  max-width: 200px;
  height: 4vh;
  color: #ffffff;
  background-color: #212121;
  border-radius: 4px;

  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #414141;
  }

  &:focus {
    outline: none;
  }
`;

export const MicSelect = styled.select`
  width: 40%;

  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  color: #ffffff;
  background: #333333;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
  transition: background-color 0.5s, color 0.5s;
  cursor: pointer;
`;

export const CommentSend = styled.div`
  position: fixed;

  bottom: calc(var(--vh, 1vh) * 0);

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100vw;

  box-sizing: border-box;
`;

export const StyledInputChat2 = styled.input`
  width: 85%;
  padding: 0.5rem 0px;
  padding-left: 1rem; // 입력된 문자열 왼쪽에 여백 추가
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #2b2b2b;

  color: white;
`;

export const EditBox = styled.div`
  display: flex;

  flex-direction: column;

  max-height: 10%;

  align-items: center;

  overflow: scroll;

  border-top: 1px solid gray;

  border-bottom: 1px solid gray;

  margin: 1rem 0rem;
`;

export const EditSelectBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EditBtn = styled.div`
  display: flex;
  flex-direction: row;

  width: 70%;

  margin: 2rem;

  justify-content: space-around;
`;

export const StyledInputCheck = styled.input`
  scale: 1.5;
  margin-left: 1rem;
`;

export const UserBackGroundBox = styled.div`
  position: absolute;
  top: 4vh;
  width: 100vw;
  height: 60vh;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  justify-items: center;
  align-content: space-between;
`;

export const MainContentBox = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
  height: 65%;
`;

export const RowUserList = styled.div`
  display: flex;
  justify-content: space-around;
  height: fit-content;
`;

// 유저 박스
export const UserBox = styled.div`
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 1rem;
`;

export const UserBoxItem = styled.div``;

export const VolumeSlider = styled.input`
  width: 80%;
`;

export const AudioItem = styled.div`
  width: 100%;
`;

export const LightDiv = styled.div`
  width: 100%;
  height: 3px;
  transition: box-shadow 0.2s ease;
`;

export const LikeBtnBox = styled.div`
  width: fit-content;
`;

export const StyledFaRegHeart = styled(FaRegHeart)`
  transition: 0.3s all;
  :active {
    fill: red;
  }
`;

export const ReportModal = styled.div`
  position: absolute;
  top: 50vh;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ReportModalContent = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  width: 400px;
  border: 2px solid #4a586e;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`;

export const ReportTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px;
  border: 2px solid #d1d9e6;
  border-radius: 10px;
`;
