import styles from "@/pages/StampPage/StampPage.module.css";
import Header from "@/components/layout/Header/Header";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StampComponent from "@/components/Stamp/Stamp";
import Progress from "@/components/common/Progress/Progress";
import { LuStamp } from "react-icons/lu";
import { useState } from "react";

export default function Stamp() {
  const totalStamp = 9;
  const [stamp] = useState(9);

  const boundedStamp = Math.min(Math.max(stamp, 0), totalStamp);
  const progress = (boundedStamp / totalStamp) * 100;
  return (
    <>
      <Header title="도장깨기" />
      <div className={styles.content}>
        <div className={styles.title}>
          <p>나의 제주 도장 깨기</p>
          <p>당신만의 제주 런케이션 기록</p>
        </div>
        <div className={styles.process}>
          <div className={styles.top}>
            <p>전체 달성도</p>
            <span>
              <span className={styles.reachStamp}>{boundedStamp}</span> /{" "}
              {totalStamp} 장소
            </span>
          </div>
          <Progress progress={progress} />
          <div>
            <p className={styles.bottom}>
              {totalStamp - boundedStamp}개의 장소가 남았어요{" "}
            </p>
          </div>
        </div>
        <div className={styles.stampTitle}>
          <LuStamp className={styles.luStamp} />
          <span>지역별 방문 스탬프</span>
        </div>
        <div className={styles.stamp}>
          <StampComponent region="연동" />
          <StampComponent region="한림읍" />
          <StampComponent region="구좌읍" />
          <StampComponent region="성산읍" />
          <StampComponent region="조천읍" />
          <StampComponent region="애월읍" />
          <StampComponent region="서귀동" />
          <StampComponent region="중문동" />
          <StampComponent region="남원읍" />
        </div>
      </div>
      <ButtonNavigation />
    </>
  );
}
