import { SnsStyled } from "./styled";

const SnsMain = () => {
  const dummy = [
    {
      userid: 1,
      nickName: "순흠",
      title: "여행",
      hashtag: ["#부산", "#광안리"],
      img: ["/uploads/busan.png", "/uploads/beach.png"],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 2,
      nickName: "순흠2",
      title: "여행1",
      hashtag: ["#부산", "#광안리"],
      img: ["/uploads/busan.png", "/uploads/beach.png"],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 3,
      nickName: "순흠3",
      title: "여행2",
      hashtag: ["#부산", "#광안리"],
      img: ["/uploads/busan.png", "/uploads/beach.png"],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 4,
      nickName: "순흠4",
      title: "여행3",
      hashtag: ["#부산", "#광안리"],
      img: ["/uploads/busan.png", "/uploads/beach.png"],
      date: "2박 3일",
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
  ];

  return (
    <SnsStyled>
      <div>
        <div>img</div>
        <div>
          <div>title</div>
          <div>hashtag</div>
        </div>
      </div>
    </SnsStyled>
  );
};

export default SnsMain;
