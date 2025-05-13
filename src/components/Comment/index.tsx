import Image from "next/image";
import { CommentStyled } from "./styled";
import { useState } from "react";
import { vi } from "date-fns/locale";

interface CommentProps {
  data: any;
  setMini: (value: string) => void;
}

const CommentComponent = ({ data, setMini }: any) => {
  const [minicomment, setMinicomment] = useState<boolean>(false);
  return (
    <CommentStyled>
      {data?.comment.map((comment: any, index: number) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <div className="comment-chatMapDiv">
            <Image
              src={comment.profileImg}
              alt="프로필 이미지"
              width={30}
              height={30}
              className="comment-commentimg"
            />
            <div className="comment-chatDiv">{comment.nickname}</div>
            {comment.chat}
            <div className="comment-miniPost">답글 달기</div>
          </div>

          {/* 대댓글이 있는 경우 */}
          {comment.miniComment && comment.miniComment.length > 0 && (
            <div style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
              {minicomment === false ? (
                <div
                  className="comment-minicommentDiv"
                  onClick={() => {
                    setMinicomment(true);
                  }}
                >
                  답글 보기
                </div>
              ) : (
                <div
                  className="comment-minicommentDiv"
                  onClick={() => {
                    setMinicomment(false);
                  }}
                >
                  답글 숨기기
                </div>
              )}
              {minicomment === true ? (
                comment?.miniComment.map((reply: any, i: number) => (
                  <div
                    key={i}
                    onClick={() => {
                      setMini(reply.nickname);
                    }}
                    className="comment-miniMapDiv"
                  >
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
                ))
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      ))}
    </CommentStyled>
  );
};

export default CommentComponent;
