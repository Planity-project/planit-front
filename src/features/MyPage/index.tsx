import { MypageStyled } from "./styled";
import { useUser } from "@/context/UserContext";
import Myinfo from "./Myinfo";
const MyPage = () => {
  const user = useUser();
  console.log(user);
  return (
    <MypageStyled>
      <div className="mypage-wrap">
        <div className="mypage-sideBar">
          <div>내 정보</div>
          <div>내 일정</div>
          <div>관심 일정</div>
        </div>
        <div className="mypage-component">
          <Myinfo user={user} />
        </div>
      </div>
    </MypageStyled>
  );
};

export default MyPage;
