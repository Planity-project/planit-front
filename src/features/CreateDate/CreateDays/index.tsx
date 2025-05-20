import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateDaysStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Skeleton } from "antd";
import basicImg from "@/assets/images/close.png";
import { ScheduleType } from "..";
import { UnassignedPlaceCard, AssignedPlaceCard } from "./contentBox";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CheckOutlined } from "@ant-design/icons";

interface CreateDaysProps {
  selectedPlace: any;
  onNext: () => void;
  range: any;
  time: any;
  schedule: ScheduleType;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
  loading,
  setLoading,
  children,
}: CreateDaysProps) => {
  const [places, setPlaces] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedMinutes, setEditedMinutes] = useState<number>(120);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  //주변 장소 받아오는 함수
  const fetchNearbyPlaces = useCallback(async () => {
    if (!selectedPlace) return;

    setLoading(true);
    // selectedCategories 한글 → 구글 카테고리명 변환
    try {
      console.log(selectedCategories, "선택된 카테고리");
      const res = await api.post("/map/nearby", {
        address: selectedPlace.name,
        page: currentPage,
        type: 1,
        categories: selectedCategories, // 배열 그대로 넘김
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
  }, [selectedPlace, currentPage, selectedCategories]);

  useEffect(() => {
    if (selectedPlace) {
      setPlaces([]);

      setCurrentPage(1);
      setHasMore(true);
      // 다음 effect에서 1페이지로 다시 fetch
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (selectedPlace) fetchNearbyPlaces();
  }, [selectedPlace, currentPage]);

  useEffect(() => {
    setPlaces([]);
    setCurrentPage(1);
    if (selectedPlace) fetchNearbyPlaces();
  }, [selectedCategories]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const searchInput = async (str: string) => {
    setStr(str);
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
      setPlaces(filteredPlaces);
      setHasMore(false);
    } catch (err) {
      console.log("검색 오류", err);
    }
  };

  const handleSearchClick = () => {
    searchInput(str);
    setCurrentPage(1);
  };

  // 버튼 중복 선택
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
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

    setEditingIndex(null);
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
          <div className="create-input">
            <Input
              placeholder="장소명을 검색하세요"
              value={str}
              onChange={(e) => setStr(e.target.value)}
              onPressEnter={handleSearchClick}
              className="custom-input"
            />
            <SearchOutlined
              className="search-icon"
              onClick={handleSearchClick}
            />
          </div>

          <div className="create-all">
            <div className="create-topleft">
              {["명소", "식당", "카페"].map((label) => (
                <button
                  key={label}
                  onClick={() => toggleCategory(label)}
                  className={`create-button-item ${
                    selectedCategories.includes(label) ? "active" : ""
                  }`}
                >
                  {label}
                  {["명소", "식당", "카페"].includes(label) &&
                    selectedCategories.includes(label) && (
                      <CheckOutlined className="check-icon" />
                    )}
                </button>
              ))}
            </div>

            <div className="create-time">
              <span
                className={
                  totalTime > time.hrs * 60 + time.mins ? "over-time" : ""
                }
              >
                {totalHours}시간 {String(totalMinutes).padStart(2, "0")}분
              </span>
              {" / 총 "}
              <span>
                {time.hrs}시간 {String(time.mins).padStart(2, "0")}분
              </span>
            </div>
          </div>

          <div className="create-left">
            <div className="create-choiceBox">
              {loading ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <div className="create-placecard" key={index}>
                      <div style={{ width: "100%" }}>
                        <Skeleton
                          active
                          title={{ width: "60%" }}
                          paragraph={{
                            rows: 3,
                            width: ["75%", "50%", "30%"],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : places.length === 0 ? (
                <p>장소를 불러올 수 없습니다.</p>
              ) : (
                places.map((place, i) => (
                  <UnassignedPlaceCard
                    key={i}
                    place={place}
                    onClick={() => handlePlaceClick(i)}
                  />
                ))
              )}

              {!loading && hasMore && (
                <button className="create-loadmore" onClick={loadMore}>
                  더보기
                </button>
              )}

              {!loading && !hasMore && (
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

      <div className="choice-btnDiv">
        <Button type="primary" onClick={onNext}>
          다음
        </Button>
      </div>
    </CreateDaysStyled>
  );
};

export default CreateDays;
