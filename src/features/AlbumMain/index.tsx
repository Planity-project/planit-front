import { AlbumMainStyled } from "./styled";
import { Button } from "antd";
import SnsPost from "@/components/SnsPost";
import Busan from "@/assets/images/busan.jpeg";
import { useRouter } from "next/router";
import AlbumCreate from "../AlbumCreate";
import { useState } from "react";
const AlbumMain = () => {
  const [modal, setModal] = useState<boolean>(false);
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
