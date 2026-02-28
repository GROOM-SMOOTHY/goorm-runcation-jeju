import styles from "@/components/pages/Stamp/AddStampPicture/AddStampPicture.module.css";
import { PiCameraPlusBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { useRef, useEffect } from "react";

export interface AddPhoto {
  url: string | null;
  file: File;
}
interface AddStampPictureProps {
  upload: string | null;
  onChangeUpload: (url: AddPhoto | null) => void;
}

export default function AddStampPicture({
  upload,
  onChangeUpload,
}: AddStampPictureProps) {
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
    onChangeUpload({
      url: imgUrl,
      file,
    });
  };

  const onCircleClick = () => {
    inputRef.current?.click();
  };

  const onRemoveImage = () => {
    if (upload) {
      URL.revokeObjectURL(upload);
    }

    onChangeUpload(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (upload) {
        URL.revokeObjectURL(upload);
      }
    };
  }, [upload]);

  return (
    <div className={styles.container} onClick={onCircleClick}>
      <div className={styles.column}>
        {upload ? (
          <div className={styles.imageContainer}>
            <img src={upload} alt="preview" className={styles.preview} />
            <IoMdClose onClick={onRemoveImage} className={styles.cancelIcon} />
          </div>
        ) : (
          <div className={styles.circle}>
            <div className={styles.icon}>
              <PiCameraPlusBold />
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: "none" }}
        />

        <div className={styles.textGroup}>
          <p className={styles.title}>오늘의 추억 사진을 등록해주세요</p>
          <p className={styles.desc}>최대 10MB, JPG/PNG</p>
        </div>
      </div>
    </div>
  );
}
