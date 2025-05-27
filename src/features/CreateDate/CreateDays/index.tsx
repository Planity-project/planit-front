import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import api from "@/util/api";
import { CreateDaysStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Skeleton, Modal } from "antd";
import { Input } from "antd";
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { ScheduleType } from "..";
import { UnassignedPlaceCard, AssignedPlaceCard } from "./contentBox";

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
  rating?: number;
  reviewCount?: number;
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "전체",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 주변 장소 받아오는 함수 (page 인자로 받음)
  const fetchNearbyPlaces = useCallback(
    async (page: number) => {
      if (!selectedPlace) return;

      setLoading(true);
      try {
        console.log(selectedCategories, "선택된 카테고리");
        const res = await api.post("/map/nearby", {
          address: selectedPlace.name,
          page,
          type: 1,
          categories: selectedCategories,
        });

        const newPlaces = res.data.locations;
        if (newPlaces.length === 0) setHasMore(false);
        else
          setPlaces((prev) =>
            page === 0 ? newPlaces : [...prev, ...newPlaces]
          );
        console.log("응답", newPlaces);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [selectedPlace, selectedCategories, setLoading]
  );

  // selectedPlace 변경 시 초기화
  useEffect(() => {
    if (selectedPlace) {
      setPlaces([]);
      setCurrentPage(0);
      setHasMore(true);
    }
  }, [selectedPlace]);

  // currentPage 또는 selectedPlace 변경 시 fetch 호출
  useEffect(() => {
    if (selectedPlace && currentPage > 0) {
      fetchNearbyPlaces(currentPage);
    }
  }, [selectedPlace, currentPage]);

  // selectedCategories 변경 시 currentPage 1로 세팅 -> useEffect가 fetch 호출
  useEffect(() => {
    if (selectedPlace) {
      setPlaces([]);
      setHasMore(true);
      setCurrentPage(0);
      fetchNearbyPlaces(0);
    }
  }, [selectedCategories, selectedPlace]);

  // loadMore 눌렀을 때 스크롤 위치 저장 후 currentPage 증가
  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const searchInput = async (str: string) => {
    setStr(str);
    if (!selectedPlace) return;

    try {
      const res = await api.post("/map/searchNearby", {
        address: selectedPlace.name,
        page: 0,
        type: 1,
        str: str,
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

  const toggleCategory = (category: string) => {
    if (category === "전체") {
      // "전체" 선택 시 다른 선택 무시하고 전체만
      setSelectedCategories(["전체"]);
    } else {
      setSelectedCategories((prev) => {
        const isSelected = prev.includes(category);
        const filtered = prev.filter((c) => c !== "전체");

        if (isSelected) {
          const newSelected = filtered.filter((c) => c !== category);
          return newSelected.length === 0 ? ["전체"] : newSelected;
        } else {
          return [...filtered, category];
        }
      });
    }
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
      rating: selected.rating,
      reviewCount: selected.reviewCount,
      minutes: 120,
    };

    setPlace({
      name: newPlace.title,
      lat: newPlace.lat,
      lng: newPlace.lon,
    });

    setSchedule((prev) => {
      const dup = prev.dataPlace.find((p) => p.title === newPlace.title);
      if (dup) return prev;

      return {
        ...prev,
        dataPlace: [...prev.dataPlace, newPlace],
      };
    });
  };

  const handleTimeChange = (i: number, minutes: number) => {
    setEditingIndex(i);
    setEditedMinutes(minutes);
  };

  const handleTimeUpdate = (i: number) => {
    const updated = [...schedule.dataPlace];
    updated[i].minutes = editedMinutes;

    setSchedule((prev) => ({
      ...prev,
      dataPlace: updated,
    }));

    setEditingIndex(null);
  };

  const handleDeleteBox = (i: number) => {
    const arr = schedule.dataPlace.filter((x, index) => index !== i);

    setSchedule((prev) => ({
      ...prev,
      dataPlace: arr,
    }));
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

  const handleNextClick = () => {
    const allowedTime = time.hrs * 60 + time.mins;

    if (totalTime > allowedTime) {
      Modal.error({
        title: "총 시간을 초과했습니다 시간을 조절해주세요.",
        centered: true,
      });
      return;
    }

    onNext(); // 시간 초과가 아닐 경우에만 다음 단계로
  };

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
              {["전체", "명소", "식당", "카페"].map((label) => (
                <button
                  key={label}
                  onClick={() => toggleCategory(label)}
                  className={`create-button-item ${
                    selectedCategories.includes(label) ? "active" : ""
                  }`}
                >
                  {label}
                  {selectedCategories.includes(label) && (
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
              {places.map((place, i) => (
                <UnassignedPlaceCard
                  key={`${place.title}-${place.lat}-${place.lon}-${i}`}
                  place={place}
                  onClick={() => handlePlaceClick(i)}
                />
              ))}

              {loading && (
                <>
                  {[...Array(5)].map((_, index) => (
                    <div className="create-placecard" key={`skeleton-${index}`}>
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
              )}

              {!loading && hasMore && (
                <button
                  className="create-loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    loadMore();
                  }}
                >
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
        <Button type="primary" onClick={handleNextClick}>
          다음
        </Button>
      </div>
    </CreateDaysStyled>
  );
};

export default CreateDays;
