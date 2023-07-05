/* global kakao */
import React, { useEffect } from "react";
import { POS } from "./Location";

const LocationView = ({ width, height, locx = POS[0], locy = POS[1] }) => {
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(locx, locy), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    console.log(locx, locy);
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    var marker = new kakao.maps.Marker();
    const qa = {
      La: locy,
      Ma: locx,
    };
    marker.setPosition(new kakao.maps.LatLng(locx, locy));
    marker.setMap(map);
  }, [locy, locx]);

  return (
    <div id="map" style={{ width: `${width}px`, height: `${height}px` }}></div>
  );
};

export default LocationView;
