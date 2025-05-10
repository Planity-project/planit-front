import React, { useState } from "react";
import ParentComponent from "@/features/test/parents"; // 모달 열고 날짜 선택하는 컴포넌트
import ChoiceTime from "@/features/CreateDate/ChoiceTime";
import { DateRange } from "react-day-picker";

const TimePage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  return (
    <div>
      <ParentComponent onDateSelect={setSelectedRange} />

      <ChoiceTime city="부산" range={selectedRange} />
    </div>
  );
};

export default TimePage;
