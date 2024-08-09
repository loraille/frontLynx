import React from 'react';
import styles from '../styles/CategoriesCard.module.css';
import Link from 'next/link';

const CollectionsCard = ({ collectionName, image_url, artworks }) => {
  return (
    <div className={styles.categoryCard}>
      <Link href={{ pathname: '/artworksDisplay', query: { name: collectionName } }}>
        <img src={image_url || '/default_image.png'} alt={ collectionName || 'untitled'} className={styles.categoryImage} />
      </Link>
      <h3>{collectionName}</h3>
      <p>{artworks.length} artworks</p>  {/* Afficher le nombre d'œuvres ? A confirmer */}
    </div>
  );
};

// const CollectionsCard = ({ collection }) => {
//     return (
//       <div className={styles.categoryCard}>
//         <Link href={{ pathname: '/artworksDisplay', query: { name: collection.name } }}>
//           <img src={collection.image_url || '/default_image.png'} alt={collection.title || 'untitled'} className={styles.categoryImage} />
//         </Link>
//         <h3>{collection.name}</h3>
//       </div>
//     );
//   };

export default CollectionsCard;
