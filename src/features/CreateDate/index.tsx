import React, { useEffect, useState } from "react";
import { Modal, Steps } from "antd";
import DateChoice from "./DateChoice";
import { Createpage } from "./styled";
import { DateRange } from "react-day-picker";
import ChoiceWhich from "./ChoiceWhich";
import CreateDays from "./CreateDays";
import CreateStay from "./CreateStay";
import ChoiceTime from "./ChoiceTime";
import api from "@/util/api";
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
  const [current, setCurrent] = useState<number>(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null); // ⬅ 추가
  const [choicewhich, setChiocewhich] = useState<any>("");
  const [time, setTime] = useState<TimeType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<ScheduleType>({
    dataTime: [],
    dataPlace: [],
    dataStay: [],
  });
  const placeOnClick = async (place: string) => {
    try {
      setLoading(true); // 요청 시작 시 로딩 true
      const res = await api.get("map/place", {
        params: { name: place },
      });
      console.log(res.data); // 받아온 데이터 활용
    } catch (err) {
      console.error("API 요청 실패:", err);
    } finally {
      setLoading(false); // 요청 끝났을 때 로딩 false
    }
  };
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
    console.log("선택 지역", selectedPlace);
  }, [selectedPlace]);
  return (
    <Createpage>
      <div className="createpage-text">
        {current === 0
          ? "여행 기간이 어떻게 되시나요?"
          : current === 1
          ? "어디로 여행을 떠나시나요?"
          : "어떤 하루를 보낼지 정해볼까요?"}
      </div>

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
          placeOnClick={placeOnClick}
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
        />
      )}
    </Createpage>
  );
};

export default CreateDatePage;
