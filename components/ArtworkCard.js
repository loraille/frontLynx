import React from 'react';
import Link from 'next/link';

import styles from '../styles/ArtworkCard.module.css';

const ArtworkCard = ({ artwork }) => {
  //let artistName = "Gregor S";
  //let artistName = useSelector((state) => state.user.value.username)
  let artistName = artwork.username;
  console.log(artwork.url, artistName);


return (
  <div className={styles.artworkCard}>
    <Link href={{ pathname: '/artworkView', query: { id: artwork._id } }}>
      <img src={artwork.url} alt={artwork.title} className={styles.artworkImage} />
    </Link>
    <div className={styles.infos}>
      <Link href={{ pathname: '/user', query: { username: artwork.uploader } }}>
        <a className={styles.artistName}>{artwork.uploader}</a>
      </Link>
      <div className={styles.cardTitle}>{artwork.title}</div>
    </div>
  </div>
);

};

export default ArtworkCard;
