import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArtworkCard from './ArtworkCard';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';
import styles from '../styles/ArtworksDisplay.module.css';
import { urlBackend } from '../assets/varGlobal';
import { useRouter } from 'next/router';

function ArtworksDisplay() {
    ////////////modale///////////////////////////////////////////
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
    ////////////////////////Gestion de l'affichage/////////////////
    const router = useRouter();
    const { toDisplay, fromLink } = router.query;
    const [artworks, setArtworks] = useState([]);
    const username = useSelector(state => state.user.value.username)

    useEffect(() => {
        if (fromLink === 'category') {
            if (!toDisplay) {
                console.error(" is not defined");
                return;
            }
            fetch(`${urlBackend}/artworks/category/${toDisplay}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.artworks) {
                        console.log("Artworks fetched");
                        setArtworks(data.artworks);
                    } else {
                        console.error("Unexpected API response:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching artworks:", error);
                });
        } else if (fromLink === 'collection') {
            if (!toDisplay) {
                console.error(" is not defined");
                return;
            }
            fetch(`${urlBackend}/users/collection/${username}/${toDisplay}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.artworks) {
                        console.log(data.message);
                        setArtworks(data.artworks);
                    } else {
                        console.error("Unexpected API response:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching artworks:", error);
                });
        } else {

            console.log('fromLink is not "category" or a "collection');
        }
    }, [toDisplay]);

    const artworksList = artworks.map(artwork => {
        return <ArtworkCard key={artwork._id} artwork={artwork} />
    })


    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    {isModalOpen && modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {isModalOpen && modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
                </div>
                <div>
                    <h2 className='titlePage'>Artworks in {toDisplay} {fromLink}</h2>
                    {artworks.length > 0 ? (
                        <div className={styles.artworkList}>
                            {artworksList}
                        </div>
                    ) : (
                        <p className={styles.noArtworks}>No artworks available</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ArtworksDisplay;
