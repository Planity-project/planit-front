import { SnsStyled } from "./styled";
import Busan from "@/assets/images/busan.jpeg";
import Image from "next/image";
import SnsPost from "@/components/SnsPost";
const SnsMain = () => {
  const dummy = [
    {
      id: 1,
      userid: 1,
      nickName: "순흠",
      title: "여행",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      id: 2,
      userid: 2,
      nickName: "순흠2",
      title: "여행1",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      id: 3,
      userid: 3,
      nickName: "순흠3",
      title: "여행2",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      id: 4,
      userid: 4,
      nickName: "순흠4",
      title: "여행3",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan, Busan, Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
  ];

  return <SnsPost data={dummy} />;
};

export default SnsMain;
