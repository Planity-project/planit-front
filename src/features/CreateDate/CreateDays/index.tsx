import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateDaysStyled } from "./styled";

interface CreateDaysProps {
  selectedPlace: string | null;
  children?: React.ReactNode;
}

const CreateDays: React.FC<CreateDaysProps> = ({ selectedPlace, children }) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <CreateDaysStyled>
      <div className="create-container">
        <div className="create-left">
          {places.length === 0 && !loading && <p>장소를 불러올 수 없습니다.</p>}
          {places.map((place, i) => (
            <div className="create-placecard" key={i}>
              {place.imageSrc && (
                <img
                  className="create-image"
                  src={place.imageSrc}
                  alt={place.title}
                />
              )}
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
      </div>
    </CreateDaysStyled>
  );
};

export default CreateDays;
