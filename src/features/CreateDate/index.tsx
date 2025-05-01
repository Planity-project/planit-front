import React, { useState } from "react";
import { Divider, Modal, Steps } from "antd";
import DateChoice from "./DateChoice";
import { Createpage } from "./styled";
import { DateRange } from "react-day-picker";
import ChoiceWhich from "./ChoiceWhich";
const CreateDatePage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [range, setRange] = useState<DateRange | undefined>();
  console.log(range);
  const isRangeValid =
    range?.from instanceof Date &&
    range?.to instanceof Date &&
    range.from.getTime() !== range.to.getTime();

  const onChange = (value: number) => {
    // 현재 Step이 0일 때만 유효성 검사를 수행함
    if (current === 0 && !isRangeValid) {
      Modal.error({
        content: `날짜를 선택해 주세요`,
      });
      return;
    }
    setCurrent(value);
  };

  const handleNextStep = () => {
    if (isRangeValid) {
      setCurrent((prev) => prev + 1);
    }
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
      {current === 1 && <ChoiceWhich />}
    </Createpage>
  );
};

export default CreateDatePage;
