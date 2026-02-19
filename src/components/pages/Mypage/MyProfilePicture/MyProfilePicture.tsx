import styles from "@/components/pages/Mypage/MyProfilePicture/MyProfilePicture.module.css";
import { IoMdCamera } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

export default function MyProfilePicture() {
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

    const previewUrl = URL.createObjectURL(file);
    setUpload(previewUrl);
  };

  const onCircleClick = () => {
    inputRef.current?.click();
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
      <div className={styles.profile}>
        <div className={styles.circle}></div>
        {upload && (
          <img src={upload} alt="preview" className={styles.preview} />
        )}

        <div onClick={onCircleClick} className={styles.camera}>
          <IoMdCamera className={styles.icon} />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
