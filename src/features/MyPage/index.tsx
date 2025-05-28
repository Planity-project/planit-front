// pages/mypage/[tab].tsx
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import Myinfo from "@/features/MyPage/Myinfo";
import Myinfodays from "@/features/MyPage/MyDays";
import MyFav from "@/features/MyPage/MyFav";
import { MypageStyled } from "@/features/MyPage/styled";

const MyPage = () => {
  const { tab } = useRouter().query;
  const { user } = useUser();

  const renderComponent = () => {
    if (tab === "info") return <Myinfo user={user} />;
    if (tab === "days") return <Myinfodays user={user} />;
    if (tab === "fav") return <MyFav user={user} />;
    return <div>잘못된 경로입니다.</div>;
  };

  return (
    <MypageStyled>
      <div className="mypage-wrap">
        <div className="mypage-sideBar">
          <div
            className={`mypage-myinfo ${tab === "info" ? "active" : ""}`}
            onClick={() => location.replace("/mypage/info")}
          >
            내 정보
          </div>
          <div
            className={`mypage-mydays ${tab === "days" ? "active" : ""}`}
            onClick={() => location.replace("/mypage/days")}
          >
            내 일정
          </div>
          <div
            className={`mypage-likepost ${tab === "fav" ? "active" : ""}`}
            onClick={() => location.replace("/mypage/fav")}
          >
            관심 일정
          </div>
        </div>
        <div className="mypage-component">{renderComponent()}</div>
      </div>
    </MypageStyled>
  );
};

export default MyPage;
