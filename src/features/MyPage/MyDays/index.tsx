import { useEffect, useState } from "react";
import { MyinfoDaysStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
interface infoprops {
  user: any;
}

const Myinfodays = ({ user }: infoprops) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("posts/myPosts", { params: { userId: user.id } })
      .then((res: any) => {
        setData(res.data);
      });
  }, [user]);
  const router = useRouter();
  const today = new Date();

  const upcoming = data
    ?.filter((item: any) => new Date(item.endDate) >= today)
    .sort(
      (a: any, b: any) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );

  const past = data
    .filter((item: any) => new Date(item.endDate) < today)
    .sort(
      (a: any, b: any) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
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
