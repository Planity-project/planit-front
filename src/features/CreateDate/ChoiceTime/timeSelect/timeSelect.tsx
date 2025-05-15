import React, { useState, useRef, useEffect } from "react";
import {
  CustomTimeSelect,
  SelectBox,
  Selected,
  Dropdown,
  DropdownItem,
} from "./styled";

interface TimeOption {
  meridiem: "오전" | "오후";
  hour: number;
  minute: number;
}

interface TimeSelectProps {
  value: TimeOption;
  onChange: (val: TimeOption) => void;
  minTime?: TimeOption;
  maxTime?: TimeOption;
}

const TimeSelect = ({ value, onChange, minTime, maxTime }: TimeSelectProps) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const meridiems: TimeOption["meridiem"][] = ["오전", "오후"];

  const [openType, setOpenType] = useState<
    "meridiem" | "hour" | "minute" | null
  >(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenType(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (type: typeof openType) => {
    setOpenType((prev) => (prev === type ? null : type));
  };

  const timeOptionToMinutes = (option: TimeOption): number => {
    let hour = option.hour % 12;
    if (option.meridiem === "오후") hour += 12;
    return hour * 60 + option.minute;
  };

  const handleSelect = (
    type: "meridiem" | "hour" | "minute",
    val: string | number
  ) => {
    const updated = { ...value };

    if (type === "meridiem") updated.meridiem = val as TimeOption["meridiem"];
    else if (type === "hour") updated.hour = val as number;
    else if (type === "minute") updated.minute = val as number;

    if (
      minTime &&
      timeOptionToMinutes(updated) < timeOptionToMinutes(minTime)
    ) {
      alert("선택한 시간이 너무 이릅니다.");
      return;
    }

    if (
      maxTime &&
      timeOptionToMinutes(updated) > timeOptionToMinutes(maxTime)
    ) {
      alert("선택한 시간이 너무 늦습니다.");
      return;
    }

    onChange(updated);
    setOpenType(null);
  };

  return (
    <CustomTimeSelect ref={wrapperRef}>
      {/* 오전/오후 */}
      <SelectBox>
        <Selected onClick={() => toggleDropdown("meridiem")}>
          {value.meridiem}
        </Selected>
        {openType === "meridiem" && (
          <Dropdown>
            {meridiems.map((item) => (
              <DropdownItem
                key={item}
                onClick={() => handleSelect("meridiem", item)}
              >
                {item}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SelectBox>

      {/* 시 */}
      <SelectBox>
        <Selected onClick={() => toggleDropdown("hour")}>
          {String(value.hour).padStart(2, "0")}
        </Selected>
        {openType === "hour" && (
          <Dropdown>
            {hours.map((item) => (
              <DropdownItem
                key={item}
                onClick={() => handleSelect("hour", item)}
              >
                {String(item).padStart(2, "0")}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SelectBox>

      {/* 콜론 */}
      <span style={{ fontWeight: 600 }}>:</span>

      {/* 분 */}
      <SelectBox>
        <Selected onClick={() => toggleDropdown("minute")}>
          {String(value.minute).padStart(2, "0")}
        </Selected>
        {openType === "minute" && (
          <Dropdown>
            {minutes.map((item) => (
              <DropdownItem
                key={item}
                onClick={() => handleSelect("minute", item)}
              >
                {String(item).padStart(2, "0")}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SelectBox>
    </CustomTimeSelect>
  );
};

export default TimeSelect;
