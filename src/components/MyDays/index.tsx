import { useEffect, useRef, useState } from "react";
import { MyDaysStyled } from "./styled";
import Image from "next/image";

interface ScheduleItem {
  date: string;
  plan: {
    id: number;
    todayOrder: number;
    name: string;
    category: string;
    image: string;
    startTime: string;
    endTime: string;
  }[];
}

interface MyDaysProps {
  schedule: ScheduleItem[];
  day: number;
  setDay: (value: number) => void;
  daydetail: any;
  setDaydetail: any;
}

const MyDaysComponent = ({
  schedule,
  day,
  setDay,
  daydetail,
  setDaydetail,
}: MyDaysProps) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const planRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let closestPlanIndex = -1;
      let minPlanDistance = Infinity;

      let currentDayIdx = 0;

      const containerTop = container.getBoundingClientRect().top;

      // Day 인덱스 설정
      containerRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top - containerTop <= 150) {
            currentDayIdx = i;
          }
        }
      });

      // 현재 보여지는 일정 하나 추적
      planRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const distance = Math.abs(rect.top - containerTop);

          if (rect.top >= containerTop && distance < minPlanDistance) {
            closestPlanIndex = i;
            minPlanDistance = distance;
          }
        }
      });

      // 상태 업데이트
      setCurrentDayIndex(currentDayIdx);
      setDay(currentDayIdx + 1);

      if (closestPlanIndex !== -1) {
        const flatPlans = schedule.flatMap((d) => d.plan);
        const dayItem = flatPlans[closestPlanIndex];
        setDaydetail(dayItem);
        setActivePlanIndex(closestPlanIndex); // ✅ 활성 인덱스 저장
      }
      if (
        container.scrollTop === 0 &&
        schedule.length > 0 &&
        schedule[0].plan.length > 0
      ) {
        setDaydetail(schedule[0].plan[0]);
        setDay(1);
        setActivePlanIndex(0);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [schedule]);

  return (
    <MyDaysStyled ref={scrollContainerRef}>
      <div className="sticky-day-title">{` Day ${currentDayIndex + 1}`}</div>
      <div className="days-bigBox">
        {schedule.map((day, dayIndex) => (
          <div
            className="day-container"
            key={dayIndex}
            ref={(el) => {
              containerRefs.current[dayIndex] = el;
            }}
          >
            <div className="plan-dayDiv">{`Day ${dayIndex + 1}`}</div>
            <div className="plan-list">
              {day.plan.map((item, planIndex) => {
                // 전체 순번 (flat index)
                const globalIndex =
                  schedule
                    .slice(0, dayIndex)
                    .reduce((acc, d) => acc + d.plan.length, 0) + planIndex;

                return (
                  <div
                    className={`plan-item ${
                      activePlanIndex === globalIndex ? "active" : ""
                    }`}
                    key={`day-${dayIndex}-plan-${planIndex}`}
                    ref={(el) => {
                      planRefs.current[globalIndex] = el;
                    }}
                  >
                    <div className="plan-numberDiv">
                      <div className="plan-number">{planIndex + 1}</div>
                    </div>
                    <div className="plan-text">
                      <div className="plan-timeDiv">
                        <div className="plan-time">
                          {item.startTime.slice(0, 5)} ~{" "}
                          {item.endTime.slice(0, 5)}
                        </div>
                        <div className="paln-name">{item.name}</div>
                      </div>
                      <div
                        className="plan-category"
                        style={{
                          color:
                            item.category === "식당"
                              ? "rgb(255,64,129)"
                              : item.category === "명소"
                              ? "rgb(46,182,125)"
                              : "rgb(229,195,75)",
                        }}
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="plan-line"></div>
            </div>
          </div>
        ))}
      </div>
    </MyDaysStyled>
  );
};

export default MyDaysComponent;
