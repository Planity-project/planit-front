import AddBanner from "@/components/AddBanner";
import { MyfavStyled } from "./styled";

interface infoprops {
  user: any;
}

const MyFav = ({ user }: infoprops) => {
  const dummy = [
    { userid: 2, postid: 2, title: "재미진 여수 여행", nickname: "진순흠" },
    { userid: 5, postid: 3, title: "재미진 부산 여행", nickname: "순흠" },
  ];

  return (
    <MyfavStyled>
      <div className="myfav-wrap">
        <div className="myfav-title">📌 관심 일정</div>
        <div className="myfav-bubbleDiv">
          {dummy.map((item, idx) => (
            <div key={idx} className="chat-bubble left">
              <div>{item.title}</div>
              <div className="chat-date">{item.nickname}</div>
            </div>
          ))}
        </div>
        <div className="AddBanner">
          <AddBanner />
        </div>
      </div>
    </MyfavStyled>
  );
};

export default MyFav;
