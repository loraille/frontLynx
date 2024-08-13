import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import styles from '../styles/Artists.module.css';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  // const [error, setError] = useState(null); 
  // MàJ de l'état 'error' avec msg d'erreur approprié
  useEffect(() => {
    // Charger les données depuis le fichier JSON local
    // fetch('/artists.json')
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        console.log('Données chargées:', data.users);
        setArtists(data.users);
        // Duplication de l'artiste 10 fois
        // const duplicatedArtists = Array(10).fill(data[0]);
        // setArtists(duplicatedArtists);
      });
  }, []);

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
          <div>
            <h2 className='titlePage'>Artists</h2>
            <div className={styles.artistsList}>
              {artists.map((artist, index) => (
                <ArtistCard key={index} artist={artist} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistsPage;
