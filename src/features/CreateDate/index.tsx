import React, { useState } from "react";
import { Divider, Modal, Steps } from "antd";
import DateChoice from "./DateChoice";
import { Createpage } from "./styled";
import { DateRange } from "react-day-picker";
import ChoiceWhich from "./ChoiceWhich";
import CreateDays from "./CreateDays";

const CreateDatePage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null); // ⬅ 추가

  console.log("선택된 지역:", selectedPlace); // ⬅ 확인용 로그

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
            { title: "날짜 입력" },
            { title: "Step 2" },
            { title: "Step 3" },
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
        />
      )}
      {current === 2 && <CreateDays />}
    </Createpage>
  );
};

export default CreateDatePage;
