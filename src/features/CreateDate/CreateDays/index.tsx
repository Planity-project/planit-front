import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateDaysStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";
interface CreateDaysProps {
  selectedPlace: string | null;
  children?: React.ReactNode;
}

const CreateDays: React.FC<CreateDaysProps> = ({ selectedPlace, children }) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");
  const fetchNearbyPlaces = useCallback(async () => {
    if (!selectedPlace) return;

    setLoading(true);
    try {
      const res = await api.get("/map/nearby", {
        params: { address: selectedPlace, page: currentPage },
      });
      const newPlaces = res.data.locations;
      if (newPlaces.length === 0) setHasMore(false);
      else setPlaces((prev) => [...prev, ...newPlaces]);
      console.log(newPlaces);
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
      const res = await api.get("/map/searchInput", {
        params: {
          address: selectedPlace,
          page: currentPage,
          str,
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
            {places.length === 0 && !loading && (
              <p>장소를 불러올 수 없습니다.</p>
            )}
            {places.map((place, i) => (
              <div className="create-placecard" key={i}>
                {
                  <img
                    src={place.imageSrc ? place.imageSrc : "/defaultImage.png"}
                    alt={place.title ? place.title : "default"}
                    className="create-image"
                  />
                }

                <div className="create-title">{place.title}</div>
                <div className="create-info">카테고리: {place.category}</div>
                <div className="create-info">전화번호: {place.tel}</div>
                <div className="create-info">
                  위도: {place.lat} / 경도: {place.lon}
                </div>
              </div>
            ))}
            {loading && <p className="create-loading">로딩 중...</p>}
            {!loading && hasMore && (
              <button className="create-loadmore" onClick={loadMore}>
                더보기
              </button>
            )}
            {!hasMore && <p className="create-end">더 이상 장소가 없습니다.</p>}
          </div>
          <div className="create-right">{children}</div>
        </div>{" "}
        <ShowWhich selectedLocation={place} />;
      </div>
    </CreateDaysStyled>
  );
};

export default CreateDays;
