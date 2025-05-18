import { SnsPostStyled } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SnsDetail from "@/features/SnsMain/SnsDetail";
import SlideComponent from "@/features/SlideImg";
interface snspostprops {
  data: any;
  variant?: "default" | "album";
}

const SnsPost = ({ data, variant }: snspostprops) => {
  const [modal, setModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const [id, setId] = useState(0);
  const router = useRouter();

  const handleClick = (id: number) => {
    if (variant === "album") {
      router.push(`/album/detail/${id}`);
    } else {
      router.push(`/snsmainpage/snsdetail/${id}`);
    }
  };

  return (
    <SnsPostStyled $variant={variant}>
      <div className="sns-wrap">
        {data?.map((x: any, i: number) => {
          const imgList =
            x?.img && x.img.length > 0
              ? typeof x.img[0] === "string"
                ? x.img[0].split(",") // 문자열을 배열로 변환
                : x.img
              : [x.titleImg ?? "/defaultImage.png"];

          return (
            <div
              className="sns-postBox"
              key={i}
              onClick={() => handleClick(x.id)}
            >
              <div
                onClick={
                  variant === "album"
                    ? undefined
                    : (e) => {
                        e.stopPropagation(); // 상위 div 클릭 방지
                        setList(imgList); // 이미지 리스트 설정
                        setImgModal(true); // 모달 열기
                      }
                }
                className="sns-imgBox"
                data-img-count={imgList.length}
              >
                {imgList.map((src: string, idx: number) => (
                  <div
                    key={idx}
                    className={`sns-imgWrapper ${idx === 0 ? "first" : ""}`}
                  >
                    <Image
                      src={src ?? "/defaultImage.png"}
                      alt={`img-${idx}`}
                      fill
                      sizes="100%"
                    />
                  </div>
                ))}
              </div>

              <div className="sns-textBox">
                <div className="sns-title">{x?.title}</div>
                <div className="sns-hashtag">{x?.hashtag ?? ""}</div>
              </div>
            </div>
          );
        })}
      </div>
      <SlideComponent
        imgModal={imgModal}
        setImgModal={setImgModal}
        imglist={list}
      />
    </SnsPostStyled>
  );
};

export default SnsPost;
