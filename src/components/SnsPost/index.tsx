import { SnsPostStyled } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";

interface snspostprops {
  data: any;
  variant?: "default" | "album";
}

const SnsPost = ({ data, variant }: snspostprops) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    if (variant === "album") {
      router.push(`/album/detail/${id}`);
    } else {
      router.push(`/snsmainpage/detail/${id}`);
    }
  };

  return (
    <SnsPostStyled $variant={variant}>
      <div className="sns-wrap">
        {data?.map((x: any, i: number) => {
          const imgList =
            x?.img && x.img.length > 0
              ? x.img
              : [x.titleImg ?? "/defaultImage.png"];
          return (
            <div
              className="sns-postBox"
              key={i}
              onClick={() => handleClick(x.id)}
            >
              <div className="sns-imgBox" data-img-count={imgList.length}>
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
                <div className="sns-comment">{x?.comment ?? ""}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SnsPostStyled>
  );
};

export default SnsPost;
