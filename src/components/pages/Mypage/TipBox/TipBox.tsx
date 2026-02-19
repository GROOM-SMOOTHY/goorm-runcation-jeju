import styles from "@/components/pages/Mypage/TipBox/TipBox.module.css";
import { useState } from "react";
import { MdAutoAwesome } from "react-icons/md";

export interface Tip {
  id: number;
  content: string;
}
const mockData: Tip[] = [
  {
    id: 1,
    content:
      "관광지 바로 앞 식당보다 골목 안쪽을 찾아보세요. 네이버 리뷰 평점 4.5 이상이면 실패 확률이 낮아요. 공항 근처 업체는 가격 변동이 커요.",
  },
  {
    id: 2,
    content:
      "애월 쪽 카페는 오후에 사람이 많아요. 오전 10시 이전에 가는 걸 추천합니다. 공항 근처 업체는 가격 변동이 커요. 최소 2주 전에 예약하면 저렴합니다. ",
  },
  {
    id: 3,
    content: "실내 관광지 위주로 이동하세요.  ",
  },
  {
    id: 4,
    content:
      "공항 근처 업체는 가격 변동이 커요. 최소 2주 전에 예약하면 저렴합니다.  ",
  },
];

export default function TipBox() {
  const [randomTip] = useState<Tip>(() => {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    return mockData[randomIndex];
  });

  return (
    <div className={styles.container}>
      <MdAutoAwesome className={styles.icon} />
      <div className={styles.box}>
        <p>{randomTip.content}</p>
      </div>
    </div>
  );
}
