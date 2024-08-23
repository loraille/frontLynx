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
  const [expandedIndex, setExpandedIndex] = useState(null);

  
  const handleCardClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    //  Fetch des artistes (un artiste = un utilisateur ayant publié au moins une oeuvre)
    //  route users/artists :  renvoie de 1 à 3 oeuvres pour chaque artiste.
    fetch(`${urlBackend}/users/artists`)
      .then(response => response.json())
      .then(data => {
        const users = data.artists;
        // Process each user one by one  TODO --> move to backend users/artists route
        const artistsWithArtworks = [];
        users.forEach(user => {
          const sampleArtworks = [];
          for (let i = 0; i < user.collections.length; i++) {
            for (let j = 0; j < user.collections[i].artworks.length; j++) {
              sampleArtworks.push({
                _id: user.collections[i].artworks[j]._id,
                title: user.collections[i].artworks[j].title,
                url: user.collections[i].artworks[j].url,
              });
            }
          }
          artistsWithArtworks.push({
            username: user.username,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            artworks: sampleArtworks,
          });
        })
        setArtists(artistsWithArtworks);
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
                <ArtistCard
                  key={index}
                  artist={artist}
                  // Passage de la props à ArtistCard :
                  controlledExpand={expandedIndex === index}  // Contrôle l'expansion de la card 
                  onCardClick={() => handleCardClick(index)}  // Gestion du clic pour ouvrir/fermer la card
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistsPage;
