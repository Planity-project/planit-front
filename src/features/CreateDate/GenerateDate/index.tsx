import { ScheduleType } from "..";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import api from "@/util/api";
import PreviewSchedule from "./preview";

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
  const [text, setText] = useState("");
  const [previewData, setPreviewData] = useState<TripPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const user = useUser();

  useEffect(() => {
    setSchedule((prev) => ({
      ...prev,
      userId: user?.id,
    }));
  }, []);

  //  일정 미리보기 요청
  const previewCallender = async () => {
    setLoading(true);
    setProgress(0);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 97 ? prev + 1 : prev));
      }, 70);

      const res = await api.post("/trip/preview", schedule);
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 700);

      setPreviewData(res.data);
    } catch (err) {
      console.error("일정 미리보기 실패", err);
      alert("일정 미리보기 중 오류가 발생했습니다.");
      setLoading(false);
      setProgress(0);
    }
  };

  const generateFinalSchedule = async () => {
    try {
      const res = await api.post("/trip/generateDate", schedule);
      setText(res.data);
    } catch (err) {
      console.error("일정 생성 실패", err);
      alert("일정 생성 중 오류가 발생했습니다.");
    }
  };

  const getCallender = async () => {
    const res: any = await api.get("/trip/find");
    console.log(res.data);
  };

  return (
    <div>
      <button onClick={generateFinalSchedule}>최종 일정 생성</button>
      <p>{text}</p>
      <button onClick={getCallender}>일정 가져오기</button>
      <button onClick={previewCallender}>일정 미리보기</button>

      {loading && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>일정 생성 중... {progress}%</p>
          <progress value={progress} max="100" style={{ width: "60%" }} />
        </div>
      )}

      {previewData && (
        <div>
          <PreviewSchedule previewData={previewData} />
        </div>
      )}
    </div>
  );
};

export default GenerateDate;
