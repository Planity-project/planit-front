import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateDaysStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
import { Button, Skeleton } from "antd";
import basicImg from "@/assets/images/close.png";
interface CreateDaysProps {
  selectedPlace: any;
  onNext: () => void;
  range: any;
  children?: React.ReactNode;
}

interface DataType {
  category: string;
  imageSrc: string;
  lat: string;
  lon: string;
  tel: string;
  title: string;
}

const CreateDays = ({
  selectedPlace,
  onNext,
  range,
  children,
}: CreateDaysProps) => {
  console.log(range);
  const [places, setPlaces] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");
  const [data, setData] = useState<DataType[]>([]);
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
    const selected = places[i];

    const newPlace: DataType = {
      title: selected.title,
      lat: selected.lat,
      lon: selected.lon,
      category: selected.category,
      tel: selected.tel,
      imageSrc: selected.imageSrc,
    };

    setPlace({
      name: newPlace.title,
      lat: newPlace.lat,
      lng: newPlace.lon,
    });

    setData((prev) => {
      if (prev.find((p) => p.title === newPlace.title)) return prev;
      return [...prev, newPlace];
    });
    console.log(data, "Data");
  };

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
          </div>
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
              {data.length === 0 && !loading && <p></p>}
              {data.map((place, i) => (
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
                  <div className="">
                    <div className="create-title">{place.title}</div>
                    <div className="create-info">
                      카테고리: {place.category}
                    </div>
                    <div className="create-info">전화번호: {place.tel}</div>
                    <div className="create-info">
                      위도: {place.lat} / 경도: {place.lon}
                    </div>
                  </div>
                </div>
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
