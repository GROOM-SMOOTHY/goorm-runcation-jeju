import type { CourseTypeKey } from "../TypeBadge/TypeBadge";
import TypeBadge from "../TypeBadge/TypeBadge";
import AvatarStack from "../AvatarStack";
import styles from "./GroupCard.module.css";

interface Props {
  course: CourseTypeKey;
  generation: string;
  participantsCount: number;
  title: string;
  description: string;
  avatars: string[];
}

export default function GroupCard({
  course,
  generation,
  participantsCount,
  title,
  description,
  avatars,
}: Props) {
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <div className={styles.badges}>
          <TypeBadge course={course} generation={generation} />
          <TypeBadge course="DEFAULT" generation={generation} />
        </div>
        <span className={styles.participants}>{participantsCount}명</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.footer}>
        <AvatarStack avatars={avatars} totalCount={participantsCount} />
      </div>
    </div>
  );
}