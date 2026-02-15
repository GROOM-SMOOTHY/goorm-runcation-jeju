import styles from "@/components/Stamp/stamp.module.css";
import { MdLock } from "react-icons/md";

interface StampProps {
  region?: string;
  imgUrl?: string;
  date?: string;
  status?: "active" | "locked";
}

export default function Stamp({
  region,
  imgUrl,
  date,
  status = "locked",
}: StampProps) {
  const isActive = status === "active";

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${!isActive ? styles.locked : ""}`}>
        <div className={styles.circle}>
          {isActive && imgUrl && (
            <img src={imgUrl} alt="uploaded" className={styles.image} />
          )}
          {!isActive && <MdLock className={styles.lockIcon} />}
        </div>
      </div>

      {region && (
        <p
          className={`${styles.region} ${isActive ? styles.activeText : styles.inactiveText}`}
        >
          {region}
        </p>
      )}

      {isActive && date && <p className={styles.date}>{date}</p>}
    </div>
  );
}
