import styles from "@/components/TypeBadge/typeBadge.module.css";

interface TypeBadgeProps {
  process: string[];
  generation: string;
}

export default function TypeBadge({ process, generation }: TypeBadgeProps) {
  return (
    <div className={styles.container}>
      {process.map((item, index) => (
        <div
          key={index}
          className={`${styles.badge} ${styles[item.toLowerCase()]}`}
        >
          {item}
        </div>
      ))}

      <div className={`${styles.badge} ${styles.generation}`}>
        {generation}기
      </div>
    </div>
  );
}
