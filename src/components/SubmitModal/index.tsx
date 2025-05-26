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
}

const ShareSubmitModal: React.FC<Props> = ({ tripId, visible, onClose }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { user } = useUser();

  const handleOk = async () => {
    if (!title.trim() || !content.trim()) {
      message.error("제목과 소개글을 입력해주세요.");
      return;
    }

    try {
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

      // 초기화 후 닫기
      setTitle("");
      setContent("");
      setHashtags([]);
      setFileList([]);
      onClose();
    } catch (error) {
      console.error(error);
      message.error("제출 중 오류가 발생했습니다.");
    }
  };

  const beforeUpload = (file: RcFile) => {
    if (fileList.length >= 5) {
      message.error("최대 5개까지 업로드 가능합니다.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const onChangeUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.fileList.length <= 5) {
      setFileList(info.fileList);
    }
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
      >
        {" "}
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
            />

            <h3>소개</h3>
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
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
            />

            <h3>이미지 (최대 5개)</h3>
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
            <div className="daypost-title">이번 여행의 별점을 매겨주세요!</div>
            <div>
              <Rate
                allowHalf
                value={rating}
                onChange={(value) => setRating(value)}
              />
            </div>
          </form>{" "}
        </DaypostStyled>
      </Modal>
    </ModalStyled>
  );
};

export default ShareSubmitModal;
