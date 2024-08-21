import React from "react";
import Link from "next/link";
import styles from "../styles/AddArtwork.module.css";

const AddArtwork = ({ artwork, onClick }) => {
  let artistName = artwork.username;
  console.log(artwork.url, artistName);

  return (
    <div className={styles.artworkCard}>
      <img
        src={artwork.url}
        alt={artwork.title}
        className={styles.artworkImage}
        onClick={onClick}
      />
      <div className={styles.infos}>
        <div className={styles.cardTitle}>{artwork.title}</div>
      </div>
    </div>
  );
};

export default AddArtwork;
