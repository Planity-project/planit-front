import AddBanner from "@/components/AddBanner";
import { MyfavStyled } from "./styled";
import { useEffect, useState } from "react";
import api from "@/util/api";
import { useRouter } from "next/router";
interface infoprops {
  user: any;
}

const MyFav = ({ user }: infoprops) => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    api
      .get("/posts/likePosts", { params: { userId: user.id } })
      .then((res: any) => {
        console.log(res.data, "posts/likePosts");
        setData(res.data);
      });
  }, []);
  return (
    <MyfavStyled>
      <div className="myfav-wrap">
        <div className="chat-box">
          <div className="myfav-title">📌 관심 일정</div>
          {data.length < 1 ? (
            <div
              className={`chat-bubble left`}
              onClick={() => {
                router.push(`/snsmainpage`);
              }}
            >
              아직 관심있는 일정이 없어요!<div> 한번 추가 해보실까요?</div>
            </div>
          ) : (
            data.map((item, idx) => (
              <div
                onClick={() => {
                  router.push(`/snsmainpage/snsdetail/${item.postId}`);
                }}
                key={idx}
                className={`chat-bubble left`}
              >
                <div className="bubble-content">{item.title}</div>
                <div className="chat-date">{item.nickname}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </MyfavStyled>
  );
};

export default MyFav;
