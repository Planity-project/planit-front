import { LodingStyled } from "./styled";
import Image from "next/image";
import LodingGif from "@/assets/images/Lodinggif1.gif";
import DayLoding from "@/assets/images/dayloding.gif";

interface LodingProps {
  state?: string;
}

const Loding = ({ state }: LodingProps) => {
  return (
    <LodingStyled>
      <div className="loding-wrap">
        <Image
          className="loding-img"
          src={state === "day" ? DayLoding : LodingGif}
          alt="로딩 중"
        />
      </div>
    </LodingStyled>
  );
};
export default Loding;
