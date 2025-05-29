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
    if (currentIndex < imglist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SlideStyled $imgModal={imgModal} onClick={handleBackgroundClick}>
      <div className="photo-wrap">
        {currentIndex !== 0 && (
          <div
            className="arrow left"
            onClick={(e) => {
              handleContentClick(e);
              handlePrev();
            }}
          >
            <LeftOutlined />
          </div>
        )}
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
        {currentIndex !== imglist.length - 1 && (
          <div
            className="arrow right"
            onClick={(e) => {
              handleContentClick(e);
              handleNext();
            }}
          >
            <RightOutlined />
          </div>
        )}
      </div>
    </SlideStyled>
  );
};

export default SlideComponent;
