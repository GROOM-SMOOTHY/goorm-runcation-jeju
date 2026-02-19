import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHeart, FiShare2 } from "react-icons/fi";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StoreInfoCard from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard";
import StoreMap from "@/components/pages/restaurant-store-page/StoreMap/StoreMap";
import styles from "@/pages/RestaurantStorePage/RestaurantStorePage.module.css";

export default function RestaurantStorePage() {
  const navigate = useNavigate();
  const { id, slug } = useParams();

  // 임의 목데이터
  const store = useMemo(
    () => ({
      tag: "현지인 맛집",
      name: slug ? decodeURIComponent(slug) : "레스토랑",
      nameEn: "Restaurant",
      heroImageUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      address: "제주특별자치도 제주시 어딘가 123",
      contact: "064-123-4567",
      hours: "매일 11:00 - 21:00 (브레이크타임 15:00 - 17:00)",
      latitude: 33.49962,
      longitude: 126.5312,
      kakaoPlaceId: id ?? "",
    }),
    [id, slug]
  );

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <Header title="맛집 상세" onBack={() => navigate(-1)} />

        <div className={styles.headerActions}>
          <button type="button" className={styles.iconButton} aria-label="공유">
            <FiShare2 size={20} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="좋아요">
            <FiHeart size={20} />
          </button>
        </div>
      </div>

      <main className={styles.container}>
        <section className={styles.hero} aria-label="매장 대표 이미지">
            
          {/* 백그라운드 매장 이미지 */}
          <div
            className={styles.heroBackground}
            style={{ backgroundImage: `url(${store.heroImageUrl})` }}
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroTitleWrap}>
            <span className={styles.heroTag}>
              {/* 그 매장 대표 태그 = 카카오맵에서 가져올 예정 */}
              {store.tag}
            </span>
            <h1 className={styles.storeName}>
              {/* 매장명 */}
              {store.name}
            </h1>
            <p className={styles.storeNameEn}>
              {/* 매장명 영어이름..? */}
              {store.nameEn}
            </p>
          </div>
        </section>

        <section className={styles.section}>
          {/* StoreInfoCard 컴포넌트 */}
          <StoreInfoCard address={store.address} contact={store.contact} hours={store.hours} />
        </section>

        <section className={styles.section}>
          {/* StoreMap 컴포넌트 */}
          <StoreMap
            latitude={store.latitude}
            longitude={store.longitude}
            storeName={store.name}
          />
        </section>

        {store.kakaoPlaceId ? (
          <p className={styles.metaText}>placeId: {store.kakaoPlaceId}</p>
        ) : null}
      </main>

      <div className={styles.bottomNavWrap}>
        <BottomNavigation />
      </div>
    </div>
  );
}