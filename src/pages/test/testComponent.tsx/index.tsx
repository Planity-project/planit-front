import { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";

interface props {}

const ShareSubmitModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("확인 클릭");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("취소 클릭");
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        모달 열기
      </Button>
      <Modal
        title="이 일정을 다른 사람과 공유해보세요"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <h3>title</h3>
          <Input type="text" name="title" />
          <h3>content</h3>
          <Input type="text" name="content" />
          <h3>hashtag</h3>
          <Input type="text" name="hashtag" />
          <br />
          <Input type="file" name="files" />
          <Button>완료</Button>
        </form>
      </Modal>
    </>
  );
};

export default ShareSubmitModal;
