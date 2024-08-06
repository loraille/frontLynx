import styles from '../styles/Home.module.css';
import { useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';
import ArtworkList from './ArtworkList';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header onOpenModal={handleOpenModal} />
        </div>
        <div className={styles.container}>
          <Signup isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
        <div className={styles.featuredSection}>
          <h1 className={styles.title}>Featured Artists</h1> {/* S'assurer d'importer le style global pour cette classe */}
          <ArtworkList/> {/* Insérer "featured Artists" */}
        </div>   
      </main>
    </div>
  );
}

export default Home;
