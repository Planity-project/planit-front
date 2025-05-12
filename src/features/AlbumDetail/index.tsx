import { useEffect, useState } from "react";
import { AlbumDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import { CommentOutlined, HeartFilled } from "@ant-design/icons";
interface arr {
  comment: [];
  group: [];
  image: [];
}
const AlbumDetail = () => {
  const [arr, setArr] = useState<arr>();
  const router = useRouter();
  const { id } = router.query;
  //앨범 상세페이지 이동 시 앨범 아이디 담아서 요청 , 이미지 좋아요 수 댓글 수
  const dummyData = [
    { img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
    { img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
    { img: "/defaultImage.png", likeCnt: 12, commentCnt: 32 },
  ];

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
      <div className="AlbumDetail-photoWrap">
        {dummyData.map((x: any, i: number) => (
          <div key={i} className="AlbumDetail-photoBox">
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
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
