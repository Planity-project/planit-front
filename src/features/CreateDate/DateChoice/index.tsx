import { Button } from "antd";
import { DateChoiceStyled } from "./styled";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ko } from "react-day-picker/locale";
import { addDays, isAfter, isBefore } from "date-fns";

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
  const [initialFrom, setInitialFrom] = useState<Date | null>(null); // 시작 날짜
  const [isRangeComplete, setIsRangeComplete] = useState(false); // 범위 선택 완료 여부

  const isMobile = useResponsive();

  const today = new Date();

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange) {
      setInitialFrom(null);
      setRange(undefined);
      setIsRangeComplete(false);
      return;
    }

    // 범위가 이미 완료된 상태에서 새 선택 시작 시 초기화
    if (isRangeComplete) {
      setInitialFrom(null);
      setRange(undefined);
      setIsRangeComplete(false);
      return;
    }

    if (!initialFrom && selectedRange.from) {
      setInitialFrom(selectedRange.from);
      setRange(selectedRange);
      return;
    }

    if (initialFrom && selectedRange.from && selectedRange.to) {
      if (selectedRange.from < initialFrom) {
        setInitialFrom(null);
        setRange(undefined);
        return;
      }

      setRange(selectedRange);
      setIsRangeComplete(true);
      return;
    }

    setRange(selectedRange);
  };

  const getDisabledDays = (fromDate: Date | undefined) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 0시 기준

    // 범위가 완료된 상태면 오늘 이전만 비활성화
    if (isRangeComplete) {
      return [{ before: today }];
    }

    if (!fromDate) {
      return [{ before: today }];
    }

    const start = new Date(fromDate.setHours(0, 0, 0, 0));
    const end = addDays(start, 10);

    return [{ before: today }, { before: start }, { after: end }];
  };

  const isRangeSelected =
    range?.from instanceof Date &&
    range?.to instanceof Date &&
    range.from.getTime() !== range.to.getTime();

  const handleReactivation = (selectedRange: DateRange | undefined) => {
    if (isRangeComplete) {
      // 기간을 모두 선택한 후, 다시 선택하면 시작 날짜 선택으로 돌아가게 처리
      setIsRangeComplete(false);
      setInitialFrom(null);
      setRange(undefined);
    }
  };

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
              onSelect={(selectedRange) => {
                handleSelect(selectedRange);
                handleReactivation(selectedRange);
                setRange(selectedRange); // 기간 완료 후 다시 클릭하면 초기화
              }}
              disabled={getDisabledDays(range?.from)}
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
