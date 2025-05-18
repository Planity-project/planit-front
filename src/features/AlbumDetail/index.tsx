import { useEffect, useRef, useState } from "react";
import { AlbumDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import {
  CommentOutlined,
  EllipsisOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, message } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PhotoDetail from "./PhotoDetail";
import { useUser } from "@/context/UserContext";

const AlbumDetail = () => {
  const [arr, setArr] = useState();
  const [viewMode, setViewMode] = useState<"grid" | "slide">("grid");
  const [modal, setModal] = useState<boolean>(false);
  const [albumId, setAlbumId] = useState<number>(0);
  const [userrole, setUserrole] = useState<string>("member");
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const user = useUser();
  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  const router = useRouter();
  const { id } = router.query;

  const groupdummy = {
    link: ["dasdasdadasd.dsadasdasd"], // 문자열 배열
    group: [
      {
        id: 1,
        userId: 1,
        img: "/defaultImage.png",
        nickname: "진순흠",
        role: "owner",
      },
      {
        id: 2,
        userId: 3,
        img: "/defaultImage.png",
        nickname: "진순",
        role: "user",
      },
      {
        id: 3,
        userId: 2,
        img: "/defaultImage.png",
        nickname: "진",
        role: "user",
      },
    ],
    image: [
      { id: 1, img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
      { id: 2, img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
      { id: 3, img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
    ],
  };

  const movePhoto = (id: number) => {
    console.log(modal);
    setModal(true);
    setAlbumId(id);
  };
  // 앨범 정보 요청
  useEffect(() => {
    api
      .get("/album/detailData", {
        params: { AlbumId: id },
      })
      .then((res: any) => {
        console.log(res.data);
        setArr(res.data);
      });
  }, []);
  // 해당 앨범에 대한 유저의 권한 요청
  useEffect(() => {
    api
      .get("/album//userrole", { params: { userId: user?.id, AlbumId: id } })
      .then((res: any) => {
        setUserrole(res.data);
        console.log(res.data);
      });
  }, []);
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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(groupdummy.link[0]);
      message.success("링크가 클립보드에 복사되었습니다");
    } catch (err) {
      message.error("복사 실패");
    }
  };
  return (
    <AlbumDetailStyled>
      <div className="view-toggle">
        <Button
          onClick={() => setViewMode("grid")}
          type={viewMode === "grid" ? "primary" : "default"}
        >
          사진 앨범
        </Button>
        <Button
          onClick={() => setViewMode("slide")}
          type={viewMode === "slide" ? "primary" : "default"}
        >
          그룹 멤버
        </Button>
      </div>

      {viewMode === "grid" ? (
        <div className="AlbumDetail-photoWrap">
          {groupdummy.image.map((x, i) => (
            <div
              key={i}
              onClick={() => movePhoto(x.id)}
              className="AlbumDetail-photoBox"
            >
              <Image
                className="AlbumDetail-img"
                src={x.img}
                alt={`photo`}
                width={200}
                height={200}
              />
              <div className="AlbumDetail-overlay">
                <div className="count-box">
                  <div className="icon-text">
                    <HeartFilled />
                    <span>{x.likeCnt}</span>
                  </div>
                  <div className="icon-text">
                    <CommentOutlined />
                    <span>{x.commentCnt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="group-member-wrap">
          <div className="group-member-url">
            <span className="group-member-text">초대링크</span>
            <span className="AlbumTitle-url">
              {shortenUrl(groupdummy.link[0])}
            </span>
            <div className="group-member-copybtn">
              <Button onClick={handleCopy}>복사</Button>
            </div>
          </div>
          {groupdummy.group.map((x, i) => (
            <div key={i} className="group-member-item">
              <div className="group-member-proflie">
                <Image
                  className="group-member-img"
                  src={x.img}
                  alt=""
                  width={25}
                  height={25}
                />
                <div className="group-member-nickname">{x.nickname}</div>
              </div>

              <div>{x.role === "owner" ? "그룹장" : "멤버"}</div>

              <div
                onClick={() => toggleMenu(i)}
                className="ellipsis-menu-trigger"
              >
                <EllipsisOutlined />
              </div>

              {openMenuIndex === i && (
                <div ref={menuRef} className="member-popup-menu">
                  {userrole === "owner" ? (
                    <>
                      <div className="menu-item">강퇴</div>
                      <div className="menu-item">그룹장 위임</div>
                      <div className="menu-item">신고</div>
                    </>
                  ) : (
                    <div className="menu-item">신고</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <PhotoDetail modal={modal} setModal={setModal} albumId={albumId} />
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
