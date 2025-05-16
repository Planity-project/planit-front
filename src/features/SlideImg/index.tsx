import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SlideStyled } from "./styled";
import Image from "next/image";
import { useState } from "react";

interface SlideProps {
  imgModal: boolean;
  setImgModal: (value: boolean) => void;
  imglist: string[];
}

const SlideComponent = ({ imgModal, setImgModal, imglist }: SlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBackgroundClick = () => {
    setImgModal(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imglist.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imglist.length - 1 : prev - 1));
  };

  return (
    <SlideStyled $imgModal={imgModal} onClick={handleBackgroundClick}>
      <div className="photo-wrap">
        <div
          className="arrow left"
          onClick={(e) => {
            handleContentClick(e);
            handlePrev();
          }}
        >
          <LeftOutlined />
        </div>
        <div className="image-viewport" onClick={handleContentClick}>
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imglist.map((src, i) => (
              <div className="slide" key={i}>
                <Image
                  src={src}
                  alt={`img-${i}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="arrow right"
          onClick={(e) => {
            handleContentClick(e);
            handleNext();
          }}
        >
          <RightOutlined />
        </div>
      </div>
    </SlideStyled>
  );
};

export default SlideComponent;
