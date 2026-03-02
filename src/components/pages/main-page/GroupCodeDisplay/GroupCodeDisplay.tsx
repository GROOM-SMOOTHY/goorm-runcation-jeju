import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./GroupCodeDisplay.module.css";
import { useToastStore } from "@/components/common/Toast/ToastStore";

interface Props {
  code: string;
}

export default function GruopCodeDisplay({ code }: Props) {
  const addToast = useToastStore((state) => state.addToast);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    addToast("코드가 복사되었습니다.", "success");
  };

  return (
    <div className={styles.container} onClick={handleCopy}>
      <p className={styles.code}>{code}</p>
      <MdOutlineContentCopy className={styles.copyIcon} size={12} />
    </div>
  );
}
