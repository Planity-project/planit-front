import { useEffect, useState } from "react";
import { PhotoStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import CommentComponent from "@/components/Comment";
import {
  CommentOutlined,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

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
  userId: number;
  profileImg: string;
  nickname: string;
  chat: string;
  miniComment?: MiniComment[];
}

const PhotoDetail = ({ modal, setModal, albumId }: Albumprops) => {
  const router = useRouter();
  const [id, setId] = useState<number>(albumId);
  const [mini, setMini] = useState<string>("");

  useEffect(() => {
    // api.get("/album/photoinfo", { params: { albumId: albumId } }).then((res) => {
    //   console.log(res.data);
    // });
  }, [id]);

  const handleBackgroundClick = () => {
    setModal(false); // 바깥 영역 클릭 시 모달 닫기
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않도록
  };

  const dummy: {
    titleImg: string;
    comment: CommentType[];
    likeCnt: number;
    user: string;
    userImg: string;
  } = {
    titleImg: "/defaultImage.png",
    user: "진순흠",
    userImg: "/defaultImage.png",
    comment: [
      {
        userId: 1,
        profileImg: "/defaultImage.png",
        nickname: "진순흠",
        chat: "ㅋㅋㅋ",
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
        userId: 2,
        profileImg: "/defaultImage.png",
        nickname: "진순흠2",
        chat: "ㅋㅋㅋ",
      },
      {
        userId: 3,
        profileImg: "/defaultImage.png",
        nickname: "진순흠3",
        chat: "ㅋㅋㅋ",
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
            <CommentComponent data={dummy} setMini={setMini} />
          </div>
          <div className="comment-bottomDiv">
            <div className="comment-likeDiv">
              <div>
                <HeartOutlined className="comment-likeIcon" />
              </div>
              <div className="comment-likeCnt">{dummy.likeCnt}</div>
            </div>
            <div className="comment-inputDiv">
              <Input type="text" placeholder="댓글을 작성하세요" />
              <div>게시</div>
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
