import { useEffect } from "react";
import { AlbumDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
const AlbumDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  //앨범 상세페이지 이동 시 앨범 아이디 담아서 요청 , 이미지 좋아요 수 댓글 수
  useEffect(() => {
    api
      .get("/album/detailData", {
        params: { AlbumId: id },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  const dummy = [
    { img: "dummy" },
    { img: "dummy" },
    { img: "dummy" },
    { img: "dummy" },
    { img: "dummy" },
    { img: "dummy" },
    { img: "dummy" },
  ];
  return (
    <AlbumDetailStyled>
      <div>{id}</div>
    </AlbumDetailStyled>
  );
};

export default AlbumDetail;
