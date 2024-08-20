import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ArtworkCard.module.css";

const ArtworkCard = ({ artwork }) => {
  return (
    <div className={styles.artworkCard}>
      <Link href={`/artworkView/?id=${artwork._id}`}>
        <a>
          <div className={styles.artworkImageContainer}>
            <Image
              src={artwork.url}
              alt={artwork.title}
              layout="fill"
              objectFit="cover"
              className={styles.artworkImage}
            />
          </div>
        </a>
      </Link>
      <div className={styles.infos}>
        <Link href={`/user/?username=${artwork.uploader}`}>
          <a className={styles.artistName}>{artwork.uploader}</a>
        </Link>
        <div className={styles.cardTitle}>{artwork.title}</div>
      </div>
    </div>
  );
};

export default ArtworkCard;
