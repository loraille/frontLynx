import React from 'react';
import styles from '../styles/CategoriesCard.module.css';
import { useRouter } from 'next/router';

const CollectionsCard = ({ collectionName, image_url, artworks }) => {
  const router = useRouter();
  const handleCollectionClick = (collection) => {
    router.push(`/artworksDisplay/?fromLink=collection&toDisplay=${collection}`);
  };
  return (
    <div className={styles.categoryCard}>
      <img src={image_url || '/default_image.png'} alt={collectionName || 'untitled'} className={styles.categoryImage} onClick={() => handleCollectionClick(collectionName)} />
      <h3>{collectionName}</h3>
      <p>{artworks.length} artworks</p>
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
