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
  postId: number;
  userId: number;
}

const SubmitModal = ({ postId, userId }: SubmitModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const showModal = () => setIsModalOpen(true);
  const user = useUser();

  const handleOk = async () => {
    if (!title.trim() || !content.trim()) {
      message.error("제목과 소개글을 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("hashtags", JSON.stringify(hashtags)); // 배열을 문자열로 전송
      formData.append("tripId", String(1));
      formData.append("userId", String(user?.id));
      formData.append("rating", String(rating));

      // fileList 중 서버에 업로드할 파일만 append (originFileObj가 실제 파일 객체)
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      const res = await api.post("/posts/create", formData);

      message.success("성공적으로 제출되었습니다!");
      setIsModalOpen(false);
      // 필요 시 초기화
      setTitle("");
      setContent("");
      setHashtags([]);
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

  const hashtagChange = (value: string[]) => {
    const newTags: any = value.map((tag) =>
      tag.startsWith("#") ? tag : `#${tag}`
    );
    setHashtags(newTags);
  };

  return (
    <ModalStyled>
      <Button type="primary" onClick={showModal}>
        모달 열기
      </Button>
      <Modal
        title="이 일정을 다른 사람들과 공유해보세요"
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
            <div className="daypost-title">제목</div>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />

            <div className="daypost-title">소개</div>
            <Input.TextArea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="소개글을 입력하세요"
              rows={4}
              required
            />

            <div className="daypost-title">#</div>
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
            <div className="daypost-title">이번 여행의 별점을 매겨주세요!</div>
            <div>
              <Rate
                allowHalf
                value={rating}
                onChange={(value) => setRating(value)}
              />
            </div>
          </form>
        </DaypostStyled>
      </Modal>
    </ModalStyled>
  );
};

export default SubmitModal;
