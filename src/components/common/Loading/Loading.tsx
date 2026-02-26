import React from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
}) => {
  return (
    <div className={`${styles.wrapper} ${fullScreen ? styles.full : ""}`}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loading;