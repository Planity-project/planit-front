import { MypageStyled } from "./styled";
import { useUser } from "@/context/UserContext";
const MyPage = () => {
  const user = useUser();
  console.log(user);
  return (
    <MypageStyled>
      <div></div>
    </MypageStyled>
  );
};

export default MyPage;
