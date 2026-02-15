import { useEffect, useRef, useState } from "react";
import styles from "@/components/pages/restaurant-store-page/StoreMap/StoreMap.module.css";

interface StoreMapProps {
  latitude: number;
  longitude: number;
  storeName: string;
}

export default function StoreMap({
  latitude,
  longitude,
}: StoreMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const storeMarker = useRef<kakao.maps.Marker | null>(null);

  const [distanceText, setDistanceText] = useState<string>("거리 계산 중...");
useEffect(() => {
  if (!mapRef.current) return;
  if (!window.kakao) return;

  window.kakao.maps.load(() => {
    if (!window.kakao?.maps) return;

    const storePosition = new window.kakao.maps.LatLng(latitude, longitude);

    if (!mapInstance.current) {
      mapInstance.current = new window.kakao.maps.Map(mapRef.current!, {
        center: storePosition,
        level: 3,
      });
    }

    if (!storeMarker.current) {
      storeMarker.current = new window.kakao.maps.Marker({
        position: storePosition,
      });
      storeMarker.current.setMap(mapInstance.current);
    } else {
      storeMarker.current.setPosition(storePosition);
    }

    mapInstance.current.setCenter(storePosition);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        new window.kakao.maps.Marker({
          position: userPosition,
          map: mapInstance.current!,
        });

        const line = new window.kakao.maps.Polyline({
          path: [userPosition, storePosition],
        });

        const distance = line.getLength();
        const km = (distance / 1000).toFixed(1);

        setDistanceText(`${km}km 떨어져 있습니다`);
      },
      () => {
        setDistanceText("위치 정보를 사용할 수 없습니다");
      }
    );
  });
}, [latitude, longitude]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>지도</span>
        <span className={styles.distance}>{distanceText}</span>
      </div>

      <div ref={mapRef} className={styles.map} />
    </div>
  );
}