import React, { useMemo, useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays, differenceInMinutes } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarOutlined } from "@ant-design/icons";
import { ChioceTimeStyled } from "./styled";
import TimeSelect from "./timeSelect/timeSelect";

export interface TimeOption {
  meridiem: "오전" | "오후";
  hour: number;
  minute: number;
}

interface ChoiceTimeProps {
  city: string;
  range?: DateRange;
}

// interface timeProps {
//   value: TimeOption;
//   onChange: (val: TimeOption) => void;
//   disabled?: boolean;
// }

// 오전이면 그대로 분으로 변경 오후면 12시간을 더한 뒤에 분으로 변경해서 시간 계산
const timeOptionToMinutes = (option: TimeOption): number => {
  let hour = option.hour % 12;
  if (option.meridiem === "오후") hour += 12;
  return hour * 60 + option.minute;
};

const ChoiceTime = ({ city, range }: ChoiceTimeProps) => {
  const [timeTable, setTimeTable] = useState<{
    [dateStr: string]: { start: TimeOption; end: TimeOption };
  }>({}); // 총 시간

  const days = useMemo(() => {
    if (!range?.from || !range?.to) return [];
    const totalDays =
      Math.ceil(differenceInMinutes(range.to, range.from) / 60 / 24) + 1;
    return Array.from({ length: totalDays }).map((_, i) =>
      addDays(range.from!, i)
    );
  }, [range]);

  // 총 시간 계산 (timeTable 변경시마다 새로 계산)
  const totalMinutes = useMemo(() => {
    let total = 0;
    Object.values(timeTable).forEach(({ start, end }) => {
      total += timeOptionToMinutes(end) - timeOptionToMinutes(start);
    });
    return total;
  }, [timeTable]);

  // 초기 timeTable 설정 (초기 렌더링 시 총 시간을 계산하려면 초기값 설정)
  useEffect(() => {
    if (range?.from && range?.to) {
      const initialTable: {
        [key: string]: { start: TimeOption; end: TimeOption };
      } = {};
      days.forEach((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        initialTable[dateStr] = {
          start: { meridiem: "오전", hour: 9, minute: 0 },
          end: { meridiem: "오후", hour: 9, minute: 0 },
        };
      });
      setTimeTable(initialTable);
    }
  }, [days, range]);

  const hrs = Math.floor(totalMinutes / 60); // 시간
  const mins = totalMinutes % 60; // 분

  // 시간 변경 함수 props에 시간 담아서 종료 시간보다 시작 시간이 앞서지 못하게 막기
  const handleTimeChange = (
    date: Date,
    type: "start" | "end",
    value: TimeOption
  ) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const prev = timeTable[dateStr] || {
      start: { meridiem: "오전", hour: 10, minute: 0 },
      end: { meridiem: "오후", hour: 10, minute: 0 },
    };

    // 시작 시간이 종료 시간보다 클 경우 종료 시간을 변경하지 않음
    if (
      type === "start" &&
      timeOptionToMinutes(value) >= timeOptionToMinutes(prev.end)
    ) {
      alert("시작 시간이 종료 시간보다 늦을 수 없습니다.");
      return;
    }

    // 종료 시간이 시작 시간보다 빠를 수 없도록 제한
    if (
      type === "end" &&
      timeOptionToMinutes(value) <= timeOptionToMinutes(prev.start)
    ) {
      alert("종료 시간이 시작 시간보다 빠를 수 없습니다.");
      return;
    }
    //시간 계산용
    setTimeTable((prevTable) => ({
      ...prevTable,
      [dateStr]: {
        ...prev,
        [type]: value,
      },
    }));
  };

  return (
    <ChioceTimeStyled>
      <h1>{city}</h1>
      {range?.from && range.to && (
        <h4>
          {format(range.from, "yyyy.MM.dd(eee)", { locale: ko })} –{" "}
          {format(range.to, "yyyy.MM.dd(eee)", { locale: ko })}{" "}
          <CalendarOutlined />
        </h4>
      )}

      <div className="summary">
        여행시간 상세설정{" "}
        <span>
          총 {hrs}시간 {String(mins).padStart(2, "0")}분
        </span>
      </div>

      {days.map((d) => {
        const dateStr = format(d, "yyyy-MM-dd");
        const selected = timeTable[dateStr] || {
          start: { meridiem: "오전", hour: 10, minute: 0 },
          end: { meridiem: "오후", hour: 10, minute: 0 },
        };

        return (
          <div className="day-row" key={d.toISOString()}>
            <div className="date">{format(d, "M/dd(eee)", { locale: ko })}</div>
            <div className="times">
              <TimeSelect
                value={selected.start}
                onChange={(val) => handleTimeChange(d, "start", val)}
                maxTime={selected.end} // end 시간을 기준으로 start 시간을 제한
              />
              <span>→</span>
              <TimeSelect
                value={selected.end}
                onChange={(val) => handleTimeChange(d, "end", val)}
                minTime={selected.start} // start 시간을 기준으로 end 시간을 제한
              />
            </div>
          </div>
        );
      })}
    </ChioceTimeStyled>
  );
};

export default ChoiceTime;
