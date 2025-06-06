import React, { useState } from "react";
import { Modal, Button, Input, Upload, message, Select, Rate } from "antd";
import type {
  UploadFile,
  RcFile,
  UploadChangeParam,
} from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import api from "@/util/api";
import { DaypostStyled, ModalStyled } from "./styled";
import { useUser } from "@/context/UserContext";

interface Props {
  tripId: number;
  visible: boolean;
  onClose: () => void;
  onUpdatedTrip: () => void;
}

const ShareSubmitModal: React.FC<Props> = ({
  tripId,
  visible,
  onClose,
  onUpdatedTrip,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // ✅ 로딩 상태
  const { user } = useUser();

  const handleOk = async () => {
    if (!title.trim() || !content.trim()) {
      message.error("제목과 소개글을 입력해주세요.");
      return;
    }

    try {
      setLoading(true); // ✅ 업로드 시작 시 비활성화
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("hashtags", JSON.stringify(hashtags));
      formData.append("tripId", String(tripId));
      formData.append("userId", String(user?.id));
      formData.append("rating", String(rating));

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      await api.post("/posts/create", formData);
      message.success("성공적으로 제출되었습니다!");

      // 초기화
      setTitle("");
      setContent("");
      setHashtags([]);
      setFileList([]);
      onClose();
      onUpdatedTrip();
    } catch (error) {
      console.error(error);
      message.error("제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // ✅ 업로드 종료 후 복원
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

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src && file.originFileObj) {
      src = await getBase64(file.originFileObj as RcFile);
    }
    const image = new Image();
    image.src = src!;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const hashtagChange = (value: string[]) => {
    const newTags = value.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
    setHashtags(newTags);
  };

  return (
    <ModalStyled>
      <Modal
        title="이 일정을 다른 사람들과 공유해보세요"
        open={visible}
        onOk={handleOk}
        onCancel={onClose}
        okText="완료"
        confirmLoading={loading} // ✅ 버튼 로딩 처리
        okButtonProps={{ disabled: loading }} // ✅ 완료 버튼 비활성화
        cancelButtonProps={{ disabled: loading }} // ✅ 취소 버튼 비활성화
      >
        <DaypostStyled>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOk();
            }}
          >
            <h3>제목</h3>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />

            <h3>소개</h3>
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              disabled={loading}
            />

            <h3>hashtag</h3>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="#재미난 여행  #레알 ㅋㅋ #진짜 ㅋㅋ"
              onChange={hashtagChange}
              value={hashtags}
              tokenSeparators={[" ", ","]}
              allowClear
              notFoundContent={null}
              disabled={loading} // ✅ 비활성화
            />

            <h3>이미지 (최대 5개)</h3>
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

            <div className="daypost-title">이번 여행의 별점을 매겨주세요!</div>
            <div>
              <Rate
                allowHalf
                value={rating}
                onChange={(value) => setRating(value)}
                disabled={loading} // ✅ 별점도 비활성화
              />
            </div>
          </form>
        </DaypostStyled>
      </Modal>
    </ModalStyled>
  );
};

export default ShareSubmitModal;
