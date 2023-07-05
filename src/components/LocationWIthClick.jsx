/* global kakao */
import React, { useEffect } from "react";
import { POS } from "./Location";

const LocationWithClick = ({
  width,
  height,
  locx = POS[0],
  locy = POS[1],
  onChange,
}) => {
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(locx, locy), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? result[0].road_address.address_name
            : "";
          detailAddr += result[0].address.address_name;

          var content = detailAddr;
          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          console.log(mouseEvent.latLng);
          marker.setMap(map);
          onChange(content, mouseEvent.latLng);
          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        }
      });
    });
    const current = new kakao.maps.LatLng(locx, locy);
    searchDetailAddrFromCoords(current, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var detailAddr = !!result[0].road_address
          ? result[0].road_address.address_name
          : "";
        detailAddr += result[0].address.address_name;

        var content = detailAddr;
        // 마커를 클릭한 위치에 표시합니다
        marker.setPosition(current);
        console.log(current);
        marker.setMap(map);
        onChange(content, current);
        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
      }
    });

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  }, []);

  return (
    <div id="map" style={{ width: `${width}px`, height: `${height}px` }}></div>
  );
};

export default LocationWithClick;
