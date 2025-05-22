import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

interface googlemaprops {
  title: string;
  schedule: PlanItem[]; // 이미 selectedDay 일정만 넘어온다고 가정
  lng: number;
  lat: number;
  selectedDay: number;
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
  day: number;
}

const GoogleMapComponent = ({
  title,
  schedule,
  lng,
  lat,
  selectedDay,
}: googlemaprops) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);

  const dayColorMap: { [key: number]: string } = {
    1: "rgb(255, 99, 132)",
    2: "rgb(54, 162, 235)",
    3: "rgb(255, 206, 86)",
    4: "rgb(75, 192, 192)",
    5: "rgb(153, 102, 255)",
  };

  // 마커와 선 그리기 함수
  const drawMapObjects = () => {
    if (!map || !window.google) return;

    // 기존 마커 및 선 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    // schedule 배열 자체를 사용 (이미 selectedDay 기준 필터링 됨)
    const color = dayColorMap[selectedDay] || "gray";

    schedule.forEach((item) => {
      const marker = new window.google.maps.Marker({
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
          fillColor: color,
          fillOpacity: 1,
          strokeColor: color,
          strokeWeight: 2,
        },
      });
      markersRef.current.push(marker);
    });

    const pathCoordinates = schedule.map((item) => ({
      lat: item.lat,
      lng: item.lng,
    }));

    if (pathCoordinates.length > 1) {
      const polyline = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0,
        strokeWeight: 2,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1",
              strokeOpacity: 1,
              strokeColor: color,
              scale: 2,
            },
            offset: "0",
            repeat: "10px",
          },
        ],
      });

      polyline.setMap(map);
      polylineRef.current = polyline;
    }
  };

  // 지도 초기화
  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    } else {
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJysCXigbpsNUgiyK58bYcPnqNaBzzg1M&callback=initMap";
        script.async = true;
        script.defer = true;
        window.initMap = () => {
          initMap();
        };
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener("load", () => {
          initMap();
        });
      }
    }
  }, []);

  const initMap = () => {
    if (mapRef.current && window.google && !map) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 12,
      });
      setMap(mapInstance);
    }
  };

  // 중심 좌표 변경 시 지도 이동
  useEffect(() => {
    if (map && lat && lng) {
      map.panTo({ lat, lng });
    }
  }, [map, lat, lng]);

  // schedule 또는 selectedDay 변경 시 마커/선 갱신
  useEffect(() => {
    if (map) {
      drawMapObjects();
    }
  }, [map, schedule, selectedDay]);

  return (
    <div id="map" ref={mapRef} style={{ height: "100%", width: "100%" }} />
  );
};

export default GoogleMapComponent;
