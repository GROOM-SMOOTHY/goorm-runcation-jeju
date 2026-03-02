import styles from "@/components/pages/guestbook/AddPicture/Add.module.css";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";
import { useToastStore } from "@/components/common/Toast/ToastStore";

interface AddFile {
  url: string;
  file: File;
}
interface AddProps {
  onAdd: (data: AddFile) => void;
}

export default function Add({ onAdd }: AddProps) {
  const [upload, setUpload] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addToast = useToastStore((state) => state.addToast);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedType = ["image/jpeg", "image/png"];
    if (!allowedType.includes(file.type)) {
      return addToast("JPG 또는 PNG 파일만 업로드 가능합니다.", "warning");
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return addToast("10MB 이하 파일만 업로드 가능합니다.", "warning");
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

  return (
    <div className={styles.container}>
      {upload ? (
        <>
          <img src={upload} alt="preview" className={styles.preview} />
          <IoMdClose className={styles.cancelIcon} />
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
