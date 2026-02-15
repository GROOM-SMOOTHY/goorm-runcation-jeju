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
  const labels = ["주소", "연락처", "영업시간"];
  const texts = [address, contact, hours];

  // 텍스트 복사 핸들러
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast("복사되었습니다", "", "success");
    } catch {
      addToast("복사에 실패했습니다", "", "error");
    }
   };

  return (
    <div className={styles.card}>
      {texts.map((text, index) => (
        <div key={index} className={styles.item}>
          {/* 아이콘 원형 */}
          <span className={`${styles.iconWrapper} ${iconConfig[index].className}`}>
            {iconConfig[index].icon}
          </span>

          {/* 라벨 + 텍스트 */}
          <div className={styles.textWrapper}>
            <div className={styles.label}>{labels[index]}</div>
            <span className={styles.text} title={text}>
              {text}
            </span>
          </div>

          {/* 주소와 연락처만 복사 버튼 */}
          {index !== 2 && (
            <button
              type="button"
              className={styles.copyButton}
              onClick={() => handleCopy(text)}
            >
              <MdContentCopy size={18} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default StoreInfoCard;
