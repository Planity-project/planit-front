import { Button, Input, message, Modal } from "antd";
import { AlbumTitleStyled } from "./styled";
import { useEffect, useState } from "react";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";
const AlbumTitle = ({ setModal }: any) => {
  const [albumName, setAlbumName] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const user = useUser();
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
    const url = `${window.location.origin}/invite?name=${encodedName}${randomNum}`;
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
    if (width >= 1024) return 30; // 데스크탑
    if (width >= 768) return 25; // 태블릿
    return 15; // 모바일
  };
  const shortenUrl = (url: string) => {
    const maxLength = getMaxLength();
    if (url.length <= maxLength) return url;
    return "..." + url.slice(url.length - maxLength);
  };
  // 앨범 생성 요청 userid title 담아서 보냄
  const create = () => {
    if (albumName.length < 2) {
      return Modal.warning({
        centered: true,
        title: "2글자 이상 입력해주세요",
      });
    }
    api
      .post("/album/바꿔", { userId: user?.id, title: albumName })
      .then((res) => {
        console.log(res.data);
      });
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
