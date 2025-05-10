import React, { useState } from "react";
import { Button } from "antd";
import DateChoiceModal from ".";
import { DateRange } from "react-day-picker";

interface ParentProps {
  onDateSelect: (range: DateRange) => void;
}

const ParentComponent: React.FC<ParentProps> = ({ onDateSelect }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  const handleNext = () => {
    if (range?.from && range?.to) {
      onDateSelect(range);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>날짜 선택하기</Button>
      <DateChoiceModal
        open={open}
        onClose={() => setOpen(false)}
        range={range}
        setRange={setRange}
        onNext={handleNext}
      />
    </div>
  );
};

export default ParentComponent;
