import styles from "./PayHistoryCard.module.css";

interface Props {
    imgUrl: string;
    title: string;
    date: string;
    userName: string;
    price: number;
    myPrice?: number;
    /** "정산 진행 중" 등 상태 문구 (있으면 내 정산 금액 대신 표시) */
    status?: string;
}
export default function PayHistoryCard({ imgUrl, title, date, userName, price, myPrice, status }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.leftWrap}>
                <img src={imgUrl} alt={title} />
                <div className={styles.titleWrap}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.date}>{date} · {userName} 결제</span>
                </div>
            </div>
            <div className={styles.rightWrap}>
                {status ? (
                    <span className={styles.status}>{status}</span>
                ) : myPrice != null ? (
                    <span className={styles.myPrice}>내 정산 금액 ₩{myPrice.toLocaleString()}</span>
                ) : null}
                <span className={styles.price}>₩{price.toLocaleString()}</span>
            </div>
        </div>
    );
}