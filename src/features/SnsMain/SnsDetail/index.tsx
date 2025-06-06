import { useEffect, useRef } from "react";
import { SnsDetailStyled } from "./styled";
import { useRouter } from "next/router";
import api from "@/util/api";
import Image from "next/image";
import { useState } from "react";
import CommentComponent from "@/components/Comment";
import {
  HeartFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import MyDaysComponent from "@/components/MyDays";
import { Input, message, Modal, Rate } from "antd";
import { useUser } from "@/context/UserContext";
import GoogleMapComponent from "@/components/ShowWhichGoogle";
import { useMemo } from "react";
interface ImageSliderProps {
  images: string[];
}
interface MiniComment {
  userId: number;
  profileImg: string;
  nickname: string;
  chat: string;
}
interface CommentType {
  id: number;
  userId: number;
  profileImg: string;
  nickname: string;
  chat: string;
  likeCnt?: number;
  like: boolean;
  miniComment?: MiniComment[];
}

const SnsDetail = () => {
  const [daydetail, setDaydetail] = useState<any>("");
  const [day, setDay] = useState<number>(1);
  const [data, setData] = useState<any>("");
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  //sns 디테일 페이지 이동 시 데이터 요청 , 게시글 모든 데이터 필요(잘 정리해서 줄것: 맘에 안들면 다시 )

  useEffect(() => {
    if (!id) return;

    const params = user?.id ? { postId: id, userId: user.id } : { postId: id };

    api.get("/posts/detailTrip", { params }).then((res: any) => {
      setData(res.data.dayData);
    });
  }, [id, user?.id]);
  const heart = () => {
    if (!user?.id) {
      Modal.warning({
        title: "로그인 후 이용 가능합니다.",
        okText: "확인",
        onOk: () => {
          router.push("/loginpage");
        },
      });
      return;
    }

    api.post(`/likes/post?postId=${data.id}`).then((res: any) => {
      setData((prev: any) => ({
        ...prev,
        like: res.data.liked,
      }));
    });
  };
  const delPost = () => {
    api
      .delete("posts/delete/post", { params: { postId: id } })
      .then((res: any) => {
        router.push("/snsmainpage");
      });
  };
  const schedule = useMemo(() => {
    if (!data || !data.startDate || !data.endDate) return [];

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const dayCount =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    const result = [];
    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      const dateStr = currentDate.toISOString().split("T")[0];
      const dayKey = `day${i + 1}`;

      if (data[dayKey]) {
        result.push({
          date: dateStr,
          plan: data[dayKey],
        });
      }
    }

    return result;
  }, [data]);
  useEffect(() => {}, [data]);

  useEffect(() => {}, [schedule]);
  const selectedDaySchedule = useMemo(() => {
    return schedule[day - 1]?.plan || [];
  }, [schedule, day]);

  return (
    <SnsDetailStyled>
      <div className="snspost-mydaysbar">
        <div className="snspost-mydaytext">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (!daydetail.postTitle) {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() => {
                    Modal.warning({
                      title: "링크가 복사되었습니다.",
                      content: "링크를 공유해보세요",
                      okText: "닫기",
                    });
                  })
                  .catch(() =>
                    Modal.warning({
                      title: "복사에 실패했습니다.",
                      okText: "닫기",
                    })
                  );
              }
            }}
          >
            {daydetail.postTitle || "공유하기"}
          </div>
          <div className="snspost-myheart">
            {data.type ? (
              data.like ? (
                <HeartFilled onClick={heart} />
              ) : (
                <HeartOutlined onClick={heart} />
              )
            ) : (
              <></>
            )}
            {data.userId === user?.id ? (
              <div
                onClick={() => {
                  Modal.confirm({
                    title: "해당 일정을 삭제하시겠습니까?",
                    okText: "예",
                    cancelText: "아니오",
                    onOk: () => {
                      delPost();
                    },
                  });
                }}
                className="snspost-delpost"
              >
                삭제
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <MyDaysComponent
          schedule={schedule}
          day={day}
          setDay={setDay}
          daydetail={daydetail}
          setDaydetail={setDaydetail}
        />
      </div>

      <div className="snspost-mydayright">
        <div className="snspost-whichdiv">
          <GoogleMapComponent
            schedule={selectedDaySchedule}
            title={daydetail.name}
            lng={daydetail.lng}
            lat={daydetail.lat}
            selectedDay={day}
          />
        </div>
        <div className="snspost-daysdetail">
          <div className="snspost-daydetailbox">
            <div className="snspost-daydiv">Day{day}</div>
            <div className="snspost-daydetailwrap">
              <div>
                {daydetail.image ? (
                  <Image
                    className="snspost-detailimg"
                    src={daydetail.image}
                    alt=""
                    width={65}
                    height={80}
                    unoptimized
                  />
                ) : (
                  <div
                    style={{ width: 65, height: 80, backgroundColor: "#ccc" }}
                  >
                    이미지 없음
                  </div>
                )}
              </div>
              <div>
                <div className="daydetail-name">{daydetail.name}</div>
                <div className="daydetail-category">{daydetail.category}</div>
                <div className="daydetail-reviewcomment">
                  <div className="daydetail-review">
                    <Rate allowHalf value={Number(daydetail.rating)} disabled />
                  </div>
                  <div className="daydetail-reciewcount">
                    {daydetail.reviewCount}개의 리뷰
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnsDetailStyled>
  );
};

export default SnsDetail;
