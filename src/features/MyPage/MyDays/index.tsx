import { useEffect } from "react";
import { MyinfoDaysStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
interface infoprops {
  user: any;
}

const Myinfodays = ({ user }: infoprops) => {
  const dummy = [
    { userid: 1, postId: 2, title: "재미진 여수 여행", endDate: "2025-05-30" },
    { userid: 1, postId: 3, title: "재미진 부산 여행", endDate: "2025-05-03" },
    { userid: 1, postId: 4, title: "재미진 제주 여행", endDate: "2025-06-01" },
    { userid: 1, postId: 5, title: "재미진 서울 여행", endDate: "2025-05-01" },
  ];
  useEffect(() => {
    // api
    //   .get("posts/알아서 해줘요", { params: { userId: user.id } })
    //   .then((res: any) => {
    //     console.log(res.data);
    //   });
  }, []);
  const router = useRouter();
  const today = new Date();

  const upcoming = dummy
    .filter((item) => new Date(item.endDate) >= today)
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );

  const past = dummy
    .filter((item) => new Date(item.endDate) < today)
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );

  // 번갈아 출력용 배열
  const maxLength = Math.max(upcoming.length, past.length);
  const combined = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < upcoming.length) {
      combined.push({ ...upcoming[i], type: "upcoming" });
    }
    if (i < past.length) {
      combined.push({ ...past[i], type: "past" });
    }
  }

  return (
    <MyinfoDaysStyled>
      <div className="chat-box">
        <div className="chat-titleBox">
          <div className="chat-title">📅 다가올 내 일정</div>
          <div>{user.nickname}</div>
          <div className="chat-title">📌 공유한 내 일정</div>
        </div>

        {combined.map((item, idx) => (
          <div
            onClick={() => {
              router.push(`/snsmainpage/snsdetail/${item.postId}`);
            }}
            key={idx}
            className={`chat-row ${
              item.type === "upcoming" ? "left" : "right"
            }`}
          >
            <div className="chat-bubble">
              <div>{item.title}</div>
              <div className="chat-date">{item.endDate}</div>
            </div>
          </div>
        ))}
      </div>
    </MyinfoDaysStyled>
  );
};

export default Myinfodays;
