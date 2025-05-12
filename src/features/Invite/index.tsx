import { useRouter } from "next/router";
import { InviteStyled } from "./styled";
import { Button } from "antd";
import { useEffect } from "react";
import api from "@/util/api";
const Invite = () => {
  const router = useRouter();
  const { name } = router.query;
  useEffect(() => {
    api
      .get("/album/detailData", {
        params: { albumName: name },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <InviteStyled>
      <div>
        <div>
          <div>초대받은 앨범</div>
          <div>{name}</div>
        </div>
        <Button>공유앨범 참여하기</Button>
      </div>
    </InviteStyled>
  );
};

export default Invite;
