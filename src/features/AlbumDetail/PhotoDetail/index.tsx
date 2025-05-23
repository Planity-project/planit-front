import { useEffect, useState } from "react";
import { PhotoStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import CommentComponent from "@/components/Comment";
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Input, Modal } from "antd";
import { useUser } from "@/context/UserContext";
import Travel from "@/assets/images/travel.jpg";
interface Albumprops {
  modal: boolean;
  setModal: (value: boolean) => void;
  albumId: number;
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

const PhotoDetail = ({ modal, setModal, albumId }: Albumprops) => {
  const user = useUser();
  const router = useRouter();
  const [id, setId] = useState<number>(albumId);
  const [comment, setComment] = useState<string>("");
  const [mini, setMini] = useState<{ nickname: string; id: number } | null>(
    null
  );
  const [data, setData] = useState({
    titleImg: [],
    comment: [],
    userImg: "",
    user: "",
    like: false,
    likeCnt: 0,
    id: 0,
  });
  const [num, setNum] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    api
      .get("/album/photoinfo", {
        params: { albumId: albumId, userId: user?.id },
      })
      .then((res: any) => {
        console.log(res);
        setData(res.data);
      });
  }, [id, num, user, albumId]);

  const heart = (id?: number) => {
    if (!id) {
      return Modal.warning({
        centered: true,
        title: "로그인 후 이용가능합니다.",
      });
    }
    api
      .post("/user/likePost", { userId: id, albumId: albumId })
      .then((res: any) => {
        setNum(num + 1);
      });
  };

  // 댓글 등록 요청 mini가 있으면 대댓글 없으면 댓글
  const commentpost = async (albumId: number) => {
    if (comment.trim().length < 1) {
      return; // 댓글 내용이 없으면 무시
    }

    try {
      await api.post("/comments", {
        userId: user?.id,
        content: comment, // 댓글 본문
        postId: undefined, // 게시글이 아니므로 undefined
        albumImageId: albumId, // 앨범 ID
        parentId: mini?.id || undefined, // 대댓글이면 parentId로 전달
      });

      // 전송 후 초기화 or 알림 등
      setComment("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleBackgroundClick = () => {
    setModal(false); // 바깥 영역 클릭 시 모달 닫기
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않도록
  };

  return (
    <PhotoStyled $modal={modal} onClick={handleBackgroundClick}>
      <div className="photo-wrap" onClick={handleContentClick}>
        <div className="photo-photozone">
          {/* 왼쪽 화살표 (처음일 땐 안 보이게) */}
          {currentIndex > 0 && (
            <LeftOutlined
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(currentIndex - 1);
              }}
              className="arrow-icon"
            />
          )}
          <div
            className="slider-container"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${data?.titleImg?.length * 100}%`,
              height: "100%", // 추가
            }}
          >
            {data?.titleImg?.map((img: any, idx: number) => {
              console.log("이미지 확인:", img.src);
              return (
                <div key={idx} className="slider-item">
                  <img
                    src={img}
                    alt={`image-${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              );
            })}
          </div>
          {/* 오른쪽 화살표 (마지막일 땐 안 보이게) */}
          {currentIndex < data?.titleImg?.length - 1 && (
            <RightOutlined
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(currentIndex + 1);
              }}
              className="arrow-icon-right"
            />
          )}
        </div>
        <div className="photo-commentzone">
          <div className="photo-user">
            <Image
              src={data.userImg}
              className="photo-userimg"
              alt=""
              height={50}
              width={50}
            />

            {data.user}
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {data && Array.isArray(data.comment) && (
              <CommentComponent data={data} setMini={setMini} mini={mini} />
            )}
          </div>
          <div className="comment-bottomDiv">
            <div className="comment-likeDiv">
              <div>
                {data.like === true ? (
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
              <div className="comment-likeCnt">{data.likeCnt}</div>
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
                      setMini(null);
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
                  commentpost(data.id);
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
    </PhotoStyled>
  );
};

export default PhotoDetail;
