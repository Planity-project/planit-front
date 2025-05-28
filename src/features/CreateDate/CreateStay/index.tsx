import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateStayStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Modal, Skeleton } from "antd";
import basicImg from "@/assets/images/close.png";
import { ScheduleType } from "..";
import { UnassignedPlaceCard, AssignedPlaceCard } from "./stayBox";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CheckOutlined } from "@ant-design/icons";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { useUser } from "@/context/UserContext";
import Loding from "@/components/Loding";
import { useRouter } from "next/router";
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
  resultLoading: boolean;
  setresultLoading: (value: boolean) => void;
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
}

const CreateStay = ({
  selectedPlace,
  onNext,
  range,
  time,
  schedule,
  setSchedule,
  loading,
  setLoading,
  children,
  resultLoading,
  setresultLoading,
}: CreateDaysProps) => {
  const [places, setPlaces] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  // const [editingIndex, setEditingIndex] = useState<number | null>(null);
  // const [editedMinutes, setEditedMinutes] = useState<number>(120);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!range?.from || !range?.to) return;
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
    // selectedCategories 한글 → 구글 카테고리명 변환
    try {
      const res = await api.post<any>("/map/nearby", {
        address: selectedPlace.name,
        page: currentPage,
        type: 2,
        categories: [], // 배열 그대로 넘김
      });

      const newPlaces = res.data.locations;
      if (newPlaces.length === 0) setHasMore(false);
      else setPlaces((prev) => [...prev, ...newPlaces]);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [selectedPlace, currentPage]);

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

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const searchInput = async (str: string) => {
    setStr(str);
    if (!selectedPlace) return;

    try {
      const res = await api.post<any>("/map/searchNearby", {
        address: selectedPlace.name,
        page: 0,
        str,
        type: 2,
      });
      const filteredPlaces = res.data.locations;
      setPlaces(filteredPlaces);
      setHasMore(false);
    } catch (err) {}
  };

  const handleSearchClick = () => {
    searchInput(str);
    setCurrentPage(1);
  };

  // 버튼 중복 선택

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
      rating: selected.rating,
      reviewCount: selected.reviewCount,
    };

    const emptyIndex = schedule.dataStay.findIndex(
      (item) => item.place === null
    );
    if (emptyIndex === -1) {
      Modal.error({
        centered: true,
        title: "더 이상의 숙소 등록은 불가능합니다.",
      });
      return;
    }

    setSchedule((prev) => {
      const updated = [...prev.dataStay];
      updated[emptyIndex].place = newPlace;
      return { ...prev, dataStay: updated };
    });
  };

  const handleDeleteBox = (i: number) => {
    setSchedule((prev) => {
      const updated = [...prev.dataStay];
      updated[i].place = null;
      return { ...prev, dataStay: updated };
    });
  };

  useEffect(() => {
    const totalMinutes = schedule.dataStay.reduce(
      (acc, place) => acc + place.minutes,
      0
    );
    setTotalTime(totalMinutes);
  }, [schedule.dataStay]);

  const generateFinalSchedule = async () => {
    setresultLoading(true); // 로딩 시작
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const res = await api
        .post(
          "/trip/generateDate",
          {
            schedule,
          },
          { timeout: 3000000 }
        )
        .then((res: any) => {
          router.push(`/snsmainpage/snsdetail/${res.data}`);
        });
    } catch (err) {
      Modal.error({
        centered: true,
        title: "일정 생성중 오류가 발생했습니다.",
      });
    } finally {
      setresultLoading(false); // 로딩 종료
    }
  };
  if (resultLoading) {
    return <Loding state="day" />;
  }
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
                            width: ["75%", "50%", "30%"],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {hasMore && (
                <button className="create-loadmore" onClick={loadMore}>
                  더보기
                </button>
              )}

              {!hasMore && (
                <p className="create-end">더 이상 장소가 없습니다.</p>
              )}
            </div>

            <div className="create-daylistBox">
              {schedule.dataStay.length === 0 && !loading && <p></p>}
              {schedule.dataStay.map((x, i) => (
                <AssignedPlaceCard
                  key={i}
                  place={x.place}
                  index={i}
                  date={x.date}
                  handleDeleteBox={handleDeleteBox}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="choice-showdiv">
          <ShowWhich selectedLocation={place} isPlace={true} />
        </div>
      </div>

      <div className="choice-btnDiv">
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              centered: true,
              title: "일정을 생성하시겠습니까?",
              content: "최대 5분의 시간이 소요됩니다.",
              okText: "예",
              cancelText: "아니오",
              onOk: () => {
                generateFinalSchedule();
              },
              onCancel: () => {},
            });
          }}
        >
          일정 생성
        </Button>
      </div>
    </CreateStayStyled>
  );
};

export default CreateStay;
