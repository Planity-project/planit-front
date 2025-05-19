import { SnsStyled } from "./styled";
import Busan from "@/assets/images/busan.jpeg";
import expample from "@/assets/images/travel.jpg";
import Image from "next/image";
import SnsPost from "@/components/SnsPost";
import { useEffect, useState } from "react";
import api from "@/util/api";
const SnsMain = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    api.get("/posts/list").then((res: any) => {
      console.log(res.data); // 여기서 dummy 형식에 맞게 매핑 가능
      setData(res.data);
    });
  }, []);

  return <SnsPost data={data} />;
};

export default SnsMain;
