import { useEffect } from "react";
import { MyinfoDaysStyled } from "./styled";
import api from "@/util/api";

interface infoprops {
  user: any;
}

const Myinfodays = ({ user }: infoprops) => {
  const dummy = [
    { userid: 1, tripid: 2, title: "재미진 여수 여행", endDate: "2025-05-30" },
    { userid: 1, tripid: 3, title: "재미진 부산 여행", endDate: "2025-05-03" },
  ];

  const today = new Date();

  const upcoming = dummy.filter((item) => new Date(item.endDate) >= today);
  const past = dummy.filter((item) => new Date(item.endDate) < today);

  return (
    <MyinfoDaysStyled>
      <div className="chat-section">
        <div className="chat-bubbleDiv">
          <div className="chat-width100">
            <div className="chat-title">📅 다가올 내 일정</div>
            {upcoming.map((item, idx) => (
              <div key={idx} className="chat-bubble left">
                <div>{item.title}</div>
                <div className="chat-date">{item.endDate}</div>
              </div>
            ))}
          </div>
          <div className="chat-width100">
            <div className="chat-title">📌 공유한 내 일정</div>
            {past.map((item, idx) => (
              <div key={idx} className="chat-bubble right">
                <div>{item.title}</div>
                <div className="chat-date">{item.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyinfoDaysStyled>
  );
};

export default Myinfodays;
