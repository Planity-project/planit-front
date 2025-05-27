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
          const imgList = Array.isArray(x.img) ? x.img : [];
          const titleImg =
            x.titleImg !== null ? x.titleImg : "/defaultImage.png";

          const imagesToRender =
            variant === "album"
              ? [titleImg]
              : imgList.length
              ? imgList
              : ["/defaultImage.png"];

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
                        e.stopPropagation();
                        setList(
                          imgList.length ? imgList : ["/defaultImage.png"]
                        );
                        setImgModal(true);
                      }
                }
                className="sns-imgBox"
                data-img-count={imagesToRender.length}
              >
                {imagesToRender.map((src: string, idx: number) => (
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
                ))}
              </div>

              <div className="sns-textBox">
                <div className="sns-title">{x?.title}</div>
                {x.hashtag && x.hashtag.length > 0 ? (
                  <div className="sns-hashtag">{x.hashtag.join(" ")}</div>
                ) : null}
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
