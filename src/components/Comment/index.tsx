import Image from "next/image";
import { CommentStyled } from "./styled";
import { useEffect, useState } from "react";
import {
  HeartFilled,
  HeartOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useUser } from "@/context/UserContext";
import ReportModal from "@/components/ReportModal";
import api from "@/util/api";
import { Modal } from "antd";

interface CommentProps {
  data: any;
  setMini: (value: { nickname: string; id: number } | null) => void;
  mini: { nickname: string; id: number } | null;
}

const CommentComponent = ({ data, setMini, mini }: CommentProps) => {
  const user = useUser();

  const [num, setNum] = useState<number>(0);
  const [openReplies, setOpenReplies] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetId, setReportTargetId] = useState<number | null>(null);

  const toggleReply = (id: number) => {
    setOpenReplies((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const commentHeart = async (commentId?: number) => {
    if (!user?.id) return;
    try {
      await api.post(`/likes/comment/${commentId}/toggle`);
      setNum((prev) => prev + 1);
    } catch (err) {
      console.error("좋아요 처리 중 오류:", err);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!user?.id) return;

    try {
      await api.delete(`/comments/${commentId}`);
      setNum((prev) => prev + 1);

      Modal.success({
        centered: true,
        title: "댓글이 삭제되었습니다.",
      });
    } catch (err) {
      console.error("댓글 삭제 오류:", err);

      Modal.error({
        centered: true,
        title: "댓글 삭제에 실패했습니다.",
        content: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  const openReportModal = (commentId: number) => {
    setReportTargetId(commentId);
    setReportModalOpen(true);
  };

  useEffect(() => {}, [num]);

  return (
    <>
      <CommentStyled>
        {data?.comment?.map((comment: any, index: number) => (
          <div
            key={index}
            style={{ marginBottom: "5px", position: "relative" }}
          >
            <div className="comment-chatMapDiv">
              <div className="comment-header">
                <div className="comment-left">
                  <Image
                    src={comment.profileImg}
                    alt="프로필 이미지"
                    width={30}
                    height={30}
                    className="comment-commentimg"
                  />
                  <div className="comment-namechat">
                    <div className="comment-chatDiv">{comment.nickname}</div>
                    <div>{comment.chat}</div>
                  </div>
                </div>

                <div className="comment-right">
                  <div
                    onClick={() =>
                      setOpenMenuId((prev) =>
                        prev === comment.id ? null : comment.id
                      )
                    }
                    className="ellipsis-menu-trigger"
                  >
                    <EllipsisOutlined />
                    {openMenuId === comment.id && (
                      <div className="comment-menu">
                        <div
                          className="comment-textdiv"
                          onClick={() => deleteComment(comment.id)}
                          style={{ cursor: "pointer" }}
                        >
                          삭제
                        </div>
                        <div
                          className="comment-textdiv"
                          onClick={() => openReportModal(comment.id)}
                          style={{ cursor: "pointer" }}
                        >
                          신고
                        </div>
                      </div>
                    )}
                  </div>
                  {comment.like === true ? (
                    <HeartFilled
                      onClick={() => commentHeart(comment.id)}
                      className="comment-heartIcon"
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => commentHeart(comment.id)}
                      className="comment-heartIcon"
                    />
                  )}
                </div>
              </div>

              <div className="comment-miniPost">
                <div
                  onClick={() => {
                    if (mini?.id === comment.id) {
                      setMini(null);
                    } else {
                      setMini({ nickname: comment.nickname, id: comment.id });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  답글 달기
                </div>
                <div>좋아요 {comment.likeCnt}개</div>
              </div>
            </div>

            {/* 대댓글 */}
            {comment.miniComment && comment.miniComment.length > 0 && (
              <div style={{ marginLeft: "2rem" }}>
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
                      <div className="comment-minichatDiv">
                        {reply.nickname}
                      </div>
                      {reply.chat}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </CommentStyled>

      {/* 신고 모달 */}
      {reportTargetId !== null && (
        <ReportModal
          ModalOpen={reportModalOpen}
          setModalOpen={setReportModalOpen}
          targetType="comment"
          targetId={reportTargetId}
        />
      )}
    </>
  );
};

export default CommentComponent;
