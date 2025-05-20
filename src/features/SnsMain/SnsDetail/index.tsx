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
import { Input, Modal } from "antd";
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
  const user = useUser();
  //sns 디테일 페이지 이동 시 데이터 요청 , 게시글 모든 데이터 필요(잘 정리해서 줄것: 맘에 안들면 다시 )

  useEffect(() => {
    if (!id || !user?.id) return; // 값이 없으면 요청 안함

    api
      .get("/posts/detailTrip", {
        params: { postId: id, userId: user.id },
      })
      .then((res: any) => {
        console.log(res.data, "dsadasds");
        setData(res.data.dayData);
      });
  }, [id, user?.id]);

  function formatSchedule(data: any): { date: string; plan: any[] }[] {
    const schedule: { date: string; plan: any[] }[] = [];
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const dayCount =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      const dateStr = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd
      const dayKey = `day${i + 1}`;

      if (data[dayKey]) {
        schedule.push({
          date: dateStr,
          plan: data[dayKey],
        });
      }
    }

    return schedule;
  }

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
  useEffect(() => {
    console.log("📌 daydetail changed:", data);
  }, [data]);

  useEffect(() => {
    console.log("📌 schedule calculated:", schedule);
  }, [schedule]);
  const selectedDaySchedule = useMemo(() => {
    return schedule[day - 1]?.plan || [];
  }, [schedule, day]);
  console.log(schedule);
  console.log(daydetail.image, "image");
  return (
    <SnsDetailStyled>
      <div className="snspost-mydaysbar">
        <div className="snspost-mydaytext">{daydetail.postTitle}</div>
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
            <div>Day{day}</div>
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
                <div className="daydetail-reviewcomment">리뷰 들어갈 자리</div>
                <div className="daydetail-reviewcomment">별점 들어갈 자리</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnsDetailStyled>
  );
};

export default SnsDetail;
