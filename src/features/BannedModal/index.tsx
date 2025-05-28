import { Modal } from "antd";

interface BannedModalProps {
  open: boolean;
  reason?: string;
  endDate?: string;
  onConfirm: () => void;
}

const BannedModal = ({
  open,
  reason,
  endDate,
  onConfirm,
}: BannedModalProps) => {
  return (
    <Modal
      open={open}
      onOk={onConfirm}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      title="정지된 계정"
    >
      <p>회원님의 계정은 정지되어 서비스를 이용할 수 없습니다.</p>
      {reason && (
        <p>
          <strong>정지 사유:</strong> {reason}
        </p>
      )}
      {endDate && (
        <p>
          <strong>정지 해제 예정일:</strong>{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>
      )}
    </Modal>
  );
};

export default BannedModal;
