import styles from "@/pages/StampPage/StampPage.module.css";
import Header from "@/components/layout/Header/Header";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StampComponent from "@/components/Stamp/Stamp";
import Progress from "@/components/common/Progress/Progress";
import { LuStamp } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getPlaces } from "@/services/placeService";
import { useUser } from "@/store";
import type { Tables } from "@/types/supabase";

const regions = [
  "연동",
  "한림읍",
  "구좌읍",
  "성산읍",
  "조천읍",
  "애월읍",
  "서귀동",
  "중문동",
  "남원읍",
];

export default function Stamp() {
  const totalStamp = 9;
  const [stamp] = useState(9);

  const boundedStamp = Math.min(Math.max(stamp, 0), totalStamp);
  const progress = (boundedStamp / totalStamp) * 100;

  const [places, setPlaces] = useState<
    (Tables<"places"> & { photo: Tables<"photos"> | null })[]
  >([]);

  const { id: userId } = useUser();

  useEffect(() => {
    if (userId) {
      getPlaces(userId).then((places) => {
        setPlaces(places);
      });
    }
  }, [userId]);

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
          {regions.map((region) => {
            const place = places.find((p) => p.region === region);
            console.log(place);
            return (
              <StampComponent
                key={region}
                region={region}
                status={place?.photo?.image_url ? "active" : "locked"}
                imgUrl={place?.photo?.image_url || undefined}
                date={place?.created_at}
              />
            );
          })}
        </div>
      </div>
      <ButtonNavigation />
    </>
  );
}
