import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/util/api";
import { CreateStayStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Skeleton } from "antd";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ScheduleType } from "..";
import { SortableDayBox, UnassignedPlaceCard } from "./stayBox";
interface CreateDaysProps {
  selectedPlace: any;
  onNext: () => void;
  time: any;
  range: any;
  schedule: ScheduleType;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
  time,
  onNext,
  range,
  schedule,
  setSchedule,
  loading,
  setLoading,
}: CreateDaysProps) => {
  const [places, setPlaces] = useState<DataType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");

  useEffect(() => {
    if (!range?.from || !range?.to || schedule.dataStay.length > 0) return;
    const totalDays = differenceInCalendarDays(range.to, range.from);
    const initialData = Array.from({ length: totalDays }).map((_, i) => ({
      date: format(addDays(range.from!, i), "yyyy-MM-dd"),
      place: null,
    }));
    setSchedule((prev) => ({ ...prev, dataStay: initialData }));
  }, [range]);

  //주변 장소 받아오는 함수
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedPlace, currentPage]);

  // 숙소 검색
  // const searchInput = useCallback(
  //   async (searchStr: string) => {
  //     if (!selectedPlace) return;
  //     setLoading(true);
  //     try {
  //       const res = await api.get("/map/searchNearby", {
  //         params: {
  //           address: selectedPlace.name,
  //           page: 1, // 검색은 항상 1페이지부터
  //           str: searchStr,
  //           type: 2,
  //         },
  //       });
  //       const filteredPlaces = res.data.locations;
  //       setPlaces(filteredPlaces);
  //       setHasMore(false); // 검색은 페이징 없음(필요 시 수정)
  //     } catch (err) {
  //       console.error("검색 오류", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [selectedPlace]
  // );

  const handleSearchClick = () => {
    setCurrentPage(1); // 현재 페이지 초기화
    // searchInput(str); // 검색 API 호출
  };

  useEffect(() => {
    if (str.trim() === "" && selectedPlace) {
      setPlaces([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchNearbyPlaces();
    }
  }, [selectedPlace, currentPage, str, fetchNearbyPlaces]);

  useEffect(() => {
    if (selectedPlace) {
      setPlaces([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchNearbyPlaces();
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (currentPage !== 1) fetchNearbyPlaces();
  }, [currentPage]);

  //클릭시 숙소 추가
  const handlePlaceClick = (placeIndex: number) => {
    const selected = places[placeIndex];
    const newPlace: DataType = {
      title: selected.title,
      lat: selected.lat,
      lon: selected.lon,
      category: selected.category,
      tel: selected.tel,
      imageSrc: selected.imageSrc,
      address: selected.address,
    };

    const emptyIndex = schedule.dataStay.findIndex(
      (item) => item.place === null
    );
    if (emptyIndex === -1) {
      alert("더 이상의 숙소 등록은 불가능합니다.");
      return;
    }

    setSchedule((prev) => {
      const updated = [...prev.dataStay];
      updated[emptyIndex].place = newPlace;
      return { ...prev, dataStay: updated };
    });
  };

  const handleDeleteBox = (date: string) => {
    console.log(schedule);
    setSchedule((prev) => {
      const updated = prev.dataStay.map((item) =>
        item.date === date ? { ...item, place: null } : item
      );
      return { ...prev, dataStay: updated };
    });
  };

  //숙소 위치 변경시 함수
  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !range?.from) return;

    const oldIndex = schedule.dataStay.findIndex(
      (item) => item.date === active.id
    );
    const newIndex = schedule.dataStay.findIndex(
      (item) => item.date === over.id
    );

    const newOrder = arrayMove(schedule.dataStay, oldIndex, newIndex);

    // 날짜를 range.from 기준으로 순차 재할당
    const updatedOrder = newOrder.map((item, idx) => {
      const newDate = format(addDays(range.from!, idx), "yyyy-MM-dd");
      return { ...item, date: newDate };
    });

    setSchedule((prev) => ({ ...prev, dataStay: updatedOrder }));
  };

  return (
    <CreateStayStyled>
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

          <div className="create-left">
            <div className="create-choiceBox">
              {places.length === 0 && !loading && (
                <p>장소를 불러올 수 없습니다.</p>
              )}
              {places.map((place, i) => (
                <UnassignedPlaceCard
                  place={place}
                  onClick={() => handlePlaceClick(i)}
                />
              ))}
              {loading && <Skeleton active paragraph={{ rows: 3 }} />}
              {!loading && hasMore && (
                <button
                  className="create-loadmore"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  더보기
                </button>
              )}
            </div>

            <div className="create-daylistBox">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={schedule.dataStay.map((d) => d.date)}
                  strategy={verticalListSortingStrategy}
                >
                  {schedule.dataStay.map((dayData, index) => (
                    <SortableDayBox
                      key={dayData.date}
                      dayData={dayData}
                      index={index}
                      onDelete={() => handleDeleteBox(dayData.date)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>
        <ShowWhich selectedLocation={place} />
      </div>

      <div className="choice-btnDiv">
        <Button type="primary" onClick={onNext}>
          선택
        </Button>
      </div>
    </CreateStayStyled>
  );
};

export default CreateStay;
