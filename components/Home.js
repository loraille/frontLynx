import styles from '../styles/Home.module.css';
import { useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';

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
      </main>
    </div>
  );
}

export default Home;
