import React from "react";
import styles from "../styles/CategoriesCard.module.css";
import Link from "next/link";
import Image from "next/image";

const CategoriesCard = ({ category }) => {
  return (
    <div className={styles.categoryCard}>
      <Link
        href={`/artworksDisplay/?fromLink=category&toDisplay=${category.name}`}
      >
        <a>
          <Image
            src={category.image_url}
            alt={category.name}
            width={380}
            height={380}
            className={styles.categoryImage}
          />
        </a>
      </Link>
      <h2 className={styles.categoryName}>{category.name}</h2>
    </div>
  );
};

export default CategoriesCard;
