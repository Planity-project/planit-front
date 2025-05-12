import { useRouter } from "next/router";
import { InviteStyled } from "./styled";
import { Button, Modal } from "antd";
import { useEffect } from "react";
import Image from "next/image";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";
import { ok } from "assert";
const Invite = () => {
  const router = useRouter();
  const { name } = router.query;
  const user = useUser();
  useEffect(() => {
    api
      .get("/album/detailData", {
        params: { albumName: name },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  const dummy = [{ title: "헤이", titleImg: null, owner: "진순흠" }];
  const loginCheck = () => {
    if (!user || !user.id) {
      router.push(`/login?redirect=/invite?name=${name}`);
    } else {
      api.post("/album/groupjoin", { userId: user.id }).then((res) => {
        if (res.data === true) {
          Modal.warning({
            centered: true,
            title: "그룹 참여 성공",
            onOk: () => {
              router.push("/album");
            },
          });
        }
      });
    }
  };
  return (
    <InviteStyled>
      <div className="invite-container">
        <div className="invite-title">초대받은 앨범</div>

        <div className="invite-album-img">
          <Image
            src={dummy[0].titleImg ?? "/defaultImage.png"}
            alt="앨범 이미지"
            width={100}
            height={100}
          />
        </div>

        <div className="invite-album-title">{dummy[0].title}</div>
        <div className="invite-owner">그룹장 : {dummy[0].owner} 님</div>

        <Button onClick={loginCheck}>공유앨범 참여하기</Button>
      </div>
    </InviteStyled>
  );
};

export default Invite;
