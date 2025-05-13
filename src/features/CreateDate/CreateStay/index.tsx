import React, { useCallback, useEffect, useState, useMemo } from "react";
import api from "@/util/api";
import { CreateStayStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Skeleton } from "antd";
import basicImg from "@/assets/images/close.png";
import { ScheduleType } from "..";
import { TimeType } from "..";
import { formatTimeToDays } from "@/util/function";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { ko } from "date-fns/locale";
interface CreateDaysProps {
  selectedPlace: any;
  onNext: () => void;
  range: any;
  time?: TimeType;
  schedule: ScheduleType;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
  children?: React.ReactNode;
}

interface DataType {
  category: string;
  imageSrc: string;
  lat: string;
  lon: string;
  tel: string;
  title: string;
  address: string;
}

const CreateStay = ({
  selectedPlace,
  onNext,
  range,
  time,
  schedule,
  setSchedule,
  children,
}: CreateDaysProps) => {
  const [places, setPlaces] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");
  const [day, setDay] = useState(0);
  console.log(range, "range");

  const days = useMemo(() => {
    if (!range?.from || !range?.to) return [];
    const totalDays = differenceInCalendarDays(range.to, range.from);
    return Array.from({ length: totalDays }).map((_, i) => {
      const checkIn = addDays(range.from!, i);
      const checkOut = addDays(range.from!, i + 1);
      return { checkIn, checkOut };
    });
  }, [range]);

  useEffect(() => {
    if (!range?.from || !range?.to || schedule.dataStay.length > 0) return;

    const totalDays = differenceInCalendarDays(range.to, range.from); // ✅ +1 제거
    const initialData = Array.from({ length: totalDays }).map((_, i) => ({
      date: format(addDays(range.from!, i), "yyyy-MM-dd"),
      place: null,
    }));

    setSchedule((prev) => ({
      ...prev,
      dataStay: initialData,
    }));
  }, [range]);

  const fetchNearbyPlaces = useCallback(async () => {
    if (!selectedPlace) return;

    setLoading(true);
    try {
      const res = await api.get("/map/nearby", {
        params: { address: selectedPlace.name, page: currentPage, type: 2 },
      });

      const newPlaces = res.data.locations;
      if (newPlaces.length === 0) setHasMore(false);
      else setPlaces((prev) => [...prev, ...newPlaces]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [selectedPlace, currentPage]);

  useEffect(() => {
    setPlaces([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [selectedPlace]);

  useEffect(() => {
    if (selectedPlace) fetchNearbyPlaces();
  }, [selectedPlace, currentPage]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const searchInput = async (str: string) => {
    setStr(str); // 상태 업데이트
    if (!selectedPlace) return;

    try {
      const res = await api.get("/map/searchNearby", {
        params: {
          address: selectedPlace.name,
          page: currentPage,
          str,
          type: 2,
        },
      });
      const filteredPlaces = res.data.locations;
      setPlaces(filteredPlaces); // 결과 덮어쓰기
      setHasMore(false); // 검색 결과는 더 불러오지 않도록
    } catch (err) {
      console.log("검색 오류", err);
    }
  };
  const handleSearchClick = () => {
    searchInput(str);
    setCurrentPage(1);
  };

  const handlePlaceClick = (i: number) => {
    const selected = places[i];

    const newPlace: DataType = {
      title: selected.title,
      lat: selected.lat,
      lon: selected.lon,
      category: selected.category,
      tel: selected.tel,
      imageSrc: selected.imageSrc,
      address: selected.address,
    };

    setPlace({
      name: newPlace.title,
      lat: newPlace.lat,
      lng: newPlace.lon,
    });
    const check = schedule.dataStay.filter((item) => item.place === null);
    if (check.length === 0) {
      alert("더 이상의 숙소 등록은 불가능합니다.");
      return;
    }

    setSchedule((prev) => {
      const updatedDataStay = [...prev.dataStay];
      const emptyIndex = updatedDataStay.findIndex(
        (item) => item.place === null
      );

      // 빈 날짜가 있을 경우만 업데이트
      if (emptyIndex !== -1) {
        updatedDataStay[emptyIndex] = {
          ...updatedDataStay[emptyIndex],
          place: newPlace,
        };
      }

      return {
        ...prev,
        dataStay: updatedDataStay,
      };
    });
  };
  const handleDeleteBox = (i: number) => {
    setSchedule((prev) => {
      const data = [...prev.dataStay];
      data[i] = {
        ...data[i],
        place: null, // 해당 날짜의 숙소만 null로
      };

      return {
        ...prev,
        dataStay: data,
      };
    });
  };

  const totalNights =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from)
      : 0;

  const totalDays = totalNights + 1;

  return (
    <CreateStayStyled>
      <div className="create-wrap">
        <div className="create-container">
          <div>
            <input
              value={str}
              onChange={(e) => {
                setStr(e.target.value);
              }}
            />
            <button onClick={handleSearchClick}>검색</button>
          </div>
          <span>
            {totalNights}박 {totalDays}일
          </span>
          <div className="create-left">
            <div className="create-choiceBox">
              {places.length === 0 && !loading && (
                <p>장소를 불러올 수 없습니다.</p>
              )}
              {places.map((place, i) => (
                <div
                  className="create-placecard"
                  key={i}
                  onClick={() => handlePlaceClick(i)}
                >
                  {
                    <img
                      src={
                        place.imageSrc ? place.imageSrc : "/defaultImage.png"
                      }
                      alt={place.title ? place.title : "default"}
                      className="create-image"
                    />
                  }
                  <div style={{ flex: 1 }}>
                    <div className="create-title">{place.title}</div>
                    <div className="create-info">
                      카테고리: {place.category}
                    </div>
                    <div className="create-info">전화번호: {place.tel}</div>
                    <div className="create-info">
                      위도: {place.lat} / 경도: {place.lon}
                    </div>
                  </div>
                  <button>+</button>
                </div>
              ))}
              {loading && (
                <>
                  {[...Array(5)].map((_, index) => (
                    <div className="create-placecard" key={index}>
                      <div style={{ width: "100%" }}>
                        <Skeleton
                          active
                          title={{ width: "60%" }}
                          paragraph={{
                            rows: 3,
                            width: ["80%", "50%", "40%"],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {!loading && hasMore && (
                <button className="create-loadmore" onClick={loadMore}>
                  더보기
                </button>
              )}
              {!hasMore && (
                <p className="create-end">더 이상 장소가 없습니다.</p>
              )}
            </div>
            <div className="create-daylistBox">
              {schedule.dataStay.map((dayData, idx) => (
                <div className="create-dayBox" key={dayData.date}>
                  <div className="day-label">{idx + 1}</div>
                  <div className="day-content">
                    <div className="day-title">
                      {format(new Date(dayData.date), "MM.dd(eee)", {
                        locale: ko,
                      })}{" "}
                      -{" "}
                      {format(
                        addDays(new Date(dayData.date), 1),
                        "MM.dd(eee)",
                        { locale: ko }
                      )}
                    </div>

                    {dayData.place ? (
                      <div className="create-placecard">
                        <img
                          src={dayData.place.imageSrc || "/defaultImage.png"}
                          alt={dayData.place.title || "default"}
                          className="create-image"
                        />
                        <div>
                          <div className="create-title">
                            {dayData.place.title}
                          </div>
                          <div className="create-info">
                            카테고리: {dayData.place.category}
                          </div>
                          <div className="create-info">
                            전화번호: {dayData.place.tel}
                          </div>
                          <div className="create-info">
                            위도: {dayData.place.lat} / 경도:{" "}
                            {dayData.place.lon}
                          </div>
                        </div>
                        <button onClick={() => handleDeleteBox(idx)}>
                          삭제
                        </button>
                      </div>
                    ) : (
                      <p className="day-empty">숙소를 추가해주세요.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ShowWhich selectedLocation={place} />
      </div>
      <Button type="primary" onClick={onNext}>
        선택
      </Button>
    </CreateStayStyled>
  );
};

export default CreateStay;
