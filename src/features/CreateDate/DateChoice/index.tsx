import { Button } from "antd";
import { DateChoiceStyled } from "./styled";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ko } from "react-day-picker/locale";
import ShowWhich from "@/components/ShowWhich";
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

interface DateChoiceProps {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  onNext: () => void;
}

const DateChoice = ({ range, setRange, onNext }: DateChoiceProps) => {
  const isMobile = useResponsive();

  const isRangeSelected =
    range?.from instanceof Date &&
    range?.to instanceof Date &&
    range.from.getTime() !== range.to.getTime();

  return (
    <DateChoiceStyled className="choice-wrap">
      <div className="choice-bigcontainer">
        <div className="choice-container">
          <div>
            <DayPicker
              locale={ko}
              mode="range"
              numberOfMonths={isMobile ? 1 : 2}
              selected={range}
              onSelect={setRange} // 선택 시 상위로 전달
            />
          </div>
        </div>
        <div className="choice-btnDiv">
          <Button type="primary" disabled={!isRangeSelected} onClick={onNext}>
            선택
          </Button>
        </div>
      </div>
    </DateChoiceStyled>
  );
};

export default DateChoice;
