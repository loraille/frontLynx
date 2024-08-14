import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import styles from '../styles/Artists.module.css';
import { urlBackend } from '../assets/varGlobal';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    // Fetch des utilisateurs
    fetch(`${urlBackend}/users`)
      .then(response => response.json())
      .then(data => {
        const users = data.users;
        // Process each user one by one
        const artistsWithArtworks = [];

        users.forEach(user => {
          // Utilisation du req.query.limit dans la route
          fetch(`${urlBackend}/artworks/uploader/${user.username}?limit=3`)
          .then(response => response.json())
            .then(data => {
              console.log("/////////////////////////////////Fetched artworks for", user.username, ":", data.artworkInfo);

              user.artworks = data.artworkInfo || [];
              // Ajout des users avec artworks au tableau
              artistsWithArtworks.push(user);
              
              // Une fois tous les users traités, màj de l'état
              if (artistsWithArtworks.length === users.length) {
                setArtists(artistsWithArtworks);
              }
            })
            .catch(error => console.error('Error fetching artworks:', error));
        });
      })
      .catch(error => console.error('Error fetching users:', error));
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
