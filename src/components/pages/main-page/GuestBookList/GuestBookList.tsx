import { Link } from "react-router-dom";
import GuestBookCard from "../GuestBookCard";
import styles from "./styles.module.css";
import useGuestList from "./useGuestList";

export default function GuestBookList() {
  const { guestBookList } = useGuestList();

  return (
    <div className={styles.guestbookContainer}>
      <div className={styles.header}>
        <span className={styles.label}>방명록</span>
        <Link to="/guestbook" className={styles.writeButton}>
          작성하기
        </Link>
      </div>
      <div className={styles.guestbookList}>
        {guestBookList.map((guestBook) => (
          <GuestBookCard
            key={guestBook.id}
            name={guestBook.author.nickname ?? ""}
            description={guestBook.content}
            image={guestBook.photo?.image_url ?? ""}
            course={guestBook.group?.course ?? "FRONTEND"}
            generation={guestBook.group?.batch ?? 0}
          />
        ))}{" "}
      </div>
    </div>
  );
}
