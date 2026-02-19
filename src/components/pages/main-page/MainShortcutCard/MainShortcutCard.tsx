import styles from "./MainShortcutCard.module.css";
import { HiCash } from "react-icons/hi";
import { ImSpoonKnife } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type MainShortcutCardType = "store" | "settlement";

const CARD_ICONS = {
    store: <ImSpoonKnife size={24} style={{ color: "var(--badge-label-emerald)" }} />,
    settlement: <HiCash size={24} style={{ color: "var(--badge-label-orange)" }} />,
};

const ICON_COLORS = {
    store: {
        color: "var(--badge-label-emerald)",
        backgroundColor: "var(--badge-bg-emerald)",
    },
    settlement: {
        color: "var(--badge-label-orange)",
        backgroundColor: "var(--badge-bg-orange)",
    },
}

interface Props {
    type: MainShortcutCardType;
    title: string | React.ReactNode;
    onClick: () => void;
}

export default function MainShortcutCard({ type, title, onClick }: Props) {
    return (
        <button className={styles.container} onClick={onClick}>
            <div className={styles.titleBox}>
                <div className={styles.iconBox} style={{ backgroundColor: ICON_COLORS[type].backgroundColor }}>
                    {CARD_ICONS[type]}
                </div>
                <span className={styles.titleText}>{title}</span>
            </div>
            <div className={styles.arrowBox}>
                <span className={styles.arrowText}>바로가기</span>
                <MdOutlineKeyboardArrowRight size={12} style={{ color: "var(--text-tertiary)" }} />
            </div>
        </button>
    );
}