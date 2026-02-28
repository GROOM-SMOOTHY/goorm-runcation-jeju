import styles from "@/pages/GuestBook/GuestBook.module.css";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import Button from "@/components/common/Button/Button";
import AddPicture from "@/components/pages/guestbook/AddPicture/AddPicture";

import { useState } from "react";

export default function GuestBook() {
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const onAdd = (url: string) => {
    if (images.length >= 4) return;
    setImages((prev) => [...prev, url]);
  };
  const onRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onClick = () => {
    if (images.length === 0) {
      alert("사진을 최소 1장 이상 첨부해주세요");
      return;
    }

    if (content.trim() === "") {
      alert("내용을 입력해주세요");
      return;
    }

    alert("방명록이 등록되었습니다");
  };

  return (
    <div className={styles.container}>
      <Header title="방명록" />
      <div className={styles.box}>
        <div className={styles.desc}>
          <textarea
            value={content}
            rows={8}
            onChange={(e) => setContent(e.target.value)}
            placeholder="제주 런케이션은 어땠나요?"
            className={styles.textarea}
          />
        </div>
        <div className={styles.picture}>
          <AddPicture images={images} onAdd={onAdd} onRemove={onRemove} />
        </div>
        <div className={styles.button}>
          <Button type="button" onClick={onClick}>
            방명록 등록하기
          </Button>
        </div>
      </div>
      <div className={styles.botNav}>
        <BottomNavigation />
      </div>
    </div>
  );
}
