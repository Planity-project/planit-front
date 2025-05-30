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
import { handlePayment } from "@/util/payment";

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
  const [num, setNum] = useState(0);

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
  const { user } = useUser();
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
      if (user?.id !== undefined) {
        formData.append("userId", user.id.toString());
      }
      const res = await api
        .post("/album/update/title", formData)
        .then((res) => {
          Modal.warning({
            title: "대표이미지가 변경되었습니다.",
          });
          setNum(num + 1);
        });
    } catch (err) {
      console.error("업로드 실패:", err);
    }
  };
  const movePhoto = (id: number) => {
    setModal(true);
    setAlbumId(id);
  };
  const delAlbum = () => {
    api.delete("/album/delAlbum", { params: { albumId: id } }).then((res) => {
      window.location.href = "/album";
    });
  };
  // 앨범 정보 요청
  useEffect(() => {
    if (!id) return;
    api
      .get("/album/detailData", {
        params: { albumId: id },
      })
      .then((res: any) => {
        setArr(res.data);
        setGroupImg(res.data.titleImg);
        settitleChange(res.data.title);
      });
  }, [id, num]);

  useEffect(() => {
    if (!user) return;
    const userInfo = arr.group.find((member: any) => member.userId === user.id);
    if (userInfo) {
      setUserrole(userInfo.role);
    }
  }, [arr, user]);
  //title 변경 요청
  const changetitle = () => {
    api
      .post("/album/update/title", {
        userId: user?.id,
        albumId: id,
        title: titleChange,
      })
      .then((res: any) => {
        Modal.warning({
          title: "앨범 이름이 변경되었습니다.",
        });
        setNum(num + 1);
      });
  };
  const ownerChange = (targetId) => {
    api
      .get("album/delegation", {
        params: { userId: user.id, albumId: id, targetId },
      })
      .then((res) => {
        setNum(num + 1);
      });
  };
  const exitUser = (targetId) => {
    api
      .get("/album/destroy", { params: { userId: targetId, albumId: id } })
      .then((res) => {
        Modal.warning({
          title: "강퇴되었습니다.",
          okText: "예",
          cancelText: "아니요",
        });
        setNum(num + 1);
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
  const albumexit = () => {
    api
      .post("/album/exitalbum", { albumId: id, userId: user.id })
      .then((res) => {
        router.push("/album");
      });
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
        <Button
          onClick={() => {
            if (!arr.state) {
              if (arr.image.length < 3) {
                setUploadModalOpen(true);
              } else {
                Modal.confirm({
                  title: "이미지 추가 업로드를 위한 결제를 하시겠습니까?",
                  content: "9,900원 결제 시 무제한 업로드가 가능합니다.",
                  okText: "예",
                  cancelText: "아니오",
                  onOk: async () => {
                    const result = await handlePayment(id, user);
                    if (result) {
                      Modal.success({
                        title: "결제 성공",
                        content: "이미지 업로드 제한이 해제되었습니다.",
                      });
                    } else {
                      Modal.error({
                        title: "결제 실패",
                        content: "결제에 실패했습니다. 다시 시도해 주세요.",
                      });
                    }
                  },
                });
              }
            } else {
              setUploadModalOpen(true);
            }
          }}
        >
          사진 업로드
        </Button>
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
                src={x.img} // ✅ 바르게 접근
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
                src={`${arr.titleImg}`}
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
            <div>
              <div className="group-creditstate">
                {!arr.state ? "무료 체험판 사용중" : "프리미엄 앨범 사용중"}
              </div>
            </div>
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
                  {x.role === "OWNER" ? <CrownFilled /> : <UserOutlined />}
                </div>
                {x.userId === user?.id ? (
                  <div className="ellipsis-menu-trigger"></div>
                ) : (
                  <div
                    onClick={() => toggleMenu(i)}
                    className="ellipsis-menu-trigger"
                  >
                    <EllipsisOutlined />
                  </div>
                )}

                {openMenuIndex === i && (
                  <div ref={menuRef} className="member-popup-menu">
                    {userrole === "OWNER" ? (
                      <>
                        <div
                          onClick={() => {
                            Modal.confirm({
                              title: "해당 유저를 강퇴하시겠습니까?",
                              onOk: () => {
                                exitUser(x.userId);
                              },
                              cancelText: "아니요",
                              okText: "네",
                            });
                          }}
                          className="menu-item"
                        >
                          강퇴
                        </div>
                        <div
                          onClick={() => {
                            Modal.confirm({
                              title: "그룹장 권한을 위임하시겠습니까?",
                              onOk: () => {
                                ownerChange(x.userId);
                              },
                              cancelText: "아니요",
                              okText: "네",
                            });
                          }}
                          className="menu-item"
                        >
                          그룹장 위임
                        </div>
                        <div
                          onClick={() => {
                            setModalOpen(true);
                            setUserId(x.userId);
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
                          setUserId(x.userId);
                        }}
                      >
                        신고
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {userrole === "OWNER" ? (
              <div
                className="menu-delalbum"
                onClick={() => {
                  Modal.confirm({
                    title: "해당 앨범을 삭제하시겠습니까?",
                    okText: "예",
                    cancelText: "아니오",
                    onOk: () => {
                      delAlbum();
                    },
                  });
                }}
              >
                방 삭제하기
              </div>
            ) : (
              <div
                className="menu-delalbum"
                onClick={() => {
                  Modal.confirm({
                    title: "해당 앨범에서 나가시겠습니까?",
                    okText: "예",
                    cancelText: "아니오",
                    onOk: () => {
                      albumexit();
                    },
                  });
                }}
              >
                방 나가기
              </div>
            )}
          </div>
        </div>
      )}
      <ReportModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        targetType="user"
        targetId={userId}
      />

      {modal && albumId !== 0 && (
        <PhotoDetail
          modal={modal}
          setModal={setModal}
          albumId={albumId}
          userrole={userrole}
        />
      )}
      {uploadModalOpen && (
        <AlbumImageSubmitModal
          albumId={parseInt(id)}
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
        />
      )}
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
