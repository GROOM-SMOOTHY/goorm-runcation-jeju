import Button from "@/components/common/Button/Button";
import Textarea from "@/components/common/Textarea/Textarea";
import Header from "@/components/layout/Header/Header";
import AddStampPicture from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";
import styles from "./styles.module.css";
import { useState } from "react";

export default function AddStampPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  return (
    <>
      <Header title="도장깨기" />

      <div className={styles.container}>
        <div className={styles.field}>
          <p className={styles.label}>포토로그</p>
          <AddStampPicture upload={photo} onChangeUpload={setPhoto} />
        </div>
        <div className={styles.field}>
          <p className={styles.label}>한 줄 기록</p>
          <Textarea
            value={description}
            onChange={setDescription}
            placeholder="한 줄 기록을 입력해주세요"
          />
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <Button>도장찍기</Button>
      </div>
    </>
  );
}
