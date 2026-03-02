import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styles from "@/components/pages/restaurant-store-page/StoreMap/StoreMap.module.css";

interface StoreMapProps {
  latitude: number;
  longitude: number;
  isLoaded: boolean;
}

export default function StoreMap({ latitude, longitude, isLoaded }: StoreMapProps) {
  const [distanceText, setDistanceText] = useState("거리 계산 중...");

  useEffect(() => {
    if (!isLoaded || !latitude || !longitude) return;

    if (!navigator.geolocation) {
      setDistanceText("위치 정보를 사용할 수 없습니다");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // 구글 맵 서비스 대신 단순 하버사인 공식 등으로 거리 계산 가능하나, 
        // 기존처럼 시각적 텍스트 유지를 위해 계산 로직만 추가
        const R = 6371; // 지구 반지름 (km)
        const dLat = (latitude - userLat) * (Math.PI / 180);
        const dLon = (longitude - userLng) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(userLat * (Math.PI / 180)) *
            Math.cos(latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        setDistanceText(`${distance.toFixed(1)}km 떨어져 있습니다`);
      },
      () => {
        setDistanceText("위치 정보를 사용할 수 없습니다");
      }
    );
  }, [latitude, longitude, isLoaded]);

  if (!isLoaded || !latitude || !longitude) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.title}>지도</span>
        </div>
        <div className={styles.loadingPlaceholder}>지도를 불러오는 중...</div>
      </div>
    );
  }

  const center = { lat: latitude, lng: longitude };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>지도</span>
        <span className={styles.distance}>{distanceText}</span>
      </div>
      <div className={styles.map}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={16}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </div>
  );
}