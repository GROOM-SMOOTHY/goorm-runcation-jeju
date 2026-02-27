import Button from "@/components/common/Button/Button";
import Textarea from "@/components/common/Textarea/Textarea";
import Header from "@/components/layout/Header/Header";
import AddStampPicture from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";
import styles from "./styles.module.css";
import useAddStamp from "./hooks/useAddStamp";
import { useNavigate } from "react-router-dom";

export default function AddStampPage() {
  const navigate = useNavigate();

  const {
    region,
    photo,
    description,
    handlePhotoChange,
    setDescription,
    handleAddStamp,
  } = useAddStamp();

  return (
    <>
      <Header
        title={`${region || "지역"} 도장깨기`}
        onBack={() => navigate(-1)}
      />

      <div className={styles.container}>
        <div className={styles.field}>
          <p className={styles.label}>포토로그</p>
          <AddStampPicture
            upload={photo?.url || null}
            onChangeUpload={handlePhotoChange}
          />
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
        <Button disabled={!photo || !description} onClick={handleAddStamp}>
          도장찍기
        </Button>
      </div>
    </>
  );
}
