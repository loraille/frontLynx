import React from 'react';
import Link from 'next/link';
import styles from '../styles/AddArtwork.module.css';

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
        style={{ cursor: 'pointer' }}
      />
      <div className={styles.infos}>
        <Link href={{ pathname: '/user', query: { username: artwork.uploader } }}>
          <a className={styles.artistName}>{artwork.uploader}</a>
        </Link>
        <div className={styles.cardTitle}>{artwork.title}</div>
      </div>
    </div>
  );
};

export default AddArtwork;
