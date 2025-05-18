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

  // 앨범 데이터 다 주는 요청 id, 대표 이미지 , 코멘트 필요
  useEffect(() => {
    api.get("/album/allData").then((res: any) => {
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
          {data.length === 0 ? (
            <div className="AlbumMain-noData">새로운 앨범을 시작해보세요</div>
          ) : (
            <SnsPost data={data} variant="album" />
          )}
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
