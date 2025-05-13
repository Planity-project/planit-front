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
  const [mini, setMini] = useState<string>("");
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    // api.get("/album/photoinfo", { params: { albumId: albumId } }).then((res) => {
    //   console.log(res.data);
    // });
  }, [id, num]);

  const heart = (id?: number) => {
    if (!id) {
      return Modal.warning({
        centered: true,
        title: "로그인 후 이용가능합니다.",
      });
    }
    api.post("/user/likePost", { userId: id, albumId: albumId }).then((res) => {
      setNum(num + 1);
    });
  };
  // 댓글 등록 요청 mini가 있으면 대댓글 없으면 댓글
  const commentpost = (albumId: number) => {
    if (comment.length < 1) {
      return;
    }
    if (mini === "") {
      api.post("/album/commentPost", {
        albumId: albumId,
        userId: user?.id,
      });
    } else {
      api.post("/album/commentPost", {
        albumId: albumId,
        userId: user?.id,
        mini: mini,
      });
    }
  };
  const handleBackgroundClick = () => {
    setModal(false); // 바깥 영역 클릭 시 모달 닫기
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않도록
  };

  const dummy: {
    titleImg: string;
    comment: any;
    likeCnt: number;
    user: string;
    userImg: string;
    like: boolean;
    id: number;
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

  return (
    <PhotoStyled $modal={modal} onClick={handleBackgroundClick}>
      <div
        onClick={(e) => {
          handleContentClick(e);
          setId(id + 1);
        }}
      >
        <LeftOutlined className="arrow-icon" />
      </div>
      <div className="photo-wrap" onClick={handleContentClick}>
        <div className="photo-photozone">
          <Image
            className="photo-image"
            src={dummy.titleImg}
            alt=""
            width={100}
            height={300}
          />
        </div>
        <div className="photo-commentzone">
          <div className="photo-user">
            <Image
              src={dummy.userImg}
              className="photo-userimg"
              alt=""
              height={50}
              width={50}
            />

            {dummy.user}
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <CommentComponent data={dummy} setMini={setMini} mini={mini} />
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
      <div
        onClick={(e) => {
          handleContentClick(e);
          setId(id + 1);
        }}
      >
        <RightOutlined className="arrow-icon" />
      </div>
    </PhotoStyled>
  );
};

export default PhotoDetail;
