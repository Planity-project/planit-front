import AddBanner from "@/components/AddBanner";
import { MyfavStyled } from "./styled";

interface infoprops {
  user: any;
}

const MyFav = ({ user }: infoprops) => {
  const dummy = [
    { userid: 2, postid: 2, title: "재미진 여수 여행", nickname: "진순흠" },
    { userid: 5, postid: 3, title: "재미진 부산 여행", nickname: "순흠" },
    { userid: 2, postid: 4, title: "또 가고 싶은 제주도", nickname: "진순흠" },
  ];

  return (
    <MyfavStyled>
      <div className="myfav-wrap">
        <div className="chat-box">
          <div className="myfav-title">📌 관심 일정</div>
          {dummy.map((item, idx) => (
            <div key={idx} className={`chat-bubble left`}>
              <div className="bubble-content">{item.title}</div>
              <div className="chat-date">{item.nickname}</div>
            </div>
          ))}
        </div>
      
      </div>
    </MyfavStyled>
  );
};

export default MyFav;
