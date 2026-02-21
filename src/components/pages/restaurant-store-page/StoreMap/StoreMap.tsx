import { useEffect, useRef, useState } from "react";
import styles from "@/components/pages/restaurant-store-page/StoreMap/StoreMap.module.css";

interface StoreMapProps {
  latitude: number;
  longitude: number;
}

export default function StoreMap({ latitude, longitude }: StoreMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const storeMarker = useRef<kakao.maps.Marker | null>(null);
  const userMarker = useRef<kakao.maps.Marker | null>(null);

  const [distanceText, setDistanceText] = useState("거리 계산 중...");

  // SDK 로드 함수 (한 번만 로드)
  const kakaoLoadingRef = useRef<Promise<void> | null>(null);
  const loadKakaoMapScript = () => {
    if (window.kakao?.maps) return Promise.resolve();
    if (kakaoLoadingRef.current) return kakaoLoadingRef.current;

    kakaoLoadingRef.current = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APPKEY}&autoload=false`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(() => resolve());
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return kakaoLoadingRef.current;
  };

  useEffect(() => {
    if (!mapRef.current) return;

    let isMounted = true; // 컴포넌트 언마운트 체크

    loadKakaoMapScript()
      .then(() => {
      if (!isMounted || !window.kakao?.maps) return;

      const kakao = window.kakao;
      const storePosition = new kakao.maps.LatLng(latitude, longitude);

      // 지도 최초 생성
      if (!mapInstance.current) {
        mapInstance.current = new kakao.maps.Map(mapRef.current!, {
          center: storePosition,
          level: 3,
        });
      }

      // 상점 마커 생성 또는 위치 업데이트
      if (!storeMarker.current) {
        storeMarker.current = new kakao.maps.Marker({
          position: storePosition,
        });
        storeMarker.current.setMap(mapInstance.current);
      } else {
        storeMarker.current.setPosition(storePosition);
      }

      mapInstance.current.setCenter(storePosition);

      // 사용자 위치 확인
      if (!navigator.geolocation) {
        if (isMounted) setDistanceText("위치 정보를 사용할 수 없습니다");
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isMounted) return;

          const userPosition = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          // 사용자 마커 생성 또는 위치 업데이트
          if (!userMarker.current) {
            userMarker.current = new kakao.maps.Marker({
              position: userPosition,
              map: mapInstance.current!,
            });
          } else {
            userMarker.current.setPosition(userPosition);
          }

          // 거리 계산
          const line = new kakao.maps.Polyline({
            path: [userPosition, storePosition],
          });
          const distance = line.getLength();
          const km = (distance / 1000).toFixed(1);
          setDistanceText(`${km}km 떨어져 있습니다`);
        },
        () => {
          if (!isMounted) return;
          setDistanceText("위치 정보를 사용할 수 없습니다");
        }
      );
      })
      .catch(() => {
        if (!isMounted) return;
        setDistanceText("지도를 불러올 수 없습니다");
      });

    return () => {
      isMounted = false;
    };
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
