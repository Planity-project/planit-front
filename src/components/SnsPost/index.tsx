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
  console.log(data);
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
          const imgList = Array.isArray(x.img) ? x.img : [];
          console.log(imgList, "이미지 확인용");
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
                        setList(
                          imgList.length ? imgList : ["/defaultImage.png"]
                        ); // 빈 배열이면 기본이미지로 대체
                        setImgModal(true); // 모달 열기
                      }
                }
                className="sns-imgBox"
                data-img-count={imgList.length || 1} // 기본이미지 1장이라 1로 처리
              >
                {(imgList.length ? imgList : ["/defaultImage.png"]).map(
                  (src: string, idx: number) => (
                    <div
                      key={idx}
                      className={`sns-imgWrapper ${idx === 0 ? "first" : ""}`}
                    >
                      <img
                        src={src}
                        className="sns-img"
                        alt={`img-${idx}`}
                        sizes="100%"
                      />
                    </div>
                  )
                )}
              </div>

              <div className="sns-textBox">
                <div className="sns-title">{x?.title}</div>
                {x.hastag ? (
                  <div className="sns-hashtag">{x?.hashtag ?? ""}</div>
                ) : (
                  <></>
                )}
                {x.content ? (
                  <div className="sns-content">{x?.content ?? ""}</div>
                ) : (
                  <></>
                )}
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
