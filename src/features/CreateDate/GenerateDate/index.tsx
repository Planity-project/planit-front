import { ScheduleType } from "..";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import api from "@/util/api";

type Props = {
  schedule: ScheduleType;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
};

type ScheduleItem = {
  title: string;
  startTime: string;
  endTime: string;
  todayOrder: number;
};

type Place = {
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  todayOrder: number;
  image: string;
};

type TripDay = {
  date: string;
  todayOrder: number;
  places: Place[];
  scheduleItems: ScheduleItem[];
};

type TripPreview = {
  title: string;
  startDate: string;
  endDate: string;
  tripDays: TripDay[];
};

const GenerateDate = ({ schedule, setSchedule }: Props) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const user = useUser();

  useEffect(() => {
    setSchedule((prev) => ({
      ...prev,
      userId: user?.id,
    }));
  }, []);

  const generateFinalSchedule = async () => {
    try {
      await api
        .post("/trip/generateDate", {
          schedule: schedule,
          userId: user?.id,
        })
        .then((res: any) => {});
    } catch (err) {
      console.error("일정 생성 실패", err);
      alert("일정 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <button onClick={generateFinalSchedule}>최종 일정 생성</button>

      {loading && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>일정 생성 중... {progress}%</p>
          <progress value={progress} max="100" style={{ width: "60%" }} />
        </div>
      )}
    </div>
  );
};

export default GenerateDate;
