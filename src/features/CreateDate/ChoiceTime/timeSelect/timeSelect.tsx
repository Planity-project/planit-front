import React, { useState } from "react";
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
  minTime?: TimeOption; // 최소 시간을 prop으로 받음
  maxTime?: TimeOption; // 최대 시간을 prop으로 받음
}

const TimeSelect = ({ value, onChange, minTime, maxTime }: TimeSelectProps) => {
  const hours = Array.from({ length: 12 }, (x, i) => i + 1); // 시 1~12 배열 생성
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // 분
  const meridiems: TimeOption["meridiem"][] = ["오전", "오후"];

  const [openType, setOpenType] = useState<
    "meridiem" | "hour" | "minute" | null
  >(null); // 드롭다운 메뉴 선택시 사용할 타입

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

    // 선택된 시간이 minTime보다 작은지 확인
    if (
      minTime &&
      timeOptionToMinutes(updated) < timeOptionToMinutes(minTime)
    ) {
      alert("선택한 시간이 너무 이릅니다.");
      return;
    }

    // 선택된 시간이 maxTime보다 큰지 확인
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
    <CustomTimeSelect>
      {["meridiem", "hour", "minute"].map((type) => (
        <SelectBox key={type}>
          <Selected
            className="selected"
            onClick={() => toggleDropdown(type as any)}
          >
            {type === "meridiem" && value.meridiem}
            {type === "hour" && String(value.hour).padStart(2, "0")}
            {type === "minute" && String(value.minute).padStart(2, "0")}
          </Selected>

          {openType === type && (
            <Dropdown className="dropdown">
              {(type === "meridiem"
                ? meridiems
                : type === "hour"
                ? hours
                : minutes
              ).map((item) => (
                <DropdownItem
                  key={item}
                  className="dropdown-item"
                  onClick={() => handleSelect(type as any, item)}
                >
                  {String(item).padStart(2, "0")}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </SelectBox>
      ))}
    </CustomTimeSelect>
  );
};

export default TimeSelect;
