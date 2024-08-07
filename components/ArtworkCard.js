import React from 'react';
import styles from '../styles/ArtworkCard.module.css';
import Link from 'next/link';

const ArtworkCard = ({ artwork }) => {
  console.log(artwork.url);
  let artistName = "Gregor S";
  return (
    <div className={styles.artworkCard}>
      <Link href={{ pathname: '/artworkView', query: { id: artwork._id } }}>
        <img src={artwork.url} alt={artwork.title} className={styles.artworkImage} />
      </Link>
      <h3>{artwork.title}</h3>
      <p className={styles.artistName}>Artiste : {artistName}</p>
    </div>
  );
};

export default ArtworkCard;
