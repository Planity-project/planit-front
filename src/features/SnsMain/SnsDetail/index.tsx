import { useEffect } from "react";
import { SnsDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import { useState } from "react";
import CommentComponent from "@/components/Comment";
import {
  HeartFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import MyDaysComponent from "@/components/MyDays";
import { Input, Modal } from "antd";
import { useUser } from "@/context/UserContext";
interface ImageSliderProps {
  images: string[];
}
interface MiniComment {
  userId: number;
  profileImg: string;
  nickname: string;
  chat: string;
}
interface CommentType {
  id: number;
  userId: number;
  profileImg: string;
  nickname: string;
  chat: string;
  likeCnt?: number;
  like: boolean;
  miniComment?: MiniComment[];
}

const SnsDetail = () => {
  const [mini, setMini] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [num, setNum] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  //sns 디테일 페이지 이동 시 데이터 요청 , 게시글 모든 데이터 필요(잘 정리해서 줄것: 맘에 안들면 다시 )
  useEffect(() => {
    api
      .get("/posts/detailData", {
        params: { postId: id },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  const dummy1: {
    id: number;
    titleImg: any;
    user: string;
    userImg: string;
    like: boolean;
    comment: CommentType[];
    likeCnt: number;
  } = {
    id: 1,
    titleImg: "/defaultImage.png",
    // 글 올린 사람
    user: "진순흠",
    userImg: "/defaultImage.png",
    // 로그인 한 사람이 앨범에 좋아요 상태
    like: true,
    comment: [
      {
        id: 1,
        userId: 1,
        profileImg: "/defaultImage.png",
        nickname: "진순흠",
        chat: "ㅋㅋㅋ",
        likeCnt: 2,
        // 댓글 좋아요 상태
        like: true,
        miniComment: [
          {
            userId: 3,
            profileImg: "/defaultImage.png",
            nickname: "진순흠",
            chat: "ㅋㅋㅋㅇㅈ",
          },
        ],
      },
      {
        id: 3,
        userId: 2,
        profileImg: "/defaultImage.png",
        nickname: "진순흠2",
        chat: "ㅋㅋㅋ",
        likeCnt: 2,
        like: true,
      },
      {
        id: 2,
        userId: 3,
        profileImg: "/defaultImage.png",
        nickname: "진순흠3",
        chat: "ㅋㅋㅋ",
        likeCnt: 2,
        like: false,
      },
    ],
    likeCnt: 12,
  };
  const dummy = {
    id: 2,
    createdAt: "2025-05-14T07:44:44.413Z",
    startDate: "2025-05-15",
    endDate: "2025-05-16",
    title: "여수",
    postTitle: "여수 여행기",
    comment: "아주 재밌는 여행이였습니다",
    like: true,
    likeCnt: 12,
    image: [
      "/defaultImage.png",
      "/defaultImage.png",
      "/defaultImage.png",
      "/defaultImage.png",
      "/defaultImage.png",
    ],
    day1: [
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "식당",
        image: "/defaultImage.png",
        startTime: "11:30:00",
        endTime: "13:30:00",
      },
      {
        id: 2,
        todayOrder: 2,
        name: "남경전복",
        category: "명소",
        image: "/defaultImage.png",
        startTime: "13:30:00",
        endTime: "15:30:00",
      },
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "카페",
        image: "/defaultImage.png",
        startTime: "15:30:00",
        endTime: "17:30:00",
      },
    ],
    day2: [
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "식당",
        image: "/defaultImage.png",
        startTime: "11:30:00",
        endTime: "13:30:00",
      },
      {
        id: 2,
        todayOrder: 2,
        name: "남경전복",
        category: "명소",
        image: "/defaultImage.png",
        startTime: "13:30:00",
        endTime: "15:30:00",
      },
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "카페",
        image: "/defaultImage.png",
        startTime: "15:30:00",
        endTime: "17:30:00",
      },
    ],
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않도록
  };
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev < dummy.image.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const commentpost = async (albumId: number) => {
    if (comment.trim().length < 1) {
      return; // 댓글 내용이 없으면 무시
    }

    try {
      await api.post("/album/commentPost", {
        userId: user?.id,
        content: comment, // 댓글 본문
        postId: undefined, // 게시글이 아니므로 undefined
        albumId: albumId, // 앨범 ID
        parentId: mini || undefined, // 대댓글이면 parentId로 전달
      });

      // 전송 후 초기화 or 알림 등
      setComment(""); // 입력창 비우기 등
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const heart = (id?: number) => {
    if (!id) {
      return Modal.warning({
        centered: true,
        title: "로그인 후 이용가능합니다.",
      });
    }
    api.post("/user/likePost", { userId: user?.id, postId: id }).then((res) => {
      setNum(num + 1);
    });
  };

  function formatSchedule(data: any): { date: string; plan: any[] }[] {
    const schedule: { date: string; plan: any[] }[] = [];
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const dayCount =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      const dateStr = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd
      const dayKey = `day${i + 1}`;

      if (data[dayKey]) {
        schedule.push({
          date: dateStr,
          plan: data[dayKey],
        });
      }
    }

    return schedule;
  }

  const schedule = formatSchedule(dummy);

  return (
    <SnsDetailStyled>
      <div className="snspost-wrap">
        <div className="snspost-topcontainer">
          <div className="snspost-topwrap">
            <div
              className="snspost-slider"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {dummy.image.map((x: string, i: number) => (
                <div className="snspost-imageDiv" key={i}>
                  <Image
                    className="snspost-img"
                    src={x}
                    alt={`image-${i}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            {/* 왼쪽 버튼: 첫 이미지일 땐 숨김 */}
            {currentIndex > 0 && (
              <div className="slide-button left" onClick={prevImage}>
                <LeftOutlined />
              </div>
            )}

            {/* 오른쪽 버튼: 마지막 이미지일 땐 숨김 */}
            {currentIndex < dummy.image.length - 1 && (
              <div className="slide-button right" onClick={nextImage}>
                <RightOutlined />
              </div>
            )}
          </div>
          <div className="snspost-comment">
            <div className="snspost-titleDiv">
              <div className="snspost-title">{dummy.postTitle}</div>
              <div className="snspost-location">#{dummy.title} </div>
              <div className="snspost-review">{dummy.comment} </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <CommentComponent data={dummy1} setMini={setMini} mini={mini} />
            </div>
            <div className="comment-bottomDiv">
              <div className="comment-likeDiv">
                <div>
                  {dummy.like === true ? (
                    <HeartFilled
                      onClick={() => {
                        heart(user?.id);
                      }}
                      className="comment-likeIcon"
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => {
                        heart(user?.id);
                      }}
                      className="comment-likeIcon"
                    />
                  )}
                </div>
                <div className="comment-likeCnt">{dummy.likeCnt}</div>
              </div>
              <div className="comment-inputDiv">
                <Input
                  type="text"
                  value={mini ? `@${mini} ${comment}` : comment}
                  placeholder="댓글을 작성하세요"
                  onChange={(e) => {
                    // mini가 존재할 때, @mini 를 유지하고 그 이후 값만 comment로 저장
                    if (mini) {
                      const prefix = `@${mini} `;
                      const value = e.target.value;

                      // 만약 유저가 prefix를 지웠다면 mini 초기화
                      if (!value.startsWith(prefix)) {
                        setMini("");
                        setComment(value);
                      } else {
                        setComment(value.slice(prefix.length));
                      }
                    } else {
                      setComment(e.target.value);
                    }
                  }}
                />
                <div
                  onClick={() => {
                    commentpost(dummy.id);
                  }}
                  style={{
                    color: comment.length < 1 ? "lightgray" : "black",
                    cursor: "pointer",
                    marginBottom: "3px",
                  }}
                >
                  게시
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="snspost-bottomcontainer">
        <div className="snspost-mydaysbar">
          <div>일정</div>
          <MyDaysComponent schedule={schedule} />
        </div>
        <div className="snspost-mydayright">
          <div>googlemap</div>
          <div>상세정보창</div>
        </div>
      </div>
    </SnsDetailStyled>
  );
};

export default SnsDetail;
