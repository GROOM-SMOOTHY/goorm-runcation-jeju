import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/StoreCard/StoreCard.module.css";
import { FaHeart } from "react-icons/fa";

export interface StoreCardProps {
  imageUrl: string;
  location: string;
  category: string;
  name: string;
  description: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({
  imageUrl,
  location,
  category,
  name,
  description,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.Card}>
      <div className={styles.ImageWrapper}>
        <img src={imageUrl} alt={name} className={styles.Image} />
        <button
          className={`${styles.FavoriteButton} ${
            isFavorite ? styles.Active : ""
          }`}
          onClick={onToggleFavorite}
        >
          <FaHeart />
        </button>
      </div>
      <div className={styles.Info}>
        <div className={styles.Tags}>
          <span className={styles.Location}>{location}</span>
          <span className={styles.Category}>{category}</span>
        </div>
        <h3 className={styles.Name}>{name}</h3>
        <p className={styles.Description}>{description}</p>
      </div>
    </div>
  );
};

export default StoreCard;
