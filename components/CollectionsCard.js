import React from "react";
import styles from "../styles/CategoriesCard.module.css";
import Link from "next/link";

const CollectionsCard = ({ uploader, collectionName, image_url, artworks }) => {
  return (
    <div className={styles.categoryCard}>
      <Link
        href={`/artworksDisplay/?fromLink=collection&toDisplay=${collectionName}&uploader=${uploader}`}
      >
        <a>
          <img
            src={image_url}
            alt={collectionName}
            layout="fill"
            objectFit="cover"
            className={styles.collectionImage}
          />
        </a>
      </Link>
      <h2 className={styles.collectionName}>{collectionName}</h2>
      <p>{artworks.length} artworks</p>
    </div>
  );
};

export default CollectionsCard;
