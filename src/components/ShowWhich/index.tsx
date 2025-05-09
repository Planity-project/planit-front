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
}

const ShowWhich = ({ selectedLocation }: ShowWhichProps) => {
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

    mapContainer.current.innerHTML = ""; // 기존 지도 지우기

    const { lat, lng } = selectedLocation;

    const map = new window.naver.maps.Map(mapContainer.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom: 8,
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
          console.log("네이버 맵 스크립트 로드 완료");
          setIsMapReady(true);
        }}
        onError={(e) => {
          console.error("네이버 맵 스크립트 로드 실패", e);
        }}
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
