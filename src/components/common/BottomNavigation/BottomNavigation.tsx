import styles from "./bottomNavigation.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

export default function ButtonNavigation() {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={styles.buttonNavigation}>
      <Link
        to="/main"
        type="button"
        className={`${styles.navItem} ${isActive("/main") ? styles.active : ""}`}
      >
        <AiOutlineHome size={20} />
        <span>홈</span>
      </Link>
      <Link
        to="/stamp"
        type="button"
        className={`${styles.navItem} ${isActive("/stamp") ? styles.active : ""}`}
      >
        <BiMapPin size={20} />
        <span>도장깨기</span>
      </Link>
      <Link
        to="/settlement/add"
        type="button"
        className={`${styles.navItem} ${styles.payment} ${isActive("/settlement/add") ? styles.active : ""}`}
      >
        <MdOutlinePayments size={32} />
      </Link>
      <Link
        to="/settlement"
        type="button"
        className={`${styles.navItem} ${isActive("/settlement") ? styles.active : ""}`}
      >
        <BiWallet size={20} />
        <span>정산현황</span>
      </Link>
      <Link
        to="/mypage"
        type="button"
        className={`${styles.navItem} ${isActive("/mypage") ? styles.active : ""}`}
      >
        <BsPerson size={20} />
        <span>마이</span>
      </Link>
    </nav>
  );
}
