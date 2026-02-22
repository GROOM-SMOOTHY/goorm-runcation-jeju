import { PiCarFill, PiDotsThreeCircleFill, PiForkKnifeFill } from "react-icons/pi";
import styles from "./PayCategory.module.css";
import { FaCoffee } from "react-icons/fa";

const CATEGORIES = [
    {
        label: '식비',
        value: 'food',
        icon: (isSelected?: boolean) => <PiForkKnifeFill size={24} color={isSelected ? 'var(--brand-primary)' : 'var(--text-tertiary)'} />
    },
    {
        label: '교통',
        value: 'transportation',
        icon: (isSelected?: boolean) => <PiCarFill size={24} color={isSelected ? 'var(--brand-primary)' : 'var(--text-tertiary)'} />
    },
    {
        label: '카페',
        value: 'cafe',
        icon: (isSelected?: boolean) => <FaCoffee size={24} color={isSelected ? 'var(--brand-primary)' : 'var(--text-tertiary)'} />
    },
    {
        label: '기타',
        value: 'etc',
        icon: (isSelected?: boolean) => <PiDotsThreeCircleFill size={24} color={isSelected ? 'var(--brand-primary)' : 'var(--text-tertiary)'} />
    }
]

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function PayCategory({ value, onChange }: Props) {
    return (
        <div className={styles.container}>
            <span className={styles.label}>카테고리</span>
            <div className={styles.categories}>
                {CATEGORIES.map((category) => (
                    <button key={category.value} className={`${styles.category} ${value === category.value ? styles.selected : ''}`} onClick={() => onChange(category.value)}>
                        {category.icon(value === category.value)}
                        <span className={styles.categoryLabel}>{category.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}   