import { AlbumMainStyled } from "./styled";
import { Button } from "antd";
import SnsPost from "@/components/SnsPost";
import Busan from "@/assets/images/busan.jpeg";
import { useRouter } from "next/router";
import AlbumCreate from "../AlbumCreate";
import { useEffect, useState } from "react";
import api from "@/util/api";
const AlbumMain = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<any>("");
  const router = useRouter();
  const dummy = [
    {
      userid: 1,
      nickName: "순흠",
      img: [Busan],
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 1,
      nickName: "순흠",
      img: [Busan],
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 1,
      nickName: "순흠",
      img: [Busan],
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
    {
      userid: 1,
      nickName: "순흠",
      img: [Busan],
      comment: "아 더미데이터 만들기 개 귀찮네 진짜 ",
    },
  ];
  // 앨범 데이터 다 주는 요청 id, 대표 이미지 , 코멘트 필요
  useEffect(() => {
    api.get("/album/allData").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <AlbumMainStyled>
      <div className="AlbumMain-wrap">
        <div className="AlbumMain-title">추억을 저장하고 공유해보세요</div>

        <div className="AlbumMain-btnDiv">
          <Button
            onClick={() => {
              setModal(true);
            }}
          >
            생성하기
          </Button>
        </div>

        <div className="AlbimMain-container">
          <SnsPost data={dummy} variant="album" />
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <AlbumCreate modal={modal} setModal={setModal} />
    </AlbumMainStyled>
  );
};

export default AlbumMain;
