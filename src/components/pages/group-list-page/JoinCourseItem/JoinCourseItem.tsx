import { MdKeyboardArrowRight } from "react-icons/md";
import type { CourseTypeKey } from "@/components/common/TypeBadge/TypeBadge";
import styles from "./JoinCourseItem.module.css";

const COURSE_LABEL: Record<CourseTypeKey, string> = {
  FRONTEND: "프론트",
  BACKEND: "백엔드",
  DESIGN: "디자인",
  DEFAULT: "기타",
};

const COURSE_BG_COLOR: Record<CourseTypeKey, string> = {
  FRONTEND: "var(--badge-bg-orange)",
  BACKEND: "var(--badge-bg-blue)",
  DESIGN: "var(--badge-bg-purple)",
  DEFAULT: "var(--bg-select)",
};

const COURSE_LABEL_COLOR: Record<CourseTypeKey, string> = {
  FRONTEND: "var(--badge-label-orange)",
  BACKEND: "var(--badge-label-blue)",
  DESIGN: "var(--badge-label-purple)",
  DEFAULT: "var(--text-secondary)",
};

export interface JoinCourseItemProps {
  title: CourseTypeKey;
  participants: number;
  generation: number;
  onClick: () => void;
}

function handleKeyDown(e: React.KeyboardEvent, onClick: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick();
  }
}

export default function JoinCourseItem({
  title,
  participants,
  generation,
  onClick,
}: JoinCourseItemProps) {
  return (
    <div
      className={styles.container}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      aria-label={`${COURSE_LABEL[title]} ${generation}기, ${participants}명 참여중`}
    >
      <div className={styles.content}>
        <div
          className={styles.courseBadge}
          style={{ backgroundColor: COURSE_BG_COLOR[title] }}
        >
          <span
            className={styles.courseBadgeLabel}
            style={{ color: COURSE_LABEL_COLOR[title] }}
          >
            {generation}기
          </span>
        </div>
        <div className={styles.courseInfo}>
          <span className={styles.courseType}>
            {COURSE_LABEL[title]} {generation}기
          </span>
          <span className={styles.participants}>{participants}명 참여중</span>
        </div>
      </div>
      <MdKeyboardArrowRight size={24} style={{ color: "var(--text-tertiary)" }} />
    </div>
  );
}