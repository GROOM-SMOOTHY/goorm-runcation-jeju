import { CiCirclePlus } from "react-icons/ci";
import { FaRegCompass } from "react-icons/fa";
import styles from "./GroupCardButton.module.css";

export type GroupCardButtonType = "create" | "join";

export interface GroupCardButtonProps {
    type: GroupCardButtonType;
    onClick: () => void;
    label: string;
    title: string;
}

const ICON_SIZE = 28;
const ICON_STYLE = { color: "var(--brand-primary)" };

export default function GroupCardButton({
    type,
    onClick,
    label,
    title,
}: GroupCardButtonProps) {
    const isCreate = type === "create";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.container} ${styles[type]}`}
            aria-label={title}
        >
            <div className={`${styles.iconBox} ${styles[type]}`}>
                {isCreate ? (
                    <CiCirclePlus size={ICON_SIZE} strokeWidth={1} style={ICON_STYLE} />
                ) : (
                    <FaRegCompass size={ICON_SIZE} style={ICON_STYLE} />
                )}
            </div>
            <div className={styles.content}>
                <p className={styles.label}>{label}</p>
                <p className={`${styles.title} ${styles[type]}`}>{title}</p>
            </div>
        </button>
    );
}