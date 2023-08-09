import React, { useEffect, useState } from "react";
import { FaPlusSquare, FaUserFriends } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GnbContainer, MyInfoImg } from "../../styledCom/Gnb/GnbCom.style";

const GnbCom = ({ myInfo }) => {
  const navigate = useNavigate();

  const [lastScrollTop, setLastScrollTop] = useState(0);

  // 윗방향이 true , 아랫방향이 false
  const [scrollDirection, setScrollDirection] = useState(true);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const isSpaceUri = window.location.pathname.split("/")[1] === "space";

    if (currentScrollTop > lastScrollTop && isSpaceUri) {
      setScrollDirection(false);
    } else {
      setScrollDirection(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  // 로그인을 하거나 브라우저 쿠키에 jwt가 존재하면 jwt를 상태에 저장

  const navigateRoomList = (e) => {
    e?.preventDefault();
    setTimeout(() => {
      navigate("/space");
      // 다시 대화방으로 돌아오는걸 방지하기위해 홈에서 새로고침
      window.location.reload();
    }, 0);
  };

  return (
    <GnbContainer scrollDirection={scrollDirection}>
      <Link
        to="/space"
        onClick={() => {
          const isSpaceUri = window.location.pathname.split("/")[1] === "space";
          if (isSpaceUri) {
            navigateRoomList();
          }
        }}
      >
        Space
      </Link>

      <Link to="/pospaceCreate">
        {" "}
        <FaPlusSquare size={24} />
      </Link>

      <Link to="/friend">
        <FaUserFriends />
      </Link>

      {myInfo && (
        <Link className="imgLink" to="/myInfo">
          <MyInfoImg src={myInfo.profileImgFileUrl} />
        </Link>
      )}
    </GnbContainer>
  );
};

export default GnbCom;
