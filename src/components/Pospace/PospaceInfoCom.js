import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaEdit, FaExclamationTriangle, FaRegComment, FaShareAltSquare, FaTrash } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { useLocation } from "react-router-dom";
import theme from "../../Util/theme";
import useDelete from "../../hooks/axios/useDelete";
import useGet from "../../hooks/axios/useGet";
import usePatch from "../../hooks/axios/usePatch";
import usePost from "../../hooks/axios/usePost";
import usePospaceInfo from "../../hooks/pospace/usePospcaeInfo";
import useForm from "../../hooks/useForm";
import useTime from "../../hooks/useTime";

// import { ReportModal, ReportModalContent, ReportTextArea } from "../../styledCom/ChatRoom/ChatRoomHeaderBoxCon.style";
import { AccountBtnBox, FieldWrapper, StyledLabel, StyledOption, StyledSelect } from "../../styledCom/Input.style";
import {
  ASD,
  ASDD,
  AaaB,
  AaaBc,
  AudioItem,
  BTT,
  BottomBox,
  ChatMessage,
  ChatSection,
  ChatSection2,
  CommentBox,
  CommentContent,
  CommentSend,
  CommentWindow,
  EditBtn,
  EditPospaceContentBox2,
  ImgDeleteBtn,
  LightDiv,
  LikeBtnBox,
  MainContentBox,
  Message,
  MessageSend,
  MicSelect,
  ModalOverlay,
  ModalWrapper,
  MuteButtonBox,
  Nickname,
  PospaceContentBox,
  PospaceContentBox2,
  PospaceContentEditBox,
  PostDetailInfoBox,
  PostInteractionBox,
  ProfileImg,
  ProfileName,
  ReportModal,
  ReportModalContent,
  ReportTextArea,
  RowUserList,
  SelectImg,
  SendBtn,
  SendBtn2,
  StringContentBox,
  StringContentBox2,
  StyledCarousel,
  StyledFaRegHeart,
  StyledInputChat,
  StyledInputChat2,
  StyledInputCheck,
  UserBox,
  UserCommentBox,
  UserInteractionBox,
  VolumeSlider,
} from "../../styledCom/Pospace/PospaceCom.style";
import { StyledCloseIcon, StyledCloseIconBox } from "../../styledCom/Space/Space.style";
import UserInfoCom from "../UserInfo/UserInfoCom";

