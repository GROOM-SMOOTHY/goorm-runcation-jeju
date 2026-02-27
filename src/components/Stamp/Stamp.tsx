import styles from "@/components/Stamp/stamp.module.css";
import { format } from "date-fns/format";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const isActive = status === "active";

  const handleClickStamp = () => {
    if (!isActive) {
      navigate(`/stamp/add?region=${region}`);
    }
  };

  return (
    <div className={styles.wrapper} onClick={handleClickStamp}>
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

      {isActive && date && (
        <p className={styles.date}>{format(new Date(date), "yyyy.MM.dd")}</p>
      )}
    </div>
  );
}
