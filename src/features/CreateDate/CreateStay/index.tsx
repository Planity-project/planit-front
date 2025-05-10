// CreateStay.tsx

import React, { useCallback, useEffect, useState } from "react";
import api from "@/util/api";
import { CreateStayStyled } from "./styled";
import ShowWhich from "@/components/ShowWhich";

interface CreateDaysProps {
  selectedPlace: any;
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

const CreateStay = ({ selectedPlace, children }: CreateDaysProps) => {
  const [places, setPlaces] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [place, setPlace] = useState<any | null>(selectedPlace);
  const [str, setStr] = useState("");
  const [data, setData] = useState<DataType[]>([]);

  const fetchNearbyPlaces = useCallback(async () => {
    if (!selectedPlace) return; // selectedPlace가 없으면 요청을 보내지 않음

    setLoading(true);
    try {
      const res = await api.get("/map/nearby", {
        params: { address: selectedPlace.name, page: currentPage, type: 2 },
      });

      const newPlaces = res.data.locations;
      console.log(newPlaces, "ASDFASDFAS");
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
    setStr(str);
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
    <CreateStayStyled>
      <div className="create-wrap">
        <div className="create-container">
          <div>
            <input value={str} onChange={(e) => setStr(e.target.value)} />
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
                  <img
                    src={place.imageSrc ? place.imageSrc : "/defaultImage.png"}
                    alt={place.title ? place.title : "default"}
                    className="create-image"
                  />
                  <div>
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
              {loading && <p className="create-loading">로딩 중...</p>}
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
                  <img
                    src={place.imageSrc ? place.imageSrc : "/defaultImage.png"}
                    alt={place.title ? place.title : "default"}
                    className="create-image"
                  />
                  <div>
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
        {place && <ShowWhich selectedLocation={place} />}{" "}
        {/* Place가 있을 때만 ShowWhich 렌더링 */}
      </div>
    </CreateStayStyled>
  );
};

export default CreateStay;
