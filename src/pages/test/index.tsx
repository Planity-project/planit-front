import { useEffect, useRef, useState } from "react";
import SubmitModal from "./testComponent.tsx";

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const GoogleMapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);

  const locations = [
    { lat: 37.5665, lng: 126.978, title: "서울 시청" },
    { lat: 37.5702, lng: 126.992, title: "경복궁" },
    { lat: 37.5512, lng: 126.9882, title: "남산타워" },
  ]; //props 데이터 예시

  useEffect(() => {
    window.initMap = initMap;

    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJysCXigbpsNUgiyK58bYcPnqNaBzzg1M&callback=initMap";
      script.defer = true;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      window.initMap = undefined;
    };
  }, []);

  const initMap = () => {
    if (window.google && !map) {
      const center = locations[0];

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
      }); // 줌 인 옵션

      const bounds = new window.google.maps.LatLngBounds();
      const pathCoordinates: any[] = [];

      locations.forEach((loc, idx) => {
        const position = new window.google.maps.LatLng(loc.lat, loc.lng);
        pathCoordinates.push(position);

        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: loc.title,
          label: `${idx + 1}`,
        });

        marker.addListener("click", () => {
          mapInstance.setZoom(20);
          mapInstance.panTo(position); // 스르륵 이동
          // 원하는 확대 수준으로 변경 가능
        });

        bounds.extend(position);
      });

      mapInstance.fitBounds(bounds);

      // 점선 Polyline
      new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: "#bcb8b8",
        strokeOpacity: 0,
        strokeWeight: 2,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1", // 짧은 세로 점선
              strokeOpacity: 1,
              scale: 3,
            },
            offset: "0",
            repeat: "10px",
          },
        ],
        map: mapInstance,
      });

      setMap(mapInstance);
    }
  };

  return (
    <div>
      <SubmitModal />
      <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
    </div>
  );
};

export default GoogleMapComponent;
