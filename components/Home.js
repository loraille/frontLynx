import styles from '../styles/Home.module.css';
import { useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import Header from './Header';
import ArtworkList from './ArtworkList';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header onOpenModal={handleOpenModal} />
        </div>
        <div className={styles.container}>
          {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
          {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
          {modalType === 'upload' && <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
        <div>
          <h2 className='titlePage'>Lynx's Thread</h2>
          <div className={styles.artworkList}>
            <ArtworkList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
