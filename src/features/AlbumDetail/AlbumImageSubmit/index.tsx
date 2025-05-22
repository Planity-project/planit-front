import React, { useState } from "react";
import { Modal, Button, Input, Upload, message, Select, Rate } from "antd";
import type {
  UploadFile,
  RcFile,
  UploadChangeParam,
} from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";
import { DaypostStyled, ModalStyled } from "./styled";

interface SubmitModalProps {
  albumId: number;
  onClose: () => void;
}

const AlbumImageSubmitModal = ({ albumId, onClose }: SubmitModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const showModal = () => setIsModalOpen(true);
  const user = useUser();

  const handleOk = async () => {
    try {
      const formData = new FormData();

      formData.append("userId", String(user?.id));
      formData.append("albumId", String(albumId));

      // fileList 중 서버에 업로드할 파일만 append (originFileObj가 실제 파일 객체)
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      const res = await api.post("/album/submitImage", formData);

      message.success("성공적으로 제출되었습니다!");
      setIsModalOpen(false);
      // 필요 시 초기화

      setFileList([]);
    } catch (error) {
      console.error(error);
      message.error("제출 중 오류가 발생했습니다.");
    }
  };
  const handleCancel = () => setIsModalOpen(false);

  // 업로드 전 파일 검사 (최대 5개 제한)
  const beforeUpload = (file: RcFile) => {
    if (fileList.length >= 5) {
      message.error("최대 5개까지 업로드 가능합니다.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  // 업로드 시 파일 리스트 변경 처리
  const onChangeUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.fileList.length <= 5) {
      setFileList(info.fileList);
    }
  };

  return (
    <ModalStyled>
      <Button type="primary" onClick={showModal}>
        모달 열기
      </Button>
      <Modal
        title="앨범을 등록해주세요"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="완료"
        cancelText="취소"
      >
        <DaypostStyled>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOk();
            }}
          >
            <div className="daypost-title">이미지 (최대 5개)</div>
            <Upload
              multiple
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={onChangeUpload}
              onRemove={(file) => {
                setFileList(fileList.filter((item) => item.uid !== file.uid));
              }}
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div>업로드</div>
                </div>
              )}
            </Upload>
          </form>
        </DaypostStyled>
      </Modal>
    </ModalStyled>
  );
};

export default AlbumImageSubmitModal;
