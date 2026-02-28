import { getGuestBookList, type GuestBook } from "@/services/guestBookService";
import { useEffect, useState } from "react";

export default function useGuestList() {
  const [guestBookList, setGuestBookList] = useState<GuestBook[]>([]);

  useEffect(() => {
    getGuestBookList().then((data) => {
      setGuestBookList(data);
    });
  }, []);

  return { guestBookList };
}
