import React from "react";
import Image from "next/image";
import styles from "../styles/AddArtwork.module.css";

const AddArtwork = ({ artwork, onClick }) => {
  let artistName = artwork.username;
  console.log(artwork.url, artistName);

  return (
    <div className={styles.artworkCard}>
      <div className={styles.artworkImageContainer}>
        <Image
          src={artwork.url}
          alt={artwork.title}
          layout="fill"
          objectFit="cover"
          className={styles.artworkImage}
          onClick={onClick}
        />
      </div>
      <div className={styles.infos}>
        <div className={styles.cardTitle}>{artwork.title}</div>
      </div>
    </div>
  );
};

export default AddArtwork;
