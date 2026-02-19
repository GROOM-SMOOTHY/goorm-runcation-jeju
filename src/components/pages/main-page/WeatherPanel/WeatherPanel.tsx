import { MdSunny } from "react-icons/md";
import styles from "./WeatherPanel.module.css";

interface Props {
    degree: number;
    weather: string;
}

export default function WeatherPanel({ degree, weather }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <MdSunny size={20} style={{ color: "var(--badge-label-blue)" }} />
            </div>
            <div className={styles.content}>
                <span className={styles.title}>JEJU CITY</span>
                <span className={styles.description}>{degree}°C {weather}</span>
            </div>
        </div>
    );
}
