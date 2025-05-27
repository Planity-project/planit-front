import { useEffect, useState } from "react";
import Image from "next/image";
import { AddStyled } from "./styled";
import api from "@/util/api";

interface BannerType {
  id: number;
  image_path: string;
  title?: string;
}

const AddBanner = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    api
      .get("/banner")
      .then((res: any) => {
        setBanners(res.data);
        // 초기 배너는 0번
        setCurrentBannerIndex(0);
      })
      .catch((err: any) => {
        console.error("배너 불러오기 실패", err);
      });
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      // 랜덤 인덱스 생성
      const randomIndex = Math.floor(Math.random() * banners.length);
      setCurrentBannerIndex(randomIndex);
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) return null;

  const banner = banners[currentBannerIndex];
  const imageUrl = banner.image_path.startsWith("http")
    ? banner.image_path
    : `http://localhost:5001${banner.image_path}`;

  return (
    <AddStyled>
      <Image
        key={banner.id}
        src={imageUrl}
        alt={banner.title || "배너 이미지"}
        width={300}
        height={150}
        className="Banner"
      />
    </AddStyled>
  );
};

export default AddBanner;
