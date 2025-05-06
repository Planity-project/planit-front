import { LodingStyled } from "./styled";
import Image from "next/image";
import LodingGif from "@/assets/images/lodinggif.gif";
const Loding = () => {
  return (
    <LodingStyled>
      <div className="loding-wrap">
        <Image className="loding-img" src={LodingGif} alt="로딩 중" />
      </div>
    </LodingStyled>
  );
};
export default Loding;
