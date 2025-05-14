import { useEffect } from "react";
import { SnsDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";

const SnsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  //sns 디테일 페이지 이동 시 데이터 요청 , 게시글 모든 데이터 필요(잘 정리해서 줄것: 맘에 안들면 다시 )
  useEffect(() => {
    // api
    //   .get("/post/detailData", {
    //     params: { SnsId: id },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }, []);
  return (
    <SnsDetailStyled>
      <div>{id}</div>
    </SnsDetailStyled>
  );
};

export default SnsDetail;
