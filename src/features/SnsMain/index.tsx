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
  const dummy = [
    {
      id: 1,
      userid: 1,
      nickName: "순흠",
      title: "여행",
      hashtag: "#부산",
      img: [Busan, Busan],
    },
    {
      id: 2,
      userid: 2,
      nickName: "순흠2",
      title: "여행1",
      hashtag: "#부산",
      img: [expample, expample, expample],
    },
    {
      id: 3,
      userid: 3,
      nickName: "순흠3",
      title: "여행2",
      hashtag: "#부산",
      img: [Busan, expample, expample],
    },
    {
      id: 4,
      userid: 4,
      nickName: "순흠4",
      title: "여행3",
      hashtag: "#부산",
      img: [expample, expample, expample, expample, expample],
    },
  ];

  return <SnsPost data={data} />;
};

export default SnsMain;
