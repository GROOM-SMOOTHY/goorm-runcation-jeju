import styles from "@/components/pages/guestbook/AddPicture/AddPicture.module.css";
import Add from "@/components/pages/guestbook/AddPicture/Add";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function AddPicture() {
  const [images, setImages] = useState<string[]>([]);

  const handleAdd = (url: string) => {
    if (images.length >= 4) {
      return alert("최대 4개까지만 업로드 가능합니다!");
    }
    setImages((prev) => [...prev, url]);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.content}>
          <p className={styles.left}>사진 첨부</p>
          <p className={styles.right}>최대 4장</p>
        </div>

        <div className={styles.picture}>
          {[0, 1, 2, 3].map((slotIndex) => {
            const image = images[slotIndex];
            if (image) {
              return (
                <div key={slotIndex} className={styles.imageBox}>
                  <img src={image} alt={`upload-${slotIndex}`} />
                  <IoMdClose
                    className={styles.cancelIcon}
                    onClick={() => handleRemove(slotIndex)}
                  />
                </div>
              );
            }
            if (slotIndex === images.length) {
              return (
                <div key={slotIndex} className={styles.imageBox}>
                  <Add onAdd={handleAdd} />
                </div>
              );
            }
            return <div key={slotIndex} className={styles.imageBox} />;
          })}
        </div>
      </div>
    </div>
  );
}
