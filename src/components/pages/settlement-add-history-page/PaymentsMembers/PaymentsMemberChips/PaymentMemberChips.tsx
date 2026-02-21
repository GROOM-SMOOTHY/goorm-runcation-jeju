import { IoClose } from "react-icons/io5";
import styles from "./PaymentsMemberChips.module.css";

interface Props {
    profileSrc: string;
    name: string;
    onClose: () => void;
}
export default function PaymentMemberChips({ profileSrc, name, onClose }: Props) {
    return (
        <div className={styles.container}>
            <img src={profileSrc} alt={name} />
            <span className={styles.name}>{name}</span>
            <IoClose size={14} className={styles.close} onClick={onClose} />
        </div>
    );
}