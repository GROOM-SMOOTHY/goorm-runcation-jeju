import Header from "@/components/layout/Header/Header";
import styles from "./styles.module.css";
import TypeBadge, {
  type CourseTypeKey,
} from "@/components/common/TypeBadge/TypeBadge";
import GruopCodeDisplay from "@/components/pages/main-page/GroupCodeDisplay";
import PendingSettlementPanel from "@/components/pages/main-page/PendingSettlementPanel";
import WeatherPanel from "@/components/pages/main-page/WeatherPanel";
import MainShortcutCard from "@/components/pages/main-page/MainShortcutCard";
import GuestBookCard from "@/components/pages/main-page/GuestBookCard";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import { useGroup } from "@/store";

const imageSrc =
  "https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/rbijqoq1b491jsbcnnoe.jpg";

export default function MainPage() {
  const navigate = useNavigate();
  const { group } = useGroup();
  return (
    <>
      <Header title="메인" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.userInfoWrap}>
            {group?.course && (
              <TypeBadge course={group.course as CourseTypeKey} />
            )}
            {group?.batch && (
              <TypeBadge course="DEFAULT" generation={group.batch} />
            )}
          </div>
          <div className={styles.groupInfoWrap}>
            <span className={styles.title}>어디로 놀러갈까?</span>
            <GruopCodeDisplay code={group?.code || ""} />
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img src={imageSrc} alt="메인 이미지" />
          <div className={styles.imageOverlay}>
            <span className={styles.todayWeather}>오늘의 날씨</span>
            <span className={styles.todayWeatherValue}>맑음 20°C</span>
          </div>
        </div>

        <div className={styles.noticeContainer}>
          <PendingSettlementPanel count={10} />
          <WeatherPanel degree={20} weather="맑음" />
        </div>

        <div className={styles.shortcutContainer}>
          <span className={styles.label}>빠른 실행</span>
          <div className={styles.shortcutList}>
            <MainShortcutCard
              type="store"
              title={
                <>
                  지역별
                  <br />
                  맛집 탐방
                </>
              }
              onClick={() => {
                navigate("/restaurants");
              }}
            />
            <MainShortcutCard
              type="settlement"
              title={
                <>
                  정산하기
                  <br />& N빵
                </>
              }
              onClick={() => {
                navigate("/settlement");
              }}
            />
          </div>
        </div>

        <div className={styles.guestbookContainer}>
          <span className={styles.label}>방명록</span>
          <div className={styles.guestbookList}>
            <GuestBookCard
              title="김나영님"
              description="레전드 맛집있음 꼭 가는거 추천합니다~~"
              image={imageSrc}
              course="FRONTEND"
              generation={7}
            />
            <GuestBookCard
              title="김나영님"
              description="레전드 맛집있음 꼭 가는거 추천합니다~~"
              image={imageSrc}
              course="FRONTEND"
              generation={7}
            />
            <GuestBookCard
              title="김나영님"
              description="레전드 맛집있음 꼭 가는거 추천합니다~~"
              image={imageSrc}
              course="FRONTEND"
              generation={7}
            />
            <GuestBookCard
              title="김나영님"
              description="레전드 맛집있음 꼭 가는거 추천합니다~~"
              image={imageSrc}
              course="FRONTEND"
              generation={7}
            />
          </div>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
}
