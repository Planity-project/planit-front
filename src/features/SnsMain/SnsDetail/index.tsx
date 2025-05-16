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
import GoogleMapComponent from "@/components/showWhichGoogle";
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
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  //sns 디테일 페이지 이동 시 데이터 요청 , 게시글 모든 데이터 필요(잘 정리해서 줄것: 맘에 안들면 다시 )

  useEffect(() => {
    api
      .get("/posts/detailData", {
        params: { postId: id },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  const dummy1: {
    id: number;
    titleImg: any;
    user: string;
    userImg: string;
    like: boolean;
    comment: CommentType[];
    likeCnt: number;
  } = {
    id: 1,
    titleImg: "/defaultImage.png",
    // 글 올린 사람
    user: "진순흠",
    userImg: "/defaultImage.png",
    // 로그인 한 사람이 앨범에 좋아요 상태
    like: true,
    comment: [
      {
        id: 1,
        userId: 1,
        profileImg: "/defaultImage.png",
        nickname: "진순흠",
        chat: "ㅋㅋㅋ",
        likeCnt: 2,
        // 댓글 좋아요 상태
        like: true,
        miniComment: [
          {
            userId: 3,
            profileImg: "/defaultImage.png",
            nickname: "진순흠",
            chat: "ㅋㅋㅋㅇㅈ",
          },
        ],
      },
      {
        id: 3,
        userId: 2,
        profileImg: "/defaultImage.png",
        nickname: "진순흠2",
        chat: "ㅋㅋㅋ",
        likeCnt: 2,
        like: true,
      },
      {
        id: 2,
        userId: 3,
        profileImg: "/defaultImage.png",
        nickname: "진순흠3",
        chat: "ㅋㅋㅋ",
        likeCnt: 2,
        like: false,
      },
    ],
    likeCnt: 12,
  };
  const dummy = {
    id: 2,
    createdAt: "2025-05-14T07:44:44.413Z",
    startDate: "2025-05-15",
    endDate: "2025-05-16",
    title: "여수",
    postTitle: "여수 여행기",
    comment: "아주 재밌는 여행이였습니다",
    like: true,
    likeCnt: 12,
    image: [
      "/defaultImage.png",
      "/defaultImage.png",
      "/defaultImage.png",
      "/defaultImage.png",
      "/defaultImage.png",
    ],
    day1: [
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "식당",
        image: "/defaultImage.png",
        startTime: "11:30:00",
        endTime: "13:30:00",
      },
      {
        id: 2,
        todayOrder: 2,
        name: "남경전복",
        category: "명소",
        image: "/defaultImage.png",
        startTime: "13:30:00",
        endTime: "15:30:00",
      },
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "카페",
        image: "/defaultImage.png",
        startTime: "15:30:00",
        endTime: "17:30:00",
      },
    ],
    day2: [
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "식당",
        image: "/defaultImage.png",
        startTime: "11:30:00",
        endTime: "13:30:00",
      },
      {
        id: 2,
        todayOrder: 2,
        name: "남경전복",
        category: "명소",
        image: "/defaultImage.png",
        startTime: "13:30:00",
        endTime: "15:30:00",
      },
      {
        id: 1,
        todayOrder: 1,
        name: "남경전복",
        category: "카페",
        image: "/defaultImage.png",
        startTime: "15:30:00",
        endTime: "17:30:00",
      },
    ],
  };

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

  const schedule = formatSchedule(dummy);
  console.log(daydetail);
  return (
    <SnsDetailStyled>
      <div className="snspost-mydaysbar">
        <div className="snspost-mydaytext">일정</div>
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
          <GoogleMapComponent />
        </div>
        <div className="snspost-daysdetail">
          <div className="snspost-daydetailbox">
            <div>{day}</div>
            <div></div>
          </div>
        </div>
      </div>
    </SnsDetailStyled>
  );
};

export default SnsDetail;
