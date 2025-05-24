import { Button, Input, message, Modal, Upload } from "antd";
import { AlbumTitleStyled } from "./styled";
import { useEffect, useState } from "react";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";
import { UploadOutlined } from "@ant-design/icons";
const AlbumTitle = ({ setModal }: any) => {
  const [albumName, setAlbumName] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { user } = useUser();
  useEffect(() => {
    const updateShortUrl = () => {
      setShortUrl(shortenUrl(inviteUrl));
    };

    updateShortUrl();
    window.addEventListener("resize", updateShortUrl);
    return () => window.removeEventListener("resize", updateShortUrl);
  }, [inviteUrl]);
  const handleCreateLink = () => {
    if (albumName.length < 2) {
      return Modal.warning({
        centered: true,
        title: "2글자 이상 입력해주세요",
      });
    }
    const encodedName = encodeURIComponent(albumName);
    const randomNum = Math.floor(100 + Math.random() * 900); // 100 ~ 999
    const url = `${window.location.origin}/invite?name=${encodedName}${randomNum}${user?.id}`;
    setInviteUrl(url);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      message.success("링크가 클립보드에 복사되었습니다");
    } catch (err) {
      message.error("복사 실패");
    }
  };
  const getMaxLength = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 28; // 데스크탑
    if (width >= 768) return 25; // 태블릿
    return 15; // 모바일
  };
  const shortenUrl = (url: string) => {
    const maxLength = getMaxLength();
    if (url.length <= maxLength) return url;
    return "..." + url.slice(url.length - maxLength);
  };
  const uploadProps = {
    beforeUpload: (file: File) => {
      setThumbnail(file);
      return false; // 자동 업로드 방지
    },
    onRemove: () => {
      setThumbnail(null);
    },
    fileList: thumbnail ? [thumbnail as any] : [],
    maxCount: 1,
    accept: "image/*",
  };
  // 앨범 생성 요청 userid title 담아서 보냄
  const create = async () => {
    if (!user?.id) {
      return Modal.warning({ centered: true, title: "로그인이 필요합니다." });
    }

    if (albumName.length < 2) {
      return Modal.warning({
        centered: true,
        title: "2글자 이상 입력해주세요",
      });
    }

    if (inviteUrl.length < 10) {
      return Modal.warning({
        centered: true,
        title: "초대링크를 생성해주세요.",
      });
    }

    if (!thumbnail) {
      return Modal.warning({
        centered: true,
        title: "대표 이미지를 업로드해주세요.",
      });
    }

    const formData = new FormData();
    formData.append("userId", String(user.id));
    formData.append("title", albumName);
    formData.append("url", inviteUrl);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await api.post("/album/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.result === true) {
        Modal.success({
          centered: true,
          title: "앨범이 생성되었습니다.",
          onOk: () => window.location.reload(),
        });
      } else {
        Modal.error({
          centered: true,
          title: "앨범 생성에 실패했습니다.",
          content: "다시 시도해주세요.",
        });
      }
    } catch (err) {
      Modal.error({
        centered: true,
        title: "서버 오류",
        content: "서버와의 연결에 실패했습니다.",
      });
    }
  };
  return (
    <AlbumTitleStyled>
      <div className="AlbumTitle-title">추억앨범의 이름을 정하세요</div>
      <div className="AlbumTitle-titleBox">
        <div className="AlbumTitle-inputDiv">
          <Input
            type="text"
            placeholder="추억앨범의 이름을 입력해주세요"
            onChange={(e) => setAlbumName(e.target.value)}
          />
        </div>
        <div className="AlbumTitle-btnDiv">
          <Button onClick={handleCreateLink}>초대링크 생성</Button>
        </div>
      </div>
      <div className="AlbumTitle-upload">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>대표 이미지 업로드</Button>
        </Upload>
      </div>
      <div className="AlbumTitle-inviteDiv">
        {inviteUrl && (
          <>
            <span className="AlbumTitle-url">{shortenUrl(inviteUrl)}</span>
            <Button onClick={handleCopy}>복사</Button>
          </>
        )}
      </div>
      <div className="AlbumTitle-createbtn">
        <Button onClick={create}>앨범 만들기</Button>
      </div>
    </AlbumTitleStyled>
  );
};

export default AlbumTitle;
