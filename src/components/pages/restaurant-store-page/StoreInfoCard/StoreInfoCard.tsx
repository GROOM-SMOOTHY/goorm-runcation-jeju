import React from "react";
import { MdLocationOn, MdPhone, MdAccessTime, MdContentCopy } from "react-icons/md";
import styles from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard.module.css";
import { useToastStore } from "@/components/common/Toast/ToastStore";

interface StoreInfoCardProps {
  address: string;
  contact: string;
  hours: string;
}
// 아이콘과 클래스 매핑
const iconConfig = [
  { icon: <MdLocationOn />, className: styles["icon-location"] },
  { icon: <MdPhone />, className: styles["icon-phone"] },
  { icon: <MdAccessTime />, className: styles["icon-hours"] },
];


const StoreInfoCard: React.FC<StoreInfoCardProps> = ({ address, contact, hours }) => {
  const addToast = useToastStore((state) => state.addToast);

  // 텍스트 복사 핸들러
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast("복사되었습니다", "", "success");
  };

  const texts = [address, contact, hours];

  return (
    <div className={styles.card}>
      {texts.map((text, index) => (
        <div key={index} className={styles.item}>

          <span className={`${styles.iconWrapper} ${iconConfig[index].className}`}>
            {iconConfig[index].icon}
          </span>

          <span className={styles.text} title={text}>{text}</span>

          <button type="button" className={styles.copyButton} onClick={() => handleCopy(text)}>
            <MdContentCopy size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default StoreInfoCard;
