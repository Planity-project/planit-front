import { MainStyled } from "./styled";
import { Button } from "antd";
import { useRouter } from "next/router";
import MainGif from "@/assets/images/planitmaingif.gif";
import Image from "next/image";
const MainPage = () => {
  const router = useRouter();
  return (
    <MainStyled className="main-wrap">
      <div className="main-container">
        <div>
          <div className="main-titleBox">
            <div className="main-title">추억 저장만 하면 뭐해 </div>
            <div className="main-title2">공유가 국룰이지</div>
          </div>
          <div className="main-btnBox">
            <Button
              onClick={() => {
                router.push("/datecreatepage");
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
        <div className="main-gifBox">
          <Image
            src={MainGif}
            alt=""
            className="main-gif"
            width={200}
            height={200}
          />
        </div>
      </div>
    </MainStyled>
  );
};

export default MainPage;
