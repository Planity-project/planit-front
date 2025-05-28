import { MypageStyled } from "@/features/MyPage/styled";
import { useUser } from "@/context/UserContext";
import Myinfo from "@/features/MyPage/Myinfo";
import MyFav from "@/features/MyPage/MyFav";
import { useEffect, useState } from "react";
import Myinfodays from "@/features/MyPage/MyDays";
import { useRouter } from "next/router";
const MyPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [click, setClick] = useState(0);

  const handleTabClick = (index: number) => {
    setClick(index);
  };
  return (
    <MypageStyled>
      <div className="mypage-wrap">
        <div className="mypage-sideBar">
          <div
            onClick={() => {
              handleTabClick(0);
            }}
            className={`mypage-myinfo ${click === 0 ? "active" : ""}`}
          >
            내 정보
          </div>
          <div
            onClick={() => {
              handleTabClick(1);
            }}
            className={`mypage-mydays ${click === 1 ? "active" : ""}`}
          >
            내 일정
          </div>
          <div
            onClick={() => {
              handleTabClick(2);
            }}
            className={`mypage-likepost ${click === 2 ? "active" : ""}`}
          >
            관심 일정
          </div>
        </div>
        <div className="mypage-component">
          {click === 0 ? (
            <Myinfo user={user} />
          ) : click === 1 ? (
            <Myinfodays user={user} />
          ) : (
            <MyFav user={user} />
          )}
        </div>
      </div>
    </MypageStyled>
  );
};

export default MyPage;
