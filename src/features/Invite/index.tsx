import { useRouter } from "next/router";
import { InviteStyled } from "./styled";
import { Button, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/util/api";
import { useUser } from "@/context/UserContext";

const Invite = () => {
  const router = useRouter();
  const { name } = router.query;
  const { user } = useUser();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUrl = window.location.href;
    setLoading(true);

    (api.get("album/inviteFind", { params: { currentUrl } }) as Promise<any>)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("초대 앨범 불러오기 실패:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // 🔁 무한루프 방지

  const loginCheck = () => {
    if (!user || !user.id) {
      router.push(`/loginpage?redirect=/invite?name=${name}`);
    } else {
      api
        .post("/album/groupjoin", { userId: user.id, albumId: data.id })
        .then((res: any) => {
          if (res.data.result === true) {
            Modal.warning({
              centered: true,
              title: "그룹 참여 성공",
              onOk: () => {
                router.push(`album/detail/${res.data.albumId}`);
              },
            });
          } else {
            Modal.warning({
              centered: true,
              title: `${res.data.message}`,
            });
          }
        });
    }
  };

  return (
    <InviteStyled>
      <div className="invite-container">
        {loading ? (
          <Spin tip="로딩 중..." size="large" style={{ marginTop: 100 }} />
        ) : (
          <>
            <div className="invite-title">초대받은 앨범</div>
            <div className="invite-album-img">
              <Image
                src={data.titleImg ?? "/defaultImage.png"}
                alt="앨범 이미지"
                width={100}
                height={100}
              />
            </div>
            <div className="invite-album-title">{data.title}</div>
            <div className="invite-owner">그룹장 : {data.owner} 님</div>
            <Button onClick={loginCheck}>공유앨범 참여하기</Button>
          </>
        )}
      </div>
    </InviteStyled>
  );
};

export default Invite;
