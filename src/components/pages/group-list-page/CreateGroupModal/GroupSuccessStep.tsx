import { FaCheck } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import styles from "./styles.module.css";

interface Props {
  createdGroupCode: string | null;
  onCopyCode: () => void;
}

export default function GroupSuccessStep({
  createdGroupCode,
  onCopyCode,
}: Props) {
  return (
    <div className={styles.successWrap}>
      <div className={styles.iconWrap}>
        <div className={styles.iconBox}>
          <FaCheck size={48} color="var(--text-white)" />
        </div>
      </div>

      <div className={styles.titleWrap}>
        <p className={styles.title}>그룹생성 완료!</p>
        <p className={styles.description}>
          초대 코드를 복사해서
          <br />
          팀원들과 함께 런케이션을 시작해보세요{" "}
        </p>
      </div>

      <div className={styles.codeContent}>
        <p className={styles.codeLabel}>초대코드</p>
        <div className={styles.codeBox}>
          <span className={styles.codeText}>{createdGroupCode ?? "—"}</span>
          <MdContentCopy
            size={24}
            color="var(--brand-primary)"
            style={{ cursor: "pointer" }}
            onClick={onCopyCode}
          />
        </div>
      </div>
    </div>
  );
}
