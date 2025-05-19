import { AddStyled } from "./styled";
import Banner from "@/assets/images/banner1.png";
import Image from "next/image";
const AddBanner = () => {
  return (
    <AddStyled>
      <Image src={Banner} alt="" width={100} height={100} className="Banner" />
    </AddStyled>
  );
};

export default AddBanner;
