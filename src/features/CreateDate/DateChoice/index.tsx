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
  const [initialFrom, setInitialFrom] = useState<Date | null | any>(null); // 시작 날짜
  const [isRangeComplete, setIsRangeComplete] = useState(false); // 범위 선택 완료 여부

  const isMobile = useResponsive();

  const today = new Date();

  const handleSelect = (selectedRange: DateRange | undefined) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!selectedRange) {
      setInitialFrom(null);
      setRange(undefined);
      setIsRangeComplete(false);
      return;
    }

    const { from, to } = selectedRange;

    // 이미 선택 완료 상태면 → 어떤 날짜를 클릭하든 다시 시작
    if (isRangeComplete) {
      setInitialFrom(null);
      setRange(undefined);
      setIsRangeComplete(false);
      return;
    }

    // 처음 선택한 경우
    if (!initialFrom && from) {
      setInitialFrom(from);
      setRange({ from, to: undefined });
      return;
    }

    // 두 번째 선택이며, 10일 범위 내에서 선택된 경우
    if (initialFrom && from && to) {
      const maxTo = addDays(initialFrom, 10);
      if (isAfter(to, maxTo)) {
        // 범위 초과 → 무시
        return;
      }
      setRange({ from: initialFrom, to });
      setIsRangeComplete(true);
      return;
    }

    setRange(selectedRange);
  };

  const getDisabledDays = (fromDate: Date | undefined) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isRangeComplete) {
      // 범위 완료 후 → 오늘 이전만 비활성화
      return [{ before: today }];
    }

    if (!fromDate) {
      // 아무것도 선택 안 했을 땐 오늘 이전만 비활성화
      return [{ before: today }];
    }

    const start = new Date(fromDate.setHours(0, 0, 0, 0));
    const end = addDays(start, 9);
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
              onSelect={handleSelect}
              disabled={getDisabledDays(initialFrom)}
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
