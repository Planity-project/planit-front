import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ko } from "react-day-picker/locale";
import { Button } from "antd";
import { CustomModalWrapper, DateChoiceStyled } from "./styled";
import { createPortal } from "react-dom";

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

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  onNext: () => void;
}

const CustomModal = ({
  open,
  onClose,
  range,
  setRange,
  onNext,
}: CustomModalProps) => {
  const isMobile = useResponsive();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 true
  }, []);

  const isRangeSelected =
    range?.from instanceof Date &&
    range?.to instanceof Date &&
    range.from.getTime() !== range.to.getTime();

  const modalContent = open ? (
    <CustomModalWrapper>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <DateChoiceStyled>
          <div className="choice-wrap">
            <div className="choice-bigcontainer">
              <div className="choice-container">
                <DayPicker
                  locale={ko}
                  mode="range"
                  numberOfMonths={isMobile ? 1 : 2}
                  selected={range}
                  onSelect={setRange}
                />
              </div>
              <div className="choice-btnDiv">
                <Button
                  type="primary"
                  disabled={!isRangeSelected}
                  onClick={onNext}
                >
                  선택
                </Button>
              </div>
            </div>
          </div>
        </DateChoiceStyled>
      </div>
    </CustomModalWrapper>
  ) : null;

  // 클라이언트에서만 포탈 사용
  if (isClient) {
    return createPortal(modalContent, document.body);
  }

  return null;
};

export default CustomModal;
