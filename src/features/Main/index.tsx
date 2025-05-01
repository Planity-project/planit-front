import { MainStyled } from "./styled";
import { Button } from "antd";
import { useRouter } from "next/router";
const MainPage = () => {
  const router = useRouter();
  return (
    <MainStyled className="main-wrap">
      <div className="main-container">
        <div>
          <div className="main-titleBox">
            <div className="main-title">추억 저장만 하면 뭐해 </div>
            <div className="main-title">공유가 국룰이지</div>
          </div>
          <div className="main-btnBox">
            <Button
              onClick={() => {
                router.push("/datechoicepage");
              }}
            >
              시작하기
            </Button>
            <Button
              onClick={() => {
                router.push("snsmainpage");
              }}
            >
              살펴보기
            </Button>
          </div>
        </div>
        <div className="main-gifBox">GIF</div>
      </div>
    </MainStyled>
  );
};

export default MainPage;
