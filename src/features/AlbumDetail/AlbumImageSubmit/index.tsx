import React, { useState } from "react";
import { Modal, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";
import { DaypostStyled, ModalStyled } from "./styled";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface SubmitModalProps {
  albumId?: number;
  isOpen: boolean;
  onClose: () => void;
}

const AlbumImageSubmitModal = ({
  albumId,
  isOpen,
  onClose,
}: SubmitModalProps) => {
  const { user } = useUser();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false); // ✅ 업로드 중 여부 상태 추가

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleOk = async () => {
    try {
      setLoading(true); // ✅ 시작 시 로딩 활성화
      const formData = new FormData();
      formData.append("userId", String(user?.id));
      formData.append("albumId", String(albumId));

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      await api.post("/album/submitImage", formData);
      Modal.warning({
        title: "이미지가 업로드 되었습니다.",
        onOk: () => window.location.reload(),
      });

      setFileList([]);
    } catch (error) {
      console.error(error);
      message.error("제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // ✅ 완료 시 로딩 비활성화
    }
  };

  const beforeUpload = async (file: RcFile) => {
    if (fileList.length >= 5) {
      message.error("최대 5개까지 업로드 가능합니다.");
      return Upload.LIST_IGNORE;
    }

    const preview = await getBase64(file);

    const newFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: "done",
      url: preview,
      originFileObj: file,
    };

    setFileList((prev) => [...prev, newFile]);
    return Upload.LIST_IGNORE;
  };

  const handleCancel = () => setPreviewVisible(false);

  return (
    <ModalStyled>
      <Modal
        title="앨범을 등록해주세요"
        open={isOpen}
        onOk={handleOk}
        onCancel={onClose}
        okText="완료"
        cancelText="취소"
        confirmLoading={loading} // ✅ 버튼 로딩 상태 적용
        okButtonProps={{ disabled: loading }} // ✅ 업로드 중 비활성화
        cancelButtonProps={{ disabled: loading }} // ✅ 취소도 비활성화
      >
        <DaypostStyled>
          <div className="daypost-title">이미지 (최대 5개)</div>
          <div className="daypost-commentdiv">
            ! 무료 체험판 사용 시 업로드 횟수는 3회로 제한됩니다,
          </div>
          <div className="daypost-commentdiv">
            이미지 업로드 시 방장 외에는 삭제가 불가합니다
          </div>

          <Upload
            multiple
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onRemove={(file) => {
              setFileList((prev) =>
                prev.filter((item) => item.uid !== file.uid)
              );
            }}
            disabled={loading} // ✅ 업로드 중 비활성화
          >
            {fileList.length >= 5 || loading ? null : (
              <div>
                <PlusOutlined />
                <div>업로드</div>
              </div>
            )}
          </Upload>

          <Modal
            open={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </DaypostStyled>
      </Modal>
    </ModalStyled>
  );
};

export default AlbumImageSubmitModal;
