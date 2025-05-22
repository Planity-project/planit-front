import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { ReportModalStyled } from "./styled";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";
interface ModalProps {
  ModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  type: string;
  userId: number;
}

const ReportModal = ({ userId, ModalOpen, setModalOpen, type }: ModalProps) => {
  const user = useUser();
  const [reportReason, setReportReason] = useState("");
  const reportresult = () => {
    api.post("/reports/요청명 바꿔야돼 ㅎㅎㅎ", {
      target: userId,
      reports: reportReason,
      userId: user?.id,
    });
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
          <div>
            ! 신고 사유를 상세하게 적어주세요. 신고 사유 확인 후 허위 신고
            시에는
          </div>
          <div>이용에 제한이 생길 수 있습니다</div>
        </div>
        <div className="report-btnDiv">
          <div className="report-canclebtn">
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              취소
            </Button>
          </div>
          <div className="report-reportbtn">
            <Button
              onClick={() => {
                reportresult;
              }}
            >
              신고
            </Button>
          </div>
        </div>
      </div>
    </ReportModalStyled>
  );
};

export default ReportModal;
