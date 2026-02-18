import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./GroupCodeDisplay.module.css";

interface Props {
    code: string;
}

export default function GruopCodeDisplay({ code }: Props) {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        // TODO: toast로 수정 필요
        alert("코드가 복사되었습니다.");
    };

    return (
        <div className={styles.container} onClick={handleCopy}>
            <p className={styles.code}>{code}</p>
            <MdOutlineContentCopy className={styles.copyIcon} size={12} />
        </div>
    );
}