import AddBanner from "@/components/AddBanner";
import { MyfavStyled } from "./styled";
import { useEffect } from "react";
import api from "@/util/api";
import { useRouter } from "next/router";
interface infoprops {
  user: any;
}

const MyFav = ({ user }: infoprops) => {
  const dummy = [
    { userid: 2, postId: 2, title: "재미진 여수 여행", nickname: "진순흠" },
    { userid: 5, postId: 3, title: "재미진 부산 여행", nickname: "순흠" },
    { userid: 2, postId: 4, title: "또 가고 싶은 제주도", nickname: "진순흠" },
  ];
  const router = useRouter();
  useEffect(() => {
    api
      .get("/posts/likePosts", { params: { userId: user.id } })
      .then((res: any) => {
        console.log(res.data, "posts/likePosts");
      });
  }, []);
  return (
    <MyfavStyled>
      <div className="myfav-wrap">
        <div className="chat-box">
          <div className="myfav-title">📌 관심 일정</div>
          {dummy.map((item, idx) => (
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
          ))}
        </div>
      </div>
    </MyfavStyled>
  );
};

export default MyFav;
