import styles from "./typeBadge.module.css";

export const CourseType = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  DESIGN: "design",
  DEFAULT: "default",
} as const;

export type CourseTypeKey = keyof typeof CourseType;

export interface TypeBadgeProps {
  course: CourseTypeKey;
  generation?: string;
}

export default function TypeBadge({ course, generation = "" }: TypeBadgeProps) {
  const isGeneration = course === "DEFAULT";

  return (
    <div className={styles.container}>
      {!isGeneration && (
        <div className={`${styles.badge} ${styles[CourseType[course]]}`}>
          {CourseType[course].toUpperCase()}
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
