import { CiCirclePlus } from "react-icons/ci";
import styles from "./GroupCardButton.module.css";
import { FaRegCompass } from "react-icons/fa";

interface Props {
    type: 'create' | 'join';
    onClick: () => void;
    label: string;
    title: string;
}


const iconStyle = {
    color: "var(--brand-primary)",
}

const ICON_SIZE = 28;

export default function GroupCardButton({ type, onClick, label, title }: Props) {
    const isCreate = type === "create";

    return (
        <button onClick={onClick} className={`${styles.container} ${styles[type]}`}>
            <div className={`${styles.iconBox} ${styles[type]}`}>
                {isCreate ?
                    <CiCirclePlus size={ICON_SIZE} strokeWidth={1} style={iconStyle} /> :
                    <FaRegCompass size={ICON_SIZE} style={iconStyle} />
                }
            </div>

            <div className={styles.content}>
                <p className={styles.label}>{label}</p>
                <p className={`${styles.title} ${styles[type]}`}>{title}</p>
            </div>
        </button>
    )
}