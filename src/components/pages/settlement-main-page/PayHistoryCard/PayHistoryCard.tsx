import styles from "./PayHistoryCard.module.css";

interface Props {
    imgUrl: string;
    title: string
    date: string
    userName: string
    price: number
    myPrice: number
}
export default function PayHistoryCard({ imgUrl, title, date, userName, price, myPrice }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.leftWrap}>
                <img src={imgUrl} alt={title} />
                <div className={styles.titleWrap}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.date}>{date} • {userName}</span>
                </div>
            </div>
            <div className={styles.rightWrap}>
                <span className={styles.myPrice}>내 정산 금액: ₩{myPrice.toLocaleString()} </span>
                <span className={styles.price}>₩{price.toLocaleString()}</span>
            </div>
        </div>
    );
}