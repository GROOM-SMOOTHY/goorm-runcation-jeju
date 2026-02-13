import React from "react";
import styles from "@/components/common/Group/Group.module.css";
// import TypeBadge from "@/components/TypeBadge/TypeBadge";

interface GroupProps {
  process: string[];           // ["FRONTEND"]
  generation: string;          // "12"
  participantsCount: number;   // 총 인원
  title: string;
  description: string;
  avatars: string[];
}

const Group: React.FC<GroupProps> = ({
  // process,
  // generation,
  participantsCount,
  title,
  description,
  avatars
}) => {
  const visibleCount = 3;
  const shownAvatars = avatars.slice(0, visibleCount);
  const remainingCount = participantsCount - shownAvatars.length;

  return (
    <div className={styles.group}>
      <div className={styles.header}>
        {/* <TypeBadge
          process={process}
          generation={generation}
        /> */}

        <span className={styles.participants}>
          {participantsCount}명
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.avatarGroup}>
        {shownAvatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="avatar"
            className={styles.avatar}
            style={{
              left: `${i * 18}px`,
              zIndex: i + 1
            }}
          />
        ))}

        {remainingCount > 0 && (
          <div
            className={styles.more}
            style={{
              left: `${shownAvatars.length * 18}px`,
              zIndex: shownAvatars.length + 1
            }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
