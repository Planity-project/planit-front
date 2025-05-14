import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateDaysStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Skeleton } from "antd";
import basicImg from "@/assets/images/close.png";
import { ScheduleType } from "..";
import { UnassignedPlaceCard, AssignedPlaceCard } from "./contentBox";
interface CreateDaysProps {
  selectedPlace: any;
  onNext: () => void;
  range: any;
  time: any;
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
  minutes: number;
}

const CreateDays = ({
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
  const [totalTime, setTotalTime] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // 수정 중인 인덱스를 저장
  const [editedMinutes, setEditedMinutes] = useState<number>(120); // 수정할 시간을 저장

  //주변 장소 받아오는 함수
  const fetchNearbyPlaces = useCallback(async () => {
    if (!selectedPlace) return;

    setLoading(true);
    try {
      const res = await api.get("/map/nearby", {
        params: { address: selectedPlace.name, page: currentPage, type: 1 },
      });

      const newPlaces = res.data.locations;
      if (newPlaces.length === 0) setHasMore(false);
      else setPlaces((prev) => [...prev, ...newPlaces]);
      console.log("응답", newPlaces);
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
          type: 1,
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
    const totalMinutes = time.hrs * 60 + time.mins;
    const selected = places[i];
    const newPlace: DataType = {
      title: selected.title,
      lat: selected.lat,
      lon: selected.lon,
      category: selected.category,
      tel: selected.tel,
      imageSrc: selected.imageSrc,
      address: selected.address,
      minutes: 120,
    };

    setPlace({
      name: newPlace.title,
      lat: newPlace.lat,
      lng: newPlace.lon,
    });

    setSchedule((prev) => {
      const dup = prev.dataPlace.find((p) => p.title === newPlace.title); //중복 지역은 x
      if (dup) return prev;

      return {
        ...prev,
        dataPlace: [...prev.dataPlace, newPlace],
      };
    });
    console.log(newPlace, "Data");
  };

  // 시간 수정 핸들러
  const handleTimeChange = (i: number, minutes: number) => {
    setEditingIndex(i);
    setEditedMinutes(minutes); // 기존 시간을 가져와서 수정할 수 있게
  };

  // 수정된 시간 저장 핸들러
  const handleTimeUpdate = (i: number) => {
    const updated = [...schedule.dataPlace];
    updated[i].minutes = editedMinutes; // 시간 업데이트

    setSchedule((prev) => ({
      ...prev,
      dataPlace: updated,
    }));

    setEditingIndex(null); // 수정 모드 종료
  };

  const handleDeleteBox = (i: number) => {
    const arr = schedule.dataPlace.filter((x, index) => index !== i);

    setSchedule((prev) => {
      return {
        ...prev,
        dataPlace: arr,
      };
    });
  };
  useEffect(() => {
    console.log("최종 schedule 상태:", schedule);
  }, [schedule]);

  useEffect(() => {
    const totalMinutes = schedule.dataPlace.reduce(
      (acc, place) => acc + place.minutes,
      0
    );
    setTotalTime(totalMinutes);
  }, [schedule.dataPlace]);

  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = totalTime % 60;

  return (
    <CreateDaysStyled>
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
            <button>장소 등록</button>
            <button>음식점</button>
            <button>쇼핑</button>
            <button>활동</button>
            <button>관광</button>
          </div>
          <span>
            {totalHours}시간 {String(totalMinutes).padStart(2, "0")}분 /총{" "}
            {time.hrs}시간 {String(time.mins).padStart(2, "0")}분
          </span>
          <div className="create-left">
            <div className="create-choiceBox">
              {places.length === 0 && !loading && (
                <p>장소를 불러올 수 없습니다.</p>
              )}
              {places.map((place, i) => (
                <UnassignedPlaceCard
                  key={i}
                  place={place}
                  onClick={() => handlePlaceClick(i)}
                />
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
              {schedule.dataPlace.length === 0 && !loading && <p></p>}
              {schedule.dataPlace.map((place, i) => (
                <AssignedPlaceCard
                  key={i}
                  place={place}
                  index={i}
                  editingIndex={editingIndex}
                  editedMinutes={editedMinutes}
                  setEditedMinutes={setEditedMinutes}
                  handleTimeChange={handleTimeChange}
                  handleTimeUpdate={handleTimeUpdate}
                  handleDeleteBox={handleDeleteBox}
                />
              ))}
            </div>
          </div>
        </div>
        <ShowWhich selectedLocation={place} isPlace={true} />
      </div>
      <Button type="primary" onClick={onNext}>
        선택
      </Button>
    </CreateDaysStyled>
  );
};

export default CreateDays;
