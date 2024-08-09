import React from 'react';
import styles from '../styles/CategoriesCard.module.css';
import Link from 'next/link';

const CategoriesCard = ({ category }) => {
  return (
    <div className={styles.categoryCard}>
      <Link href={{ pathname: '/artworksDisplay', query: { id: category._id } }}>
        <img src={category.image_url} alt={category.title} className={styles.categoryImage} />
      </Link>
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoriesCard;
