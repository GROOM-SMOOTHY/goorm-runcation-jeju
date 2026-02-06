import { Outlet } from "react-router-dom";
import styles from "./BackgroundLayout.module.css";

const BackgroundLayout = () => {
  return (
    <div className={styles.background}>
      <div className={styles.frame}>
        <Outlet />
      </div>
    </div>
  );
};

export default BackgroundLayout;
