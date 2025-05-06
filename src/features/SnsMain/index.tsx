import { SnsStyled } from "./styled";
import Busan from "@/assets/images/busan.jpeg";
import Image from "next/image";
const SnsMain = () => {
  const dummy = [
    {
      userid: 1,
      nickName: "순흠",
      title: "여행",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 2,
      nickName: "순흠2",
      title: "여행1",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 3,
      nickName: "순흠3",
      title: "여행2",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 4,
      nickName: "순흠4",
      title: "여행3",
      hashtag: ["#부산", "#광안리"],
      img: [Busan, Busan, Busan, Busan, Busan],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
  ];

  return (
    <SnsStyled>
      <div className="sns-wrap">
        {dummy.map((x: any, i: number) => {
          return (
            <div className="sns-postBox" key={i}>
              <div className="sns-imgBox" data-img-count={x.img.length}>
                {x.img.map((src: string, idx: number) => (
                  <div
                    key={idx}
                    className={`sns-imgWrapper ${idx === 0 ? "first" : ""}`}
                  >
                    <Image src={src} alt={`img-${idx}`} fill sizes="100%" />
                  </div>
                ))}
              </div>

              <div className="sns-textBox">
                <div className="sns-title">{x.title}</div>
                <div className="sns-hashtag">{x.hashtag}</div>
                <div className="sns-comment">{x.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SnsStyled>
  );
};

export default SnsMain;
