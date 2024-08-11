import React from 'react';
import styles from '../styles/CategoriesCard.module.css';
import { useRouter } from 'next/router';

const CategoriesCard = ({ category }) => {
  const router = useRouter();
  const handleCategoryClick = (category) => {
    router.push(`/artworksDisplay/?fromLink=category&toDisplay=${category}`);
  };
  return (
    <div className={styles.categoryCard}>

      <img src={category.image_url} alt={category.name} className={styles.categoryImage} onClick={() => handleCategoryClick(category.name)} />

      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoriesCard;
