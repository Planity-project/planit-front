import { Modal } from "antd";

interface AddPlaceProps {
  visible: boolean;
  onClose: () => void;
}

const AddPlace = ({ visible, onClose }: AddPlaceProps) => {
  return (
    <Modal open={visible} onCancel={onClose} onOk={onClose} title="장소 등록">
      <p>여기에 등록 폼 넣기</p>
    </Modal>
  );
};

export default AddPlace;
