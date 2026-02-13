import styles from "@/components/TypeBadge/typeBadge.module.css";

export const CourseType = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  DESIGN: "design",
  DEFAULT: "default",
};


interface TypeBadgeProps {
  course: keyof typeof CourseType;
  generation?: string;
}

export default function TypeBadge({ course, generation }: TypeBadgeProps) {
  return (
    <div className={styles.container}>
      {course !== "DEFAULT" && CourseType[course] && (
        <div className={`${styles.badge} ${styles[CourseType[course]]}`}>
          {CourseType[course].toUpperCase()}
        </div>
      )}

      {course === "DEFAULT" && (
        <div className={`${styles.badge} ${styles.generation}`}>
          {generation}기
        </div>
      )}
    </div>
  );
}
