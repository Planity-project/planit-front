import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ShowWhichStyled } from "./styled";
//데이터 타입
interface ShowWhichProps {
  selectedLocation: {
    name: string;
    country?: string;
    lat: number;
    lng: number;
  };
  isPlace?: boolean; // true면 가게, false면 지역
}

const ShowWhich = ({ selectedLocation, isPlace }: ShowWhichProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      initMap(); // 지도와 마커를 처음 생성
    } else {
      moveMap(selectedLocation.lat, selectedLocation.lng); // 위치 이동만 수행
    }
  }, [isMapReady, selectedLocation]);

  const initMap = () => {
    if (!window.naver || !mapContainer.current) return;

    mapContainer.current.innerHTML = "";

    const { lat, lng } = selectedLocation;
    const zoomLevel = isPlace ? 15 : 8; // 가게는 더 확대

    const map = new window.naver.maps.Map(mapContainer.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom: zoomLevel,
    });

    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
    });

    mapRef.current = map;
    markerRef.current = marker;
  };

  const moveMap = (lat: number, lng: number) => {
    if (!mapRef.current || !markerRef.current) return;

    const newPos = new window.naver.maps.LatLng(lat, lng);
    mapRef.current.panTo(newPos); // 부드럽게 중심 이동
    markerRef.current.setPosition(newPos); // 마커 위치도 이동
  };

  useEffect(() => {
    if (isMapReady) {
      if (!mapRef.current) {
        initMap(); // 맵 초기화
      } else {
        moveMap(selectedLocation.lat, selectedLocation.lng); // 위치 이동
      }
    }
  }, [isMapReady, selectedLocation]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=ztngs2jumn`}
        strategy="afterInteractive"
        onLoad={() => {
          setIsMapReady(true);
        }}
        onError={(e) => {}}
      />
      <ShowWhichStyled>
        <div className="show-wrapper">
          <div ref={mapContainer} className="show-div" />
        </div>
      </ShowWhichStyled>
    </>
  );
};

export default ShowWhich;
