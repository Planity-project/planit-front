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
}

const MyDaysComponent = ({ schedule }: MyDaysProps) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      containerRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 150) {
            setCurrentDayIndex(i);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MyDaysStyled>
      <div className="sticky-day-title">{` Day ${currentDayIndex + 1}`}</div>
      {schedule.map((day, index) => (
        <div
          className="day-container"
          key={index}
          ref={(el) => {
            containerRefs.current[index] = el;
          }}
        >
          <div className="plan-dayDiv">{`Day ${index + 1}`}</div>
          <div className="plan-list">
            {day.plan.map((item, i) => (
              <div className="plan-item" key={i}>
                <div className="plan-numberDiv">
                  <div className="plan-number">{i + 1}</div>
                </div>
                <div className="plan-text">
                  <div className="plan-timeDiv">
                    <div className="plan-time">
                      {item.startTime.slice(0, 5)} ~ {item.endTime.slice(0, 5)}
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
            ))}
            <div className="plan-line"></div>
          </div>
        </div>
      ))}
    </MyDaysStyled>
  );
};

export default MyDaysComponent;
