import { getCourseName } from "@/utils/course";
import styles from "./GuestBookCard.module.css";
import type { Database } from "@/types/supabase";

export interface GuestBookCardProps {
  /** 작성자 이름 (예: 김나영님) */
  name: string;
  description: string;
  image: string;
  course: Database["public"]["Enums"]["course_type"];
  generation: number;
}

export default function GuestBookCard({
  name,
  description,
  image,
  course,
  generation,
}: GuestBookCardProps) {
  return (
    <div className={styles.container}>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.contentBox}>
        <div className={styles.titleBox}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.typeBadge}>
            {getCourseName(course)} {generation}기
          </span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
