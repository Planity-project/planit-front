import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

interface googlemaprops {
  title: string;
  schedule: PlanItem[];
  lng: number;
  lat: number;
}

interface PlanItem {
  id: number;
  todayOrder: number;
  name: string;
  category: string;
  image: string;
  startTime: string;
  endTime: string;
  lat: number;
  lng: number;
}

const GoogleMapComponent = ({ title, schedule, lng, lat }: googlemaprops) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  useEffect(() => {
    if (map && window.google) {
      // 기존 마커 및 폴리라인 제거는 생략 가능 (필요 시 추가)

      // 마커 다시 추가
      schedule.forEach((item) => {
        new window.google.maps.Marker({
          position: { lat: item.lat, lng: item.lng },
          map: map,
          title: item.name,
          label: {
            text: String(item.todayOrder),
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "rgb(151, 95, 255)",
            fillOpacity: 1,
            strokeColor: "rgb(151, 95, 255)",
            strokeWeight: 2,
          },
        });
      });

      // 폴리라인 다시 추가
      const pathCoordinates = schedule.map((item) => ({
        lat: item.lat,
        lng: item.lng,
      }));

      const schedulePath = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: "#000000",
        strokeOpacity: 0,
        strokeWeight: 2,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1",
              strokeOpacity: 1,
              strokeColor: "#000000",
              scale: 2,
            },
            offset: "0",
            repeat: "10px",
          },
        ],
      });

      schedulePath.setMap(map);
    }
  }, [schedule, map]);
  useEffect(() => {
    if (map && lat && lng) {
      // 지도 중심 이동
      map.panTo({ lat, lng });

      // 마커 찍기

      // 폴리라인 그리기
      const pathCoordinates = schedule.map((item) => ({
        lat: item.lat,
        lng: item.lng,
      }));

      const schedulePath = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: "#000000", // 검은색
        strokeOpacity: 0, // 기본 선은 안 보이게
        strokeWeight: 2,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1", // 짧은 선
              strokeOpacity: 1,
              strokeColor: "#000000",
              scale: 2,
            },
            offset: "0",
            repeat: "10px", // 점선 간격
          },
        ],
      });

      schedulePath.setMap(map);
    }
  }, [map, lat, lng, schedule]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com"]`
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyApQqf32F5wFDdLFvnTGI6OUiyrT_5L6pY&callback=initMap";
      script.async = true;
      script.defer = true;

      window.initMap = () => {
        initMap();
      };

      document.head.appendChild(script);
    } else {
      if (window.google && window.google.maps) {
        initMap();
      } else {
        existingScript.addEventListener("load", () => {
          initMap();
        });
      }
    }
  }, [schedule, lat, lng]);
  const initMap = () => {
    if (mapRef.current && window.google && !map) {
      if (!lat || !lng) {
        console.warn("Invalid lat/lng", lat, lng);
        return;
      }
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 7,
      });

      if (schedule && schedule.length > 0) {
        const pathCoordinates = schedule.map((item) => ({
          lat: item.lat,
          lng: item.lng,
        }));

        // 마커 추가
        schedule.forEach((item) => {
          new window.google.maps.Marker({
            position: { lat: item.lat, lng: item.lng },
            map: mapInstance,
            title: item.name,
            label: {
              text: String(item.todayOrder),
              color: "white", // 숫자 글자색
              fontWeight: "bold",
              fontSize: "14px",
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "rgb(151, 95, 255)",
              fillOpacity: 1,
              strokeColor: "rgb(151, 95, 255)",
              strokeWeight: 2,
            },
          });
        });

        // 경로 폴리라인 추가
        const schedulePath = new window.google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: "gray",
          strokeOpacity: 0, // 기본 선은 안 보이게
          strokeWeight: 1,
          icons: [
            {
              icon: {
                path: "M 0,-1 0,1", // 짧은 선
                strokeOpacity: 1,
                strokeColor: "gray",
                scale: 2,
              },
              offset: "0",
              repeat: "10px", // 점선 간격
            },
          ],
        });

        schedulePath.setMap(mapInstance);
      }

      setMap(mapInstance);
    }
  };

  return (
    <div id="map" ref={mapRef} style={{ height: "100%", width: "100%" }} />
  );
};

export default GoogleMapComponent;
