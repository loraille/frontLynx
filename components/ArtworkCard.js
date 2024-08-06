import React from 'react';
import styles from '../styles/ArtworkCard.module.css';

const ArtworkCard = ({ artwork }) => { 
  console.log(artwork.url);
  let artistName = "Gregor S";
  return (
    <div className={styles.artworkCard}>
      <img src={artwork.url} alt={artwork.title} className={styles.artworkImage}/>
      <h3>{artwork.title}</h3>
      <p className={styles.artistName}>Artiste : {artistName}</p>
    </div>
  );
};

export default ArtworkCard;
