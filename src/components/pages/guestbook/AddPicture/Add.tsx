import styles from "@/components/pages/guestbook/AddPicture/Add.module.css";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useRef, useState, useEffect } from "react";

interface AddProps {
  onAdd: (data: { url: string; file: File }) => void;
}

export default function Add({ onAdd }: AddProps) {
  const [upload, setUpload] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedType = ["image/jpeg", "image/png"];
    if (!allowedType.includes(file.type)) {
      return alert("JPG 또는 PNG 파일만 업로드 가능합니다.");
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return alert("10MB 이하 파일만 업로드 가능합니다.");
    }

    const imgUrl = URL.createObjectURL(file);
    setUpload(imgUrl);
    onAdd({
      url: imgUrl,
      file: file,
    });
  };

  const onCircleClick = () => {
    inputRef.current?.click();
  };

  const onRemoveImage = () => {
    if (upload) {
      URL.revokeObjectURL(upload);
    }
    setUpload(null);
  };

  useEffect(() => {
    return () => {
      if (upload) {
        URL.revokeObjectURL(upload);
      }
    };
  }, [upload]);

  return (
    <div className={styles.container}>
      {upload ? (
        <>
          <img src={upload} alt="preview" className={styles.preview} />
          <IoMdClose onClick={onRemoveImage} className={styles.cancelIcon} />
        </>
      ) : (
        <div className={styles.addPicture} onClick={onCircleClick}>
          <MdAddAPhoto className={styles.icon} />
          <p className={styles.desc}>사진 추가</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}
