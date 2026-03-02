import { MdKeyboardArrowRight } from "react-icons/md";
import styles from "./JoinCourseItem.module.css";
import type { Database, Tables } from "@/types/supabase";
import { getCourseName } from "@/utils/course";
import AvatarStack from "@/components/common/AvatarStack";
import DefaultAvatar from "@/assets/default-avatar.png";

const COURSE_BG_COLOR: Record<
  Database["public"]["Enums"]["course_type"] | "DEFAULT",
  string
> = {
  FRONTEND: "var(--badge-bg-orange)",
  BACKEND: "var(--badge-bg-blue)",
  DESIGN: "var(--badge-bg-purple)",
  DEFAULT: "var(--bg-select)",
};

const COURSE_LABEL_COLOR: Record<
  Database["public"]["Enums"]["course_type"] | "DEFAULT",
  string
> = {
  FRONTEND: "var(--badge-label-orange)",
  BACKEND: "var(--badge-label-blue)",
  DESIGN: "var(--badge-label-purple)",
  DEFAULT: "var(--text-secondary)",
};

export interface JoinCourseItemProps {
  course: Database["public"]["Enums"]["course_type"] | null;
  participants: number;
  generation: number;
  members: (Tables<"group_members"> & { user: Tables<"users"> })[];
  onClick: () => void;
}

function handleKeyDown(e: React.KeyboardEvent, onClick: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick();
  }
}

export default function JoinCourseItem({
  course,
  participants,
  generation,
  members,
  onClick,
}: JoinCourseItemProps) {
  return (
    <div
      className={styles.container}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      aria-label={`${course ? getCourseName(course) : "기타"} ${generation}기, ${participants}명 참여중`}
    >
      <div className={styles.content}>
        <div
          className={styles.courseBadge}
          style={{ backgroundColor: COURSE_BG_COLOR[course ?? "DEFAULT"] }}
        >
          <span
            className={styles.courseBadgeLabel}
            style={{ color: COURSE_LABEL_COLOR[course ?? "DEFAULT"] }}
          >
            {generation}기
          </span>
        </div>
        <div className={styles.courseInfo}>
          <span className={styles.courseType}>
            {course ? getCourseName(course) : "기타"} {generation}기
          </span>
          <span className={styles.participants}>{participants}명 참여중</span>
          <AvatarStack
            avatars={members.map(
              (member) => member.user.profile ?? DefaultAvatar,
            )}
            totalCount={members.length}
            visibleCount={2}
            size="sm"
          />
        </div>
      </div>
      <MdKeyboardArrowRight
        size={24}
        style={{ color: "var(--text-tertiary)" }}
      />
    </div>
  );
}
