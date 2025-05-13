import { useEffect, useState } from "react";
import { AlbumDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import { CommentOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PhotoDetail from "./PhotoDetail";
interface arr {
  comment: [];
  group: [];
  image: [];
}

const AlbumDetail = () => {
  const [arr, setArr] = useState<arr>();
  const [viewMode, setViewMode] = useState<"grid" | "slide">("grid");
  const [modal, setModal] = useState<boolean>(false);
  const [albumId, setAlbumId] = useState<number>(0);
  const router = useRouter();
  const { id } = router.query;

  const dummyData = [
    { id: 1, img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
    { id: 2, img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
    { id: 3, img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
  ];

  const movePhoto = (id: number) => {
    setModal(true);
    setAlbumId(id);
  };

  useEffect(() => {
    api
      .get("/album/detailData", {
        params: { AlbumId: id },
      })
      .then((res) => {
        console.log(res.data);
        setArr(res.data);
      });
  }, []);

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

      <div className="AlbumDetail-photoWrap">
        {dummyData.map((x, i) => (
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
      <div>
        <PhotoDetail modal={modal} setModal={setModal} albumId={albumId} />
      </div>
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
