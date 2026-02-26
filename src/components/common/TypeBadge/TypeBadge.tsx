import type { Database } from "@/types/supabase";
import styles from "./typeBadge.module.css";

export interface TypeBadgeProps {
  course: Database["public"]["Enums"]["course_type"] | "DEFAULT";
  generation?: string | number;
}

export default function TypeBadge({ course, generation = "" }: TypeBadgeProps) {
  const isGeneration = course === "DEFAULT";

  return (
    <div className={styles.container}>
      {!isGeneration && (
        <div className={`${styles.badge} ${styles[course.toLowerCase()]}`}>
          {course}
        </div>
      )}

      {isGeneration && (
        <div className={`${styles.badge} ${styles.generation}`}>
          {generation}기
        </div>
      )}
    </div>
  );
}
