import React from "react";
import styles from "./Empty.module.css";

export interface EmptyProps {
  title: string;
  description?: string;
  minHeight?: string | number;
}

const Empty: React.FC<EmptyProps> = ({ title, description, minHeight = "300px" }) => {
  return (
    <div className={styles.Container} style={{ minHeight }}>
      <div className={styles.TextWrapper}>
        <h3 className={styles.Title}>{title}</h3>
        {description && <p className={styles.Description}>{description}</p>}
      </div>
    </div>
  );
};

export default Empty;