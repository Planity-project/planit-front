import { MypageStyled } from "./styled";
import { useUser } from "@/context/UserContext";
import Myinfo from "./Myinfo";

import { useState } from "react";
import Myinfodays from "./MyDays";
const MyPage = () => {
  const user = useUser();
  const [click, setClick] = useState(0);
  return (
    <MypageStyled>
      <div className="mypage-wrap">
        <div className="mypage-sideBar">
          <div
            onClick={() => setClick(0)}
            className={`mypage-myinfo ${click === 0 ? "active" : ""}`}
          >
            내 정보
          </div>
          <div
            onClick={() => setClick(1)}
            className={`mypage-mydays ${click === 1 ? "active" : ""}`}
          >
            내 일정
          </div>
          <div
            onClick={() => setClick(2)}
            className={`mypage-likepost ${click === 2 ? "active" : ""}`}
          >
            관심 일정
          </div>
        </div>
        <div className="mypage-component">
          {click === 0 ? (
            <Myinfo user={user} />
          ) : click === 1 ? (
            <Myinfodays />
          ) : (
            <></>
          )}
        </div>
      </div>
    </MypageStyled>
  );
};

export default MyPage;
