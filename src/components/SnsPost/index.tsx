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
      router.push(`/post/detail/${id}`);
    }
  };
  return (
    <SnsPostStyled $variant={variant}>
      <div className="sns-wrap">
        {data.map((x: any, i: number) => {
          return (
            <div
              className="sns-postBox"
              key={i}
              onClick={() => handleClick(x.id)}
            >
              <div className="sns-imgBox" data-img-count={x.img.length}>
                {x.img.map((src: string, idx: number) => (
                  <div
                    key={idx}
                    className={`sns-imgWrapper ${idx === 0 ? "first" : ""}`}
                  >
                    <Image src={src} alt={`img-${idx}`} fill sizes="100%" />
                  </div>
                ))}
              </div>

              <div className="sns-textBox">
                <div className="sns-title">{x?.title}</div>
                <div className="sns-hashtag">{x?.hashtag}</div>
                <div className="sns-comment">{x?.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SnsPostStyled>
  );
};

export default SnsPost;
