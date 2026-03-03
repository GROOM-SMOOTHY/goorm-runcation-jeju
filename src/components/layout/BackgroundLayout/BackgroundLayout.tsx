import { Outlet } from "react-router-dom";
import styles from "./BackgroundLayout.module.css";
import { MdGroups } from "react-icons/md";
import { BiMapPin } from "react-icons/bi";
import { BiWallet } from "react-icons/bi";

const descriptionList = [
  {
    icon: <MdGroups size={28} color="#FF8800" />,
    title: "방명록",
    description: "제주도 런케이션에서 기억에 남는 장소를 공유해줘요",
  },
  {
    icon: <BiMapPin size={28} color="#FF8800" />,
    title: "도장깨기",
    description: "제주도 지역명소를 도장깨기 해요",
  },
  {
    icon: <BiWallet size={28} color="#FF8800" />,
    title: "정산",
    description: "제주도에서의 경비를 손쉽게 정산할 수 있게 도와줘요",
  },
];

const BackgroundLayout = () => {
  return (
    <div className={styles.background}>
      {/* 소개 섹션 */}
      <div className={styles.about}>
        <h2 className={styles.title}>SMOOTHY</h2>
        <h1 className={styles.subtitle}>
          제주 런케이션,
          <br />
          <span className={styles.highlight}>즐겁고 알차게</span>
        </h1>

        <div className={styles.hr} />

        <div className={styles.descriptionList}>
          {descriptionList.map((item) => (
            <div key={item.title} className={styles.descriptionItem}>
              <div className={styles.descriptionIcon}>{item.icon}</div>
              <div className={styles.descriptionContent}>
                <p className={styles.descriptionTitle}>{item.title}</p>
                <span className={styles.descriptionDescription}>
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outlet 렌더링 영역 */}
      <div className={styles.frame}>
        <Outlet />
      </div>
    </div>
  );
};

export default BackgroundLayout;
