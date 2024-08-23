import React from "react";
import styles from "../styles/CategoriesCard.module.css";
import Link from "next/link";
import Image from "next/image";

const CollectionsCard = ({ uploader, collectionName, image_url, artworks }) => {
  //check all required props are defined
  if (!uploader || !collectionName || !image_url) {
    return null;
  }

  return (
    <div className={styles.categoryCard}>
      <Link
        href={`/artworksDisplay/?fromLink=collection&toDisplay=${collectionName}&uploader=${uploader}`}
      >
        <a>
          <Image
            src={image_url}
            alt={collectionName}
            width={380}
            height={380}
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
