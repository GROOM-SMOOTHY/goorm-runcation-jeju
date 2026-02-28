import styles from "@/components/pages/guestbook/AddPicture/AddPicture.module.css";
import Add from "@/components/pages/guestbook/AddPicture/Add";
import { IoMdClose } from "react-icons/io";

interface AddPictureProps {
  images: string[];
  onAdd: (data: { url: string; file: File }) => void;
  onRemove: (index: number) => void;
}

export default function AddPicture({
  images,
  onAdd,
  onRemove,
}: AddPictureProps) {
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
                    onClick={() => onRemove(slotIndex)}
                  />
                </div>
              );
            }

            if (slotIndex === images.length) {
              return (
                <div key={slotIndex} className={styles.imageBox}>
                  <Add onAdd={onAdd} />
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
