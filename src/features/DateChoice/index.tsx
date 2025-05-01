import { Button } from "antd";
import { DateChoiceStyled } from "./styled";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ko } from "react-day-picker/locale";
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 컴포넌트가 마운트될 때 크기 확인

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const DateChoice = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  const isMobile = useResponsive();
  return (
    <DateChoiceStyled className="choice-wrap">
      <div className="choice-bigcontainer">
        <div className="choice-text">여행 기간이 어떻게 되시나요?</div>
        <Button>다음 단계</Button>
        <div className="choice-container">
          <div>
            <DayPicker
              locale={ko}
              mode="range"
              numberOfMonths={isMobile ? 1 : 2}
              selected={range}
              onSelect={setRange}
            />
          </div>
        </div>
      </div>
    </DateChoiceStyled>
  );
};

export default DateChoice;
