import styled from "styled-components";

export const PospaceCreateBox = styled.div`
  position: absolute;
  left: 0;
  top: calc(var(--vh, 1vh) * 5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  overflow: hidden;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 90);

  box-sizing: border-box;
`;

export const InputTextBox = styled.div`
  margin-top: 2rem;

  display: flex;

  max-width: 80%;
  padding: 1rem 0.5rem;

  justify-content: space-between;
  align-items: center;

  overflow: hidden;
  border-radius: 1rem;

  background-color: #212121;
`;

export const StyledLabel = styled.label`
  font-weight: 900;

  display: flex;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;

  padding-left: 0.5rem;
`;

export const StyledInput = styled.input`
  border: none;

  background-color: transparent;

  max-width: 50%;
  height: 100%;
`;

export const StyledTextArea = styled.textarea`
  margin-left: 1rem;
  height: 4rem;
  padding: 0.5em;
  overflow-y: hidden;

  color: white;

  background-color: transparent;

  border: none;

  line-height: 1.5;

  padding: 0rem 1rem;

  border-radius: 1rem;
`;

// export const StyledCarousel = styled(Carousel)`
//   margin-top: 1rem;
//   height: 55vh;
// `;

export const PospaceImgBox = styled.div`
  margin-top: 1rem;
  display: flex;

  height: 5rem;

  width: 100vw;
  overflow-x: scroll;

  padding-left: 1rem;

  cursor: pointer;
`;

export const SelectImg = styled.img`
  min-width: 4.5rem;
  min-height: 4.5rem;

  max-width: 4.5rem;
  max-height: 4.5rem;
  object-fit: cover;

  margin-left: 1rem;
  border: 1px solid gray;
`;

export const NoneSelectImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;
  border: 1px solid white;

  margin-left: 1rem;
`;

export const CrossFollowUserListBox = styled.div`
  margin-top: 2rem;
  width: 80%;

  height: 12%;

  overflow: scroll;

  background-color: #212121;

  padding: 1rem;

  border-radius: 1rem;
`;

export const UserNickName = styled.div`
  padding: 0.5rem;
`;

export const PostingBtn = styled.div`
  padding: 1rem;
`;
