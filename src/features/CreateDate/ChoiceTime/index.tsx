import React, { useMemo, useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays, differenceInMinutes } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarOutlined } from "@ant-design/icons";
import { ChioceTimeStyled } from "./styled";
import TimeSelect from "./timeSelect/timeSelect";
import { ScheduleType } from "..";
import { TimeType } from "..";
import { Button } from "antd";

export interface TimeOption {
  meridiem: "오전" | "오후";
  hour: number;
  minute: number;
}

interface ChoiceTimeProps {
  city: string | null;
  range?: DateRange;
  setTime: (time: TimeType) => void;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
  current: number;
  setCurrent: (current: number) => void;
}

const timeOptionToMinutes = (option: TimeOption): number => {
  let hour = option.hour % 12;
  if (option.meridiem === "오후") hour += 12;
  return hour * 60 + option.minute;
};

const ChoiceTime = ({
  city,
  range,
  setTime,
  setSchedule,
  current,
  setCurrent,
}: ChoiceTimeProps) => {
  const [timeTable, setTimeTable] = useState<{
    [dateStr: string]: { start: TimeOption; end: TimeOption };
  }>({});

  const days = useMemo(() => {
    if (!range?.from || !range?.to) return [];
    const totalDays =
      Math.ceil(differenceInMinutes(range.to, range.from) / 60 / 24) + 1;
    return Array.from({ length: totalDays }).map((_, i) =>
      addDays(range.from!, i)
    );
  }, [range]);

  const totalMinutes = useMemo(() => {
    let total = 0;
    Object.values(timeTable).forEach(({ start, end }) => {
      total += timeOptionToMinutes(end) - timeOptionToMinutes(start);
    });
    return total;
  }, [timeTable]);

  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  useEffect(() => {
    setTime({ hrs, mins });
  }, [totalMinutes, setTime]);

  // 초기 렌더링 시 timeTable과 schedule 모두 설정
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

      const newDataTime = days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const entry = initialTable[dateStr];

        return {
          date: format(day, "yyyy-MM-dd(eee)", { locale: ko }),
          start: entry.start,
          end: entry.end,
        };
      });

      setSchedule((prev) => ({
        ...prev,
        dataTime: newDataTime,
      }));

      // 초기 시간도 전달
      setTime({ hrs: hrs, mins: mins });
    }
  }, [days, range]);

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

    if (
      type === "start" &&
      timeOptionToMinutes(value) >= timeOptionToMinutes(prev.end)
    ) {
      alert("시작 시간이 종료 시간보다 늦을 수 없습니다.");
      return;
    }

    if (
      type === "end" &&
      timeOptionToMinutes(value) <= timeOptionToMinutes(prev.start)
    ) {
      alert("종료 시간이 시작 시간보다 빠를 수 없습니다.");
      return;
    }

    setTimeTable((prevTable) => {
      const updatedTable = {
        ...prevTable,
        [dateStr]: {
          ...prev,
          [type]: value,
        },
      };

      const newDataTime = days
        .map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const entry = updatedTable[dateStr];
          if (!entry) return null;

          return {
            date: format(day, "yyyy-MM-dd(eee)", { locale: ko }),
            start: entry.start,
            end: entry.end,
          };
        })
        .filter(Boolean);

      setSchedule((prev) => ({
        ...prev,
        dataTime: newDataTime,
      }));

      return updatedTable;
    });
  };
  const handleBack = () => {
    setCurrent(0);
  };

  const onNext = () => {
    setCurrent(current + 1);
  };

  return (
    <ChioceTimeStyled>
      <h1>{city}</h1>
      {range?.from && range.to && (
        <h4>
          {format(range.from, "yyyy.MM.dd(eee)", { locale: ko })} –{" "}
          {format(range.to, "yyyy.MM.dd(eee)", { locale: ko })}{" "}
          <CalendarOutlined onClick={handleBack} />
        </h4>
      )}

      <div className="summary">
        여행시간 상세설정{" "}
        <span>
          총 {hrs}시간 {String(mins).padStart(2, "0")}분
        </span>
      </div>

      {/* 시작시간, 종료시간 */}
      <div className="start-endpoint">
        <div className="time-block">
          <p>시작 시간</p>
        </div>
        <div className="time-block">
          <p>종료 시간</p>
        </div>
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
                maxTime={selected.end}
              />
              <span>→</span>

              <TimeSelect
                value={selected.end}
                onChange={(val) => handleTimeChange(d, "end", val)}
                minTime={selected.start}
              />
            </div>
          </div>
        );
      })}

      <div className="choice-btnDiv">
        <Button type="primary" onClick={onNext}>
          다음
        </Button>
      </div>
    </ChioceTimeStyled>
  );
};

export default ChoiceTime;
