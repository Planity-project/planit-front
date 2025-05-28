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

  const leftItems = data
    .filter((item: any) => item.state === false)
    .map((item) => ({ ...item, type: "left" }));

  const rightItems = data
    .filter((item: any) => item.state === true)
    .map((item) => ({ ...item, type: "right" }));

  // 번갈아 출력용 배열
  const maxLength = Math.max(leftItems.length, rightItems.length);
  const combined = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < leftItems.length) {
      combined.push(leftItems[i]);
    }
    if (i < rightItems.length) {
      combined.push(rightItems[i]);
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
            className={`chat-row ${item.type}`}
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
