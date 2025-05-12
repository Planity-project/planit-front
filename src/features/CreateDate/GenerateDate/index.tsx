import { ScheduleType } from "..";
import { useEffect, useState } from "react";
import api from "@/util/api";
type Props = {
  schedule: ScheduleType;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
};

const GenerateDate = ({ schedule, setSchedule }: Props) => {
  const [text, setText] = useState("");
  const generateFinalSchedule = async () => {
    try {
      const res = await api.post("/trip/generateDate", schedule);
      console.log(" 최종 일정 생성 결과", res.data);
      setText(res.data);
    } catch (err) {
      console.error("일정 생성 실패", err);
      alert("일정 생성 중 오류가 발생했습니다.");
    }
  };
  return (
    <div>
      <button onClick={generateFinalSchedule}>최종 일정 생성</button>
      <p>{text}</p>
    </div>
  );
};

export default GenerateDate;
