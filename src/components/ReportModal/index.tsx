import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { ReportModalStyled } from "./styled";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";

interface ModalProps {
  ModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  targetId: number;
  targetType: "user" | "comment";
}

const ReportModal = ({
  targetId,
  ModalOpen,
  setModalOpen,
  targetType,
}: ModalProps) => {
  const { user } = useUser();
  const [reportReason, setReportReason] = useState("");

  const report = async () => {
    if (!user?.id) {
      Modal.warning({
        centered: true,
        title: "로그인이 필요합니다.",
        content: "신고를 하려면 먼저 로그인해주세요.",
      });
      return;
    }

    if (!reportReason.trim()) {
      Modal.warning({
        centered: true,
        title: "신고 사유를 입력해주세요.",
      });
      return;
    }

    try {
      const endpoint =
        targetType === "comment"
          ? `/reports/comments/${targetId}`
          : `/reports/users/${targetId}`;

      await api.post(endpoint, {
        reason: reportReason,
      });

      setModalOpen(false);
      setReportReason(""); // 입력 초기화

      Modal.success({
        centered: true,
        title: "신고가 접수되었습니다.",
        content: "운영팀이 확인 후 조치하겠습니다.",
      });
    } catch (err) {
      console.error("신고 오류:", err);
      Modal.error({
        centered: true,
        title: "신고 실패",
        content: "다시 시도해주세요.",
      });
    }
  };

  return (
    <ReportModalStyled $modal={ModalOpen}>
      <div className="report-wrap">
        <div className="report-titleDiv">신고</div>
        <div className="report-inputdiv">
          <Input.TextArea
            placeholder="신고 사유를 입력해주세요"
            rows={5}
            maxLength={300}
            showCount
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
        </div>
        <div className="report-textdiv">
          <div>! 신고 사유를 상세하게 적어주세요. 허위 신고 시에는</div>
          <div>이용 제한이 생길 수 있습니다.</div>
        </div>
        <div className="report-btnDiv">
          <div className="report-canclebtn">
            <Button onClick={() => setModalOpen(false)}>취소</Button>
          </div>
          <div className="report-reportbtn">
            <Button type="primary" onClick={report}>
              신고
            </Button>
          </div>
        </div>
      </div>
    </ReportModalStyled>
  );
};

export default ReportModal;
