import React from 'react';
// import { useSelector } from 'react-redux';
import Link from 'next/link';

import styles from '../styles/ArtworkCard.module.css';

const ArtworkCard = ({ artwork }) => {
  //let artistName = "Gregor S";
  //let artistName = useSelector((state) => state.user.value.username)
  let artistName = artwork.uploader
  console.log(artwork.url, artistName);

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
