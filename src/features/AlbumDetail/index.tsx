import { useEffect, useRef, useState } from "react";
import { AlbumDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import {
  CameraOutlined,
  CommentOutlined,
  CrownFilled,
  EllipsisOutlined,
  HeartFilled,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PhotoDetail from "./PhotoDetail";
import { useUser } from "@/context/UserContext";
import ReportModal from "@/components/ReportModal";
import AlbumImageSubmitModal from "./AlbumImageSubmit";

const AlbumDetail = () => {
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [arr, setArr] = useState<any>({
    link: [],
    title: "",
    titleImg: "/defaultImage.png",
    group: [],
    image: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "slide">("grid");
  const [modal, setModal] = useState<boolean>(false);
  const [albumId, setAlbumId] = useState<number>(0);
  const [userrole, setUserrole] = useState<string>("owner");
  const [imgId, setImgId] = useState<number>(0);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [userId, setUserId] = useState<number>(0);
  const [titleChange, settitleChange] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [groupImg, setGroupImg] = useState<string>("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

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
  const user: any = useUser();
  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  const router = useRouter();
  const { id }: any = router.query;

  //대표 이미지 변경 요청
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("albumId", id);
      formData.append("userId", user?.id);
      const res = await api
        .post("/album/update/title", formData)
        .then((res: any) => {
          console.log(res.data);
          // 저장 성공 시 새로 고침
        });
    } catch (err) {
      console.error("업로드 실패:", err);
      message.error("이미지 변경 실패");
    }
  };
  const movePhoto = (id: number) => {
    console.log(modal);
    setModal(true);
    setAlbumId(id);
  };
  // 앨범 정보 요청
  useEffect(() => {
    if (!id) return;
    console.log(id, "요청보냄 IDIDID");

    api
      .get("/album/detailData", {
        params: { albumId: id },
      })
      .then((res: any) => {
        console.log(res.data.title);
        setArr(res.data);
        setGroupImg(arr.titleImg);
        settitleChange(arr.title);
        console.log(res.data.title);
      });
  }, [id]);

  //title 변경 요청
  const changetitle = () => {
    api
      .post("/album/update/title", {
        userId: user?.id,
        albumId: id,
        title: titleChange,
      })
      .then((res: any) => {
        console.log(res.data);
      });
  };

  const getMaxLength = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 20; // 데스크탑
    if (width >= 768) return 15; // 태블릿
    return 10; // 모바일
  };
  const shortenUrl = (url: string) => {
    const maxLength = getMaxLength();
    if (url.length <= maxLength) return url;
    return url.slice(url.length - maxLength) + "...";
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arr.link[0]);
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
        <Button onClick={() => setUploadModalOpen(true)}>사진 업로드</Button>
      </div>

      {viewMode === "grid" ? (
        <div className="AlbumDetail-photoWrap">
          {arr.image.map((x: any, i: number) => (
            <div
              key={i}
              onClick={() => movePhoto(x.id)}
              className="AlbumDetail-photoBox"
            >
              <Image
                className="AlbumDetail-img"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${x.img}`} // ✅ 바르게 접근
                alt="photo"
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
          <div className="group-changecontainer">
            <div className="group-imgdiv">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${groupImg}`}
                alt="그룹 타이틀 이미지"
                width={200}
                height={200}
                className="group-img"
              />
              <div
                className="profile-overlay"
                onClick={() => fileInputRef.current?.click()}
              >
                <CameraOutlined style={{ fontSize: "28px", color: "white" }} />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="group-inputdiv">
              <Input
                type="text"
                value={titleChange}
                onChange={(e) => {
                  settitleChange(e.target.value);
                }}
              />
              <div className="group-inputbtn">
                <Button onClick={changetitle}>변경</Button>
              </div>
            </div>
          </div>
          <div className="group-membercontainer">
            <div className="group-member-url">
              <div className="group-member-linkDiv">
                <span className="group-member-text">초대링크</span>
                <span className="AlbumTitle-url">
                  {shortenUrl(arr.link[0])}
                </span>
              </div>
              <div className="group-member-copybtn">
                <Button onClick={handleCopy}>복사</Button>
              </div>
            </div>
            {arr.group.map((x: any, i: number) => (
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

                <div className={`group-member${x.role}`}>
                  {x.role === "owner" ? <CrownFilled /> : <UserOutlined />}
                </div>

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
                        <div
                          onClick={() => {
                            setModalOpen(true);
                            setUserId(x.id);
                          }}
                          className="menu-item"
                        >
                          신고
                        </div>
                      </>
                    ) : (
                      <div
                        className="menu-item"
                        onClick={() => {
                          setModalOpen(true);
                          setUserId(x.id);
                        }}
                      >
                        신고
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <ReportModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        targetType="user"
        targetId={userId}
      />

      <PhotoDetail modal={modal} setModal={setModal} albumId={albumId} />
      {uploadModalOpen && (
        <AlbumImageSubmitModal
          albumId={parseInt(id)} // router에서 받은 앨범 ID
          onClose={() => setUploadModalOpen(false)} // 모달 닫기용 콜백
        />
      )}
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
