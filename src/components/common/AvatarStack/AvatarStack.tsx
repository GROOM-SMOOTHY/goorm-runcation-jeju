import styles from "./AvatarStack.module.css";

export type AvatarStackSize = "sm" | "md" | "lg";

export interface AvatarStackProps {
  avatars: string[];
  totalCount: number;
  visibleCount?: number;
  size?: AvatarStackSize;
}

const SIZE_OFFSET = {
  sm: 14,
  md: 18,
  lg: 24,
} as const;

export default function AvatarStack({
  avatars,
  totalCount,
  visibleCount = 2,
  size = "md",
}: AvatarStackProps) {
  const shownAvatars = avatars.slice(0, visibleCount);
  const remainingCount = totalCount - shownAvatars.length;
  const offset = SIZE_OFFSET[size];

  return (
    <div className={styles.stack} data-size={size}>
      {shownAvatars.map((src, i) => (
        <img
          key={`${i}-${src}`}
          src={src}
          alt=""
          className={styles.avatar}
          style={{ left: `${i * offset}px`, zIndex: i + 1 }}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={styles.more}
          style={{
            left: `${shownAvatars.length * offset}px`,
            zIndex: shownAvatars.length + 1,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
