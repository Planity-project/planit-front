import { useEffect, useRef, useState } from "react";
import { ShowWhichStyled } from "./styled";
import Script from "next/script"; // ✅ 요거 사용

declare global {
  interface Window {
    naver: any;
  }
}

const ShowWhich = () => {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      new naver.maps.Map("map", mapOptions);
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement("script");
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ncp_iam_BPAMKR18hv9RBgxjXe5H`;
      document.head.appendChild(mapScript);
    }
  }, []);

  return (
    <ShowWhichStyled>
      <div id="map" style={{ width: "60%", height: "400px" }}></div>
    </ShowWhichStyled>
  );
};

export default ShowWhich;
