import Image from "next/image";
import { CommentStyled } from "./styled";
import { useEffect, useState } from "react";
import { vi } from "date-fns/locale";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useUser } from "@/context/UserContext";
import api from "@/util/api";
interface CommentProps {
  data: any;
  setMini: (value: string) => void;
  mini: string;
}

const CommentComponent = ({ data, setMini, mini }: any) => {
  const user = useUser();

  const [num, setNum] = useState<number>(0);
  const [openReplies, setOpenReplies] = useState<number[]>([]);

  const toggleReply = (id: number) => {
    setOpenReplies((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };
  //댓글 좋아요 요청
  const commentHeart = (id?: number, commentId?: number) => {
    api
      .post("/like/comment", { userId: id, commentId: commentId })
      .then((res) => {
        setNum(num + 1);
      });
  };

  useEffect(() => {}, [num]);
  return (
    <CommentStyled>
      {data?.comment.map((comment: any, index: number) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <div className="comment-chatMapDiv">
            <div style={{ display: "flex" }}>
              <Image
                src={comment.profileImg}
                alt="프로필 이미지"
                width={30}
                height={30}
                className="comment-commentimg"
              />

              <div className="comment-nameDiv">
                <div className="comment-chatDiv">{comment.nickname}</div>
                <div>{comment.chat}</div>
              </div>
            </div>
            <div className="comment-miniPost">
              <div
                onClick={() => {
                  mini === comment.nickname
                    ? setMini("")
                    : setMini(comment.nickname);
                }}
                style={{ cursor: "pointer" }}
              >
                답글 달기
              </div>
              <div>좋아요 {comment.likeCnt}개</div>
            </div>
            {comment.like === true ? (
              <HeartFilled
                onClick={() => {
                  commentHeart(user?.id, comment.id);
                }}
                className="comment-heartIcon"
              />
            ) : (
              <HeartOutlined
                onClick={() => {
                  commentHeart(user?.id, comment.id);
                }}
                className="comment-heartIcon"
              />
            )}
          </div>

          {/* 대댓글이 있는 경우 */}
          {comment.miniComment && comment.miniComment.length > 0 && (
            <div style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
              {openReplies.includes(comment.id) ? (
                <div
                  className="comment-minicommentDiv"
                  onClick={() => toggleReply(comment.id)}
                >
                  답글 숨기기
                </div>
              ) : (
                <div
                  className="comment-minicommentDiv"
                  onClick={() => toggleReply(comment.id)}
                >
                  답글 보기
                </div>
              )}
              {openReplies.includes(comment.id) &&
                comment?.miniComment.map((reply: any, i: number) => (
                  <div key={i} className="comment-miniMapDiv">
                    <Image
                      src={reply.profileImg}
                      alt="대댓글 프로필"
                      width={25}
                      height={25}
                      className="comment-miniimg"
                    />
                    <div className="comment-minichatDiv">{reply.nickname}</div>
                    {reply.chat}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </CommentStyled>
  );
};

export default CommentComponent;
