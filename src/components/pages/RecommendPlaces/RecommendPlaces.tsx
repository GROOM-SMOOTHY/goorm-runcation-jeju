import styles from "@/components/pages/RecommendPlaces/RecommendPlaces.module.css";
import { recommendPlaces } from "@/data/RecommendPlaces";
import type { Region } from "@/data/RecommendPlaces";

type Props = {
  region: Region;
};

export default function RecommendPlaces({ region }: Props) {
  const filtered = recommendPlaces.filter((p) => p.region === region);

  if (filtered.length === 0) return <p>추천 장소가 없어요</p>;

  return (
    <div className={styles.list}>
      {filtered.map((p) => (
        <div key={p.title} className={styles.card}>
          <img src={p.image} />
          <div className={styles.textBox}>
            <div className={styles.title}>{p.title}</div>
            <div className={styles.desc}>{p.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