const PospaceInfoCom = ({ lastSegment, pospaceModal, setPospaceModal, selectPospaceId, setSelectPospaceId, setGlobalMsg }) => {
  //Audio
  const audioRef = useRef(null);

  //Audio

  const [inputState, setInputState] = useState("");

  const [deleteCommentId, setDeleteCommentId] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [pospaceInfo, setPospaceInfo] = useState(null);

  //

  const [userInfoModal, setUserInfoModal] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportText, setReportText] = useState("");

  const [likePospaceID, setLikePospaceID] = useState(undefined);

  const [pospaceCommentList, setPospaceCommentList] = useState([]);

  const {
    resultForm: editForm,
    updateForm: updateEditForm,
    resetAll,
  } = useForm({
    visibility: null,
    tolkOpen: true,
    pospaceContent: null,
    maxAnnode: undefined,
    deleteFileImgList: [],
  });

  const { getReq: getPospaceCommentList } = useGet(setGlobalMsg);
  const { getReq: getPospaceToken } = useGet(setGlobalMsg);
  const { getReq: getPospaceInfo } = useGet(setGlobalMsg);
  const { postReq: postPospaceComment } = usePost(setGlobalMsg);
  const { postReq: postPospaceLike } = usePost(setGlobalMsg);
  const { postReq: postPospaceReport } = usePost(setGlobalMsg);
  const { patchReq: patchPospace } = usePatch(setGlobalMsg);
  const { deleteReq: deletePospace } = useDelete(setGlobalMsg);
  const { deleteReq: deleteComment } = useDelete(setGlobalMsg);

  const {
    myIdentifier,
    userList,
    receiveAudioRefs,
    receiveVolumnRefs,
    isMyselfMuted,
    muteMyself,
    isAllMuted,
    muteAll,
    micList,
    refSelectMic,
    prevVolMeasStop,

    chatList,

    onEnterPressedComment,
    onEnterPressedMessage,
    request_deletePospaceReq,
    request_postPospaceLike,
    request_postPospaceReport,
    request_patchPospace,
    request_deletePospaceComment,
    request_getPospaceComment,
    cleanup,
  } = usePospaceInfo({
    inputState,
    setInputState,
    audioRef,
    setGlobalMsg,
    pospaceInfo,
    getPospaceToken,
    getPospaceInfo,
    setPospaceInfo,
    selectPospaceId,
    comment,
    deleteCommentId,
    reportText,
    editForm,
    setLikePospaceID,
    setShowReportModal,
    setPospaceCommentList,
  });

  const { formatDateTime } = useTime();

  function pospaceImgDelete(event, url) {
    if (editForm.deleteFileImgList.includes(url)) {
      const newImgUrlList = editForm.deleteFileImgList.filter((item) => item !== url);
      updateEditForm(event.currentTarget.dataset.name, newImgUrlList);
    } else {
      updateEditForm(event.currentTarget.dataset.name, [...editForm.deleteFileImgList, event.currentTarget.dataset.url]);
    }
  }

  const location = useLocation();

  // 뒤로가기를 발동하면 모든 Pospace가 닫히게됨, 하나의 레이어씩 닫기는 나가기 버튼을 통해 만들기
  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      setSelectPospaceId(null);
      setPospaceModal(false);
      setUserInfoModal(false);
    });
  }, [lastSegment]);

  useEffect(() => {
    if (deleteCommentId) {
      deleteComment(request_deletePospaceComment);
    }
  }, [deleteCommentId]);

  useEffect(() => {
    if (likePospaceID) {
      postPospaceLike(request_postPospaceLike);
    }
  }, [likePospaceID]);

  return (
    pospaceInfo && (
      <ModalOverlay
        modalOpen={pospaceModal}
        name="modalOverlay"
        onClick={(e) => {
          if (e.target.getAttribute("name") === "modalOverlay") {
            setPospaceInfo(null);
            setPospaceModal(false);
          }
        }}
      >
        <audio ref={audioRef} id="audio" muted crossOrigin="anonymous"></audio>
        <ModalWrapper>
          {/* <span>{wsId}</span> */}

          {micList.length > 0 && userList.length > 0 && (
            <MuteButtonBox>
              <MicSelect ref={refSelectMic} onChange={prevVolMeasStop}>
                {micList.map((mic, index) => (
                  <option value={mic.deviceId} key={index + mic.groupId}>
                    {mic.label}
                  </option>
                ))}
              </MicSelect>

              <span btnColor={theme.mainColor} onClick={muteMyself}>
                {isMyselfMuted ? "내 마이크 음소거" : "마이크 음소거 해제"}
              </span>
              <span btnColor={"#F76172"} onClick={muteAll}>
                {isAllMuted ? "전체 음소거" : "전체 음소거 해제"}
              </span>
            </MuteButtonBox>
          )}

          {pospaceInfo && (
            <>
              {pospaceInfo.pospaceImgFileUrlList.length > 0 && (
                <MainContentBox>
                  <RowUserList>
                    {userList.map((user, userIdx) => {
                      if (userIdx < 3) {
                        return (
                          <UserBox key={user.userIdentifier + "UserBox"}>
                            <VolumeSlider
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              defaultValue="0.5"
                              onChange={(e) => {
                                receiveAudioRefs.current[userIdx].volume = e.target.value;
                              }}
                            />

                            <AudioItem>
                              <audio
                                ref={(elem) => {
                                  receiveAudioRefs.current[userIdx] = elem;
                                }}
                                id="audio"
                                data-useridentifier={user.userIdentifier}
                                autoPlay
                              />

                              <LightDiv
                                id={user.userIdentifier}
                                data-useridentifier={user.userIdentifier}
                                ref={(elem) => (receiveVolumnRefs.current[userIdx] = elem)}
                                data-userindex={userIdx}
                              ></LightDiv>
                            </AudioItem>
                          </UserBox>
                        );
                      }
                      return null; // return null if idx is not less than 3
                    })}
                  </RowUserList>
                  <StyledCarousel infiniteLoop autoPlay showIndicators={false} showArrows={false} showStatus={false} showThumbs={true}>
                    {Array.from(pospaceInfo.pospaceImgFileUrlList).map((url, index) => (
                      <div key={index}>
                        <SelectImg src={url} alt="프로필 이미지" />
                        {editModal && (
                          <ImgDeleteBtn
                            data-name="deleteFileImgList"
                            data-url={url}
                            onClick={(event) => {
                              pospaceImgDelete(event, url);
                            }}
                          >
                            {editForm.deleteFileImgList.includes(url) && <FaCheck />} <span>제거</span>
                          </ImgDeleteBtn>
                        )}
                      </div>
                    ))}
                  </StyledCarousel>

                  <RowUserList>
                    {userList.map((user, userIdx) => {
                      if (userIdx >= 3) {
                        return (
                          <UserBox key={user.userIdentifier + "UserBox"}>
                            <ASDD>
                              <AudioItem>
                                <audio
                                  ref={(elem) => {
                                    receiveAudioRefs.current[userIdx] = elem;
                                  }}
                                  id="audio"
                                  data-useridentifier={user.userIdentifier}
                                  autoPlay
                                />

                                <LightDiv
                                  id={user.userIdentifier}
                                  data-useridentifier={user.userIdentifier}
                                  ref={(elem) => (receiveVolumnRefs.current[userIdx] = elem)}
                                  data-userindex={userIdx}
                                ></LightDiv>
                              </AudioItem>

                              <VolumeSlider
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                defaultValue="0.5"
                                onChange={(e) => {
                                  receiveAudioRefs.current[userIdx].volume = e.target.value;
                                }}
                              />
                            </ASDD>
                          </UserBox>
                        );
                      }
                      return null; // return null if idx is not less than 3
                    })}
                  </RowUserList>
                </MainContentBox>
              )}

              {/* {pospaceInfo.pospaceImgFileUrlList.length > 0 ? (
                <StringContentBox>
                  <ChatSection>
                    {chatList.map((chat, idx) => (
                      <ChatMessage key={idx}>
                        <Nickname msgType={chat.msgType}>{chat.nickName} </Nickname>

                        <div
                          key={idx}
                          onClick={() => {
                            setUserInfoModal(chat.userIdentifier);
                          }}
                        >
                          {chat.profileImgFileUrl && <img width={"50px"} height={"50px"} src={chat.profileImgFileUrl} />}
                        </div>

                        <Message msgType={chat.msgType}>{chat.message}</Message>
                      </ChatMessage>
                    ))}
                  </ChatSection>

                  {editModal ? (
                    <PospaceContentEditBox
                      name="pospaceContent"
                      rows="5"
                      cols="33"
                      placeholder="300자 이내 작성"
                      maxLength="300"
                      defaultValue={pospaceInfo.pospaceContent}
                      onChange={updateEditForm}
                    />
                  ) : (
                    <PospaceContentBox>{pospaceInfo.pospaceContent}</PospaceContentBox>
                  )}
                </StringContentBox>
              ) : (
                <StringContentBox2>
                  <PospaceContentBox2> {pospaceInfo.pospaceContent}</PospaceContentBox2>
                  <ChatSection2>
                    {chatList.map((chat, idx) => (
                      <ChatMessage key={idx}>
                        <Nickname msgType={chat.msgType}>{chat.nickName} </Nickname>

                        <div
                          key={idx}
                          onClick={() => {
                            setUserInfoModal(chat.userIdentifier);
                          }}
                        >
                          {chat.profileImgFileUrl && <img width={"50px"} height={"50px"} src={chat.profileImgFileUrl} />}
                        </div>

                        <Message msgType={chat.msgType}> {chat.message} </Message>
                      </ChatMessage>
                    ))}
                  </ChatSection2>
                </StringContentBox2>
              )} */}
              {pospaceInfo.pospaceImgFileUrlList.length > 0 ? (
                <StringContentBox>
                  <ChatSection>
                    {chatList.map((chat, idx) => (
                      <ChatMessage key={idx}>
                        <Nickname msgType={chat.msgType}>{chat.nickName} </Nickname>

                        <div
                          key={idx}
                          onClick={() => {
                            setUserInfoModal(chat.userIdentifier);
                          }}
                        >
                          {chat.profileImgFileUrl && <img width={"50px"} height={"50px"} src={chat.profileImgFileUrl} />}
                        </div>

                        <Message msgType={chat.msgType}>{chat.message}</Message>
                      </ChatMessage>
                    ))}
                  </ChatSection>

                  {editModal ? (
                    <PospaceContentEditBox
                      name="pospaceContent"
                      rows="5"
                      cols="33"
                      placeholder="300자 이내 작성"
                      maxLength="300"
                      defaultValue={pospaceInfo.pospaceContent}
                      onChange={updateEditForm}
                    />
                  ) : (
                    <PospaceContentBox>{pospaceInfo.pospaceContent}</PospaceContentBox>
                  )}
                </StringContentBox>
              ) : (
                <MainContentBox>
                  <RowUserList>
                    {userList.map((user, userIdx) => {
                      if (userIdx < 3) {
                        return (
                          <UserBox key={user.userIdentifier + "UserBox"}>
                            <VolumeSlider
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              defaultValue="0.5"
                              onChange={(e) => {
                                receiveAudioRefs.current[userIdx].volume = e.target.value;
                              }}
                            />

                            <AudioItem>
                              <audio
                                ref={(elem) => {
                                  receiveAudioRefs.current[userIdx] = elem;
                                }}
                                id="audio"
                                data-useridentifier={user.userIdentifier}
                                autoPlay
                              />

                              <LightDiv
                                id={user.userIdentifier}
                                data-useridentifier={user.userIdentifier}
                                ref={(elem) => (receiveVolumnRefs.current[userIdx] = elem)}
                                data-userindex={userIdx}
                              ></LightDiv>
                            </AudioItem>
                          </UserBox>
                        );
                      }
                      return null;
                    })}
                  </RowUserList>

                  <StringContentBox2>
                    {editModal ? (
                      <EditPospaceContentBox2
                        name="pospaceContent"
                        rows="5"
                        cols="33"
                        placeholder="300자 이내 작성"
                        maxLength="300"
                        defaultValue={pospaceInfo.pospaceContent}
                        onChange={updateEditForm}
                      />
                    ) : (
                      <PospaceContentBox2> {pospaceInfo.pospaceContent}</PospaceContentBox2>
                    )}

                    <ChatSection2>
                      {chatList.map((chat, idx) => (
                        <ChatMessage key={idx}>
                          <Nickname msgType={chat.msgType}>{chat.nickName} </Nickname>

                          <div
                            key={idx}
                            onClick={() => {
                              setUserInfoModal(chat.userIdentifier);
                            }}
                          >
                            {chat.profileImgFileUrl && <img width={"50px"} height={"50px"} src={chat.profileImgFileUrl} />}
                          </div>

                          <Message msgType={chat.msgType}> {chat.message} </Message>
                        </ChatMessage>
                      ))}
                    </ChatSection2>
                  </StringContentBox2>

                  <StyledCarousel infiniteLoop showArrows={false} showStatus={false}>
                    {/* 이전에 설명한 이미지 캐러셀 렌더링 부분 */}
                  </StyledCarousel>

                  <RowUserList>
                    {userList.map((user, userIdx) => {
                      if (userIdx >= 3) {
                        return (
                          <UserBox key={user.userIdentifier + "UserBox"}>
                            <VolumeSlider
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              defaultValue="0.5"
                              onChange={(e) => {
                                receiveAudioRefs.current[userIdx].volume = e.target.value;
                              }}
                            />

                            <AudioItem>
                              <audio
                                ref={(elem) => {
                                  receiveAudioRefs.current[userIdx] = elem;
                                }}
                                id="audio"
                                data-useridentifier={user.userIdentifier}
                                autoPlay
                              />

                              <LightDiv
                                id={user.userIdentifier}
                                data-useridentifier={user.userIdentifier}
                                ref={(elem) => (receiveVolumnRefs.current[userIdx] = elem)}
                                data-userindex={userIdx}
                              ></LightDiv>
                            </AudioItem>
                          </UserBox>
                        );
                      }
                      return null;
                    })}
                  </RowUserList>
                </MainContentBox>
              )}

              {editModal && (
                <AaaB>
                  <AaaBc>
                    <FieldWrapper>
                      <StyledSelect name="maxAnnode" value={editForm.maxAnnode} onChange={updateEditForm}>
                        <StyledOption value="">최대 대화인원수 선택</StyledOption>
                        <StyledOption value="2">2명</StyledOption>
                        <StyledOption value="4">4명</StyledOption>
                        <StyledOption value="6">6명</StyledOption>
                      </StyledSelect>
                    </FieldWrapper>

                    <FieldWrapper>
                      <StyledSelect name="visibility" value={editForm.visibility || ""} onChange={updateEditForm}>
                        <StyledOption value="">공개범위 선택</StyledOption>
                        <StyledOption value="ALL">ALL</StyledOption>
                        <StyledOption value="FOLLOWER">FOLLOWER</StyledOption>
                        <StyledOption value="CROSSFOLLOW">CROSSFOLLOW</StyledOption>
                      </StyledSelect>
                    </FieldWrapper>
                  </AaaBc>
                  <FieldWrapper width="fit-content">
                    <StyledLabel htmlFor="tolkOpen">
                      <IoIosMic size={30} />
                      대화허용
                    </StyledLabel>
                    <StyledInputCheck
                      type="checkbox"
                      placeholder="대화허용"
                      id="tolkOpen"
                      name="tolkOpen"
                      checked={editForm.tolkOpen}
                      onChange={(e) => {
                        updateEditForm(e.target.name, e.target.checked);
                      }}
                    />
                  </FieldWrapper>
                  <EditBtn>
                    <span
                      onClick={() => {
                        patchPospace(request_patchPospace);
                        setEditModal(false);
                        resetAll();
                      }}
                    >
                      수정완료
                    </span>

                    <span
                      onClick={() => {
                        setEditModal(false);
                        resetAll();
                      }}
                    >
                      취소
                    </span>
                  </EditBtn>
                </AaaB>
              )}

              {pospaceInfo.userSimpleResTagList.length >= 1 &&
                pospaceInfo.userSimpleResTagList.map((tag) => (
                  <div
                    key={tag.userIdentifier}
                    onClick={() => {
                      setUserInfoModal(tag.userIdentifier);
                    }}
                  >
                    Tag
                    <img width={"50px"} height={"50px"} src={tag.profileImgFileUrl} />
                  </div>
                ))}
            </>
          )}

          {/* 좋 */}
          {!editModal && (
            <PostInteractionBox>
              <LikeBtnBox
                onClick={(e) => {
                  e.stopPropagation();
                  setLikePospaceID(selectPospaceId);
                }}
              >
                <StyledFaRegHeart /> {pospaceInfo.pospaceLikeCount}
              </LikeBtnBox>

              {/* 댓 */}
              <div>
                {" "}
                <FaRegComment
                  onClick={() => {
                    getPospaceCommentList(request_getPospaceComment);
                    setCommentModal((prev) => !prev);
                  }}
                />
              </div>

              <div>
                <FaShareAltSquare
                  onClick={() => {
                    const url = `https://annode-kic.com/space/pospace${selectPospaceId}`;

                    navigator.clipboard.writeText(url);
                    setGlobalMsg((prev) => [...prev, "링크가 복사되었습니다"]);
                  }}
                />
              </div>

              {/* 신 */}
              <div>
                {" "}
                <FaExclamationTriangle
                  onClick={() => {
                    setShowReportModal(true);
                  }}
                />
              </div>

              {pospaceInfo.tolkOpen && <div>Max-{pospaceInfo.maxAnnode}</div>}

              <span
                onClick={() => {
                  cleanup();
                  setSelectPospaceId(null);
                  setPospaceInfo(null);
                  setPospaceModal(false);
                }}
              >
                나가기
              </span>
            </PostInteractionBox>
          )}

          <BTT>
            <BottomBox>
              {pospaceInfo.editAuthority ? (
                <UserInteractionBox>
                  <FaEdit
                    size={30}
                    onClick={() => {
                      setEditModal(true);
                    }}
                  />

                  <FaTrash
                    size={30}
                    onClick={() => {
                      if (window.confirm("삭제 확인")) {
                        deletePospace(request_deletePospaceReq);
                        setSelectPospaceId(null);
                        setPospaceInfo(null);
                        setPospaceModal(false);
                      }
                    }}
                  />
                </UserInteractionBox>
              ) : (
                <UserInteractionBox>
                  <ProfileImg
                    onClick={() => {
                      setUserInfoModal(pospaceInfo.writerSimpleRes.userIdentifier);
                    }}
                    width={"40px"}
                    height={"40px"}
                    src={pospaceInfo.writerSimpleRes.profileImgFileUrl}
                    alt="User"
                  />
                  <ProfileName>{pospaceInfo.writerSimpleRes.nickName}</ProfileName>
                </UserInteractionBox>
              )}

              <PostDetailInfoBox>
                <span> {formatDateTime(pospaceInfo.pospceCreatedTime)}</span>
                <span>{pospaceInfo.visibility}</span>
              </PostDetailInfoBox>
            </BottomBox>

            {userList.length > 0 && !editModal && !commentModal && (
              <MessageSend>
                <StyledInputChat
                  type="text"
                  placeholder=" Enter"
                  value={inputState}
                  onChange={(e) => {
                    setInputState(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    onEnterPressedMessage(e);
                  }}
                />

                {/* 전송 */}
                <SendBtn
                  onClick={() => {
                    onEnterPressedMessage(null);
                  }}
                >
                  <MdSend size={25} />
                </SendBtn>
              </MessageSend>
            )}
          </BTT>

          <CommentBox commentModal={commentModal}>
            <StyledCloseIconBox>
              <StyledCloseIcon
                size={30}
                onClick={() => {
                  setCommentModal((prev) => !prev);
                }}
              />
            </StyledCloseIconBox>

            <CommentWindow>
              {(pospaceCommentList && pospaceCommentList.length > 0 ? pospaceCommentList : pospaceInfo?.pospaceCommentList).map((item, idx) => (
                <UserCommentBox key={item.id}>
                  <ProfileImg
                    onClick={() => {
                      setUserInfoModal(item.commentWriter.userIdentifier);
                    }}
                    width={"40px"}
                    height={"40px"}
                    src={item.commentWriter.profileImgFileUrl}
                    alt="User"
                  />
                  <ASD>
                    <ProfileName>{item.commentWriter.nickName}</ProfileName>
                    <CommentContent>{item.commentContent}</CommentContent>
                  </ASD>

                  {item.commentWriter.userIdentifier === myIdentifier && (
                    <span
                      onClick={() => {
                        setDeleteCommentId(item.id);
                      }}
                    >
                      제거
                    </span>
                  )}
                </UserCommentBox>
              ))}
            </CommentWindow>

            <CommentSend>
              <StyledInputChat2
                type="text"
                required
                placeholder="댓글"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                onKeyDown={(e) => {
                  onEnterPressedComment(e, postPospaceComment, setComment);
                }}
              />
              {/* 전송 */}
              <SendBtn2
                onClick={() => {
                  onEnterPressedComment(null, postPospaceComment, setComment);
                }}
              >
                <MdSend size={25} />
              </SendBtn2>
            </CommentSend>
          </CommentBox>
        </ModalWrapper>

        {userInfoModal && (
          <UserInfoCom userInfoModal={userInfoModal} setUserInfoModal={setUserInfoModal} lastSegment={lastSegment} setGlobalMsg={setGlobalMsg} />
        )}

        {showReportModal && (
          <ReportModal>
            <ReportModalContent>
              <h3>
                신고 내용 입력, <br />
                필요시 가해 User의 Code도 포함해주세요
              </h3>
              <ReportTextArea value={reportText} onChange={(e) => setReportText(e.target.value)}></ReportTextArea>

              <AccountBtnBox>
                <div
                  data-action="report"
                  onClick={() => {
                    postPospaceReport(request_postPospaceReport);
                  }}
                >
                  제출
                </div>

                <div
                  data-action="report"
                  onClick={() => {
                    setReportText(null);
                    setShowReportModal(false);
                  }}
                >
                  취소
                </div>
              </AccountBtnBox>
            </ReportModalContent>
          </ReportModal>
        )}
      </ModalOverlay>
    )
  );
};
export default PospaceInfoCom;
