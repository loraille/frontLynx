import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard'; // Assurez-vous que le chemin est correct
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import styles from '../styles/Artists.module.css';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    // Charger les données depuis le fichier JSON local
    fetch('/artists.json')
      .then(response => response.json())
      .then(data => {
        console.log('Données chargées:', data);
        // setArtists(data); 
        // Duplication de l'artiste 10 fois
        const duplicatedArtists = Array(10).fill(data[0]);
        setArtists(duplicatedArtists);
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
        </div>
        <div className={styles.featuredSection}>
          <h1 className={styles.title}>Artists</h1> {/* S'assurer d'importer le style global pour cette classe */}
          <div className={styles.artistsList}>
            {artists.map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistsPage;
