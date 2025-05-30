import React, { useEffect, useState, ReactNode } from "react";
import { Modal, Steps } from "antd";
import DateChoice from "./DateChoice";
import { Createpage } from "./styled";
import { DateRange } from "react-day-picker";
import ChoiceWhich from "./ChoiceWhich";
import CreateDays from "./CreateDays";
import CreateStay from "./CreateStay";
import ChoiceTime from "./ChoiceTime";
import api from "@/util/api";
import Loding from "@/components/Loding";
import { useUser } from "@/context/UserContext";
export interface ScheduleType {
  dataTime: any[];
  dataPlace: any[];
  dataStay: any[];
  location?: string | null;
  userId?: number;
}

export interface TimeType {
  hrs: number;
  mins: number;
}
const CreateDatePage: React.FC = () => {
  const { user } = useUser();
  const [current, setCurrent] = useState<number>(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null); // ⬅ 추가
  const [choicewhich, setChiocewhich] = useState<any>("");
  const [time, setTime] = useState<TimeType>();
  const [resultLoading, setresultLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<ReactNode>("");
  const [schedule, setSchedule] = useState<ScheduleType>({
    dataTime: [],
    dataPlace: [],
    dataStay: [],
    userId: user?.id,
  });

  const isRangeValid =
    range?.from instanceof Date &&
    range?.to instanceof Date &&
    range.from.getTime() !== range.to.getTime();

  const onChange = (value: number) => {
    if (current === 0 && !isRangeValid) {
      Modal.error({
        content: `날짜를 선택해 주세요`,
      });
      return;
    }
    setCurrent(value);
  };

  const commentSet = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            여행 날짜를 정해 나만의 특별한 시간을 계획하세요.{" "}
            <span style={{ color: "#999", fontSize: "0.9em" }}>
              일정은 최대 4박5일까지 가능합니다.
            </span>
          </>
        );
      case 1:
        return "떠날 장소를 선택해 꿈꾸던 여행을 시작하세요.";
      case 2:
        return "하루의 시간을 정해 알찬 일정을 준비하세요.";
      case 3:
        return "일정을 직접 추가해 나만의 완벽한 계획을 만들어보세요.";
      case 4:
        return "숙소를 골라 편안한 휴식을 위한 준비를 마치세요.";
      default:
        return "";
    }
  };

  useEffect(() => {
    setComment(commentSet(current));
  }, [current]);

  const handleNextStep = () => {
    setCurrent((prev) => prev + 1);
  };
  useEffect(() => {
    setSchedule((prev) => {
      return {
        ...prev,
        location: selectedPlace,
      };
    });
  }, [selectedPlace]);
  if (resultLoading) {
    return <Loding state="day" />;
  }
  return (
    <Createpage>
      <div className="createpage-text">
        {current === 0
          ? "여행 기간이 어떻게 되시나요?"
          : current === 1
          ? "어디로 여행을 떠나시나요?"
          : "어떤 하루를 보낼지 정해볼까요?"}
      </div>
      <div className="createpage-minitext">{comment}</div>
      <div className="createpage-step">
        <Steps
          current={current}
          onChange={onChange}
          items={[
            { title: "Step 1" },
            { title: "Step 2" },
            { title: "Step 3" },
            { title: "Step 4" },
            { title: "Step 5" },
          ]}
        />
      </div>

      {current === 0 && (
        <DateChoice range={range} setRange={setRange} onNext={handleNextStep} />
      )}
      {current === 1 && (
        <ChoiceWhich
          setSelectedPlace={setSelectedPlace}
          onNext={handleNextStep}
          setChoiceWhich={setChiocewhich}
          setSchedule={setSchedule}
        />
      )}
      {current === 2 && (
        <ChoiceTime
          city={selectedPlace}
          range={range}
          setTime={setTime}
          setSchedule={setSchedule}
          current={current}
          setCurrent={setCurrent}
        />
      )}

      {current === 3 && (
        <CreateDays
          selectedPlace={choicewhich}
          onNext={handleNextStep}
          range={range}
          time={time}
          schedule={schedule}
          setSchedule={setSchedule}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {current === 4 && (
        <CreateStay
          selectedPlace={choicewhich}
          range={range}
          time={time}
          onNext={handleNextStep}
          schedule={schedule}
          setSchedule={setSchedule}
          loading={loading}
          setLoading={setLoading}
          resultLoading={resultLoading}
          setresultLoading={setresultLoading}
        />
      )}
    </Createpage>
  );
};

export default CreateDatePage;
