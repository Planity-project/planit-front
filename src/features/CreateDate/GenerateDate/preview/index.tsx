import { useState } from "react";
import { GenerateStyled } from "./styled";
type ScheduleItem = {
  title: string;
  startTime: string;
  endTime: string;
  todayOrder: number;
};

type Place = {
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  todayOrder: number;
  image: string;
};

type TripDay = {
  date: string;
  todayOrder: number;
  places: Place[];
  scheduleItems: ScheduleItem[];
};

type TripPreview = {
  title: string;
  startDate: string;
  endDate: string;
  tripDays: TripDay[];
};

type Props = {
  previewData: TripPreview;
};

const PreviewSchedule = ({ previewData }: Props) => {
  return (
    <GenerateStyled>
      <div className="container">
        <h1 className="header">{previewData.title} 여행 일정</h1>
        <p className="date-range">
          {previewData.startDate} ~ {previewData.endDate}
        </p>
        {previewData.tripDays.map((day, i) => (
          <div className="day-block" key={day.todayOrder}>
            <div>{day.todayOrder}일차</div>
            <h2 className="day-title">{day.date}</h2>
            <ul className="schedule-list">
              {day.scheduleItems.map((item, idx) => (
                <li className="schedule-item-box" key={idx}>
                  <p>{item.todayOrder}</p>
                  <p className="time">
                    {item.startTime} - {item.endTime}
                  </p>
                  <p className="title"> {item.title}</p>
                  <p className="title">주소: {day.places[idx].address}</p>
                  <p className="title">타입: {day.places[idx].category}</p>
                  <p className="title">위도: {day.places[idx].lat}</p>
                  <p className="title">경도: {day.places[idx].lng}</p>
                  <p>
                    <img
                      className="image"
                      src={
                        day.places[idx].image
                          ? day.places[idx].image
                          : "/defaultImage.png"
                      }
                      alt=".."
                    />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GenerateStyled>
  );
};

export default PreviewSchedule;
