export {};

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    window.initMap = initMap;

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwPCALK2zkUNJ9BhIubOtR6Tr3BDaN7O8&callback=initMap`;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      (window as any).initMap = initMap;
    };
  }, []);

  const initMap = () => {
    if (window.google && !map) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: currentLocation,
          zoom: 13,
        });

        new window.google.maps.Marker({
          position: currentLocation,
          map: mapInstance,
          title: "Your Location",
        });

        new window.google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: mapInstance,
          center: currentLocation,
          radius: 2000,
        });

        setMap(mapInstance);
      });
    }
  };

  return (
    <div id="map" ref={mapRef} style={{ height: "100%", width: "100%" }} />
  );
};

export default GoogleMapComponent;
