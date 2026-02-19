import styles from "./GuestBookCard.module.css";

export interface GuestBookCardProps {
    /** 작성자 이름 (예: 김나영님) */
    title: string;
    description: string;
    image: string;
    course: string;
    generation: number;
}

export default function GuestBookCard({
    title,
    description,
    image,
    course,
    generation,
}: GuestBookCardProps) {
    return (
        <div className={styles.container}>
            <img src={image} alt="" className={styles.image} />
            <div className={styles.contentBox}>
                <div className={styles.titleBox}>
                    <h3 className={styles.title}>{title}</h3>
                    <span className={styles.typeBadge}>
                        {course} {generation}기
                    </span>
                </div>
                <p className={styles.description}>{description}</p>
            </div>
        </div >
    );
}   
