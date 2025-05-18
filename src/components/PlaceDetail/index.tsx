import { Modal } from "antd";

interface PlaceDetailProps {
  visible: boolean;
  onClose: () => void;
}

const PlaceDetail = ({ visible, onClose }: PlaceDetailProps) => {
  return (
    <Modal open={visible} onCancel={onClose} onOk={onClose} title="상세 페이지">
      <p>여기에 등록 폼 넣기</p>
    </Modal>
  );
};

export default PlaceDetail;
