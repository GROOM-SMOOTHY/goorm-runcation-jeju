import styles from "./bottomNavigation.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

export default function ButtonNavigation() {
  return (
    <nav className={styles.buttonNavigation}>
      <button type="button" className={`${styles.navItem} ${styles.home}`}>
        <AiOutlineHome size={20} />
        <span>홈</span>
      </button>
      <button type="button" className={styles.navItem}>
        <BiMapPin size={20} />
        <span>도장깨기</span>
      </button>
      <button type="button" className={`${styles.navItem} ${styles.payment}`}>
        <MdOutlinePayments size={32} />
      </button>
      <button type="button" className={styles.navItem}>
        <BiWallet size={20} />
        <span>정산현황</span>
      </button>
      <button type="button" className={styles.navItem}>
        <BsPerson size={20} />
        <span>마이</span>
      </button>
    </nav>
  );
}
