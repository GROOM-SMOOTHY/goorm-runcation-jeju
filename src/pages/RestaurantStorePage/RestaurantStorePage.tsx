import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StoreInfoCard from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard";
import StoreMap from "@/components/pages/restaurant-store-page/StoreMap/StoreMap";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import styles from "@/pages/RestaurantStorePage/RestaurantStorePage.module.css";

export default function RestaurantStorePage() {
  const navigate = useNavigate();
  const { id, slug } = useParams();
  const addToast = useToastStore((state) => state.addToast);
  const [isLiked, setIsLiked] = useState(false);

  // slug 런타임 크래시 방어 로직
  const safeDecode = (value: string) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };

  // 임의 목데이터
  const store = useMemo(
    () => ({
      tag: "현지인 맛집",
      name: slug ? safeDecode(slug) : "레스토랑",
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

  // 공유 기능
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: store.name,
          text: `${store.name} - ${store.address}`,
          url: window.location.href,
        });
        addToast("공유되었습니다", "", "success");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        addToast("링크가 복사되었습니다", "", "success");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        addToast("공유에 실패했습니다", "", "error");
      }
    }
  };

  // 좋아요 기능
  const handleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;
      addToast(
        newState ? "좋아요를 눌렀습니다" : "좋아요를 취소했습니다",
        "",
        "success"
      );
      return newState;
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.headerMain}>
          <Header title="맛집 상세" onBack={() => navigate(-1)} />
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="공유"
            onClick={handleShare}
          >
            <FiShare2 size={20} />
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${isLiked ? styles.liked : ""}`}
            aria-label="좋아요"
            onClick={handleLike}
          >
            {isLiked ? <FaHeart size={20} /> : <FiHeart size={20} />}
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
              {/* 카테고리 태그 (카카오API) */}
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