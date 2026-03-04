import { Link } from "react-router-dom";
import GuestBookCard from "../GuestBookCard";
import styles from "./styles.module.css";
import useGuestList from "./useGuestList";
import { useHorizontalScrollDrag } from "@/hooks/useHorizontalScrollDrag";

export default function GuestBookList() {
  const { guestBookList } = useGuestList();
  const { containerProps, didDragRef } = useHorizontalScrollDrag();

  return (
    <div className={styles.guestbookContainer}>
      <div className={styles.header}>
        <span className={styles.label}>방명록</span>
        <Link to="/guestbook" className={styles.writeButton}>
          작성하기
        </Link>
      </div>
      <div className={styles.guestbookList} {...containerProps}>
        {guestBookList.map((guestBook) => (
          <Link
            key={guestBook.id}
            to={`/guestbook/${guestBook.id}`}
            className={styles.cardLink}
            onClick={(e) => {
              if (didDragRef.current) e.preventDefault();
            }}
          >
            <GuestBookCard
              name={guestBook.author?.nickname ?? ""}
              description={guestBook.content}
              image={guestBook.photo?.image_url ?? ""}
              course={guestBook.group?.course ?? "FRONTEND"}
              generation={guestBook.group?.batch ?? 0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
