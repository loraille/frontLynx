import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArtworkCard from './ArtworkCard';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import Header from './Header';
import styles from '../styles/ArtworksDisplay.module.css';
import ArtistCard from './ArtistCard';
import { urlBackend } from '../assets/varGlobal';
import { useRouter } from 'next/router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip from '@mui/material/Tooltip';

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
    const [artists, setArtists] = useState([]);
    const username = useSelector(state => state.user.value.username);

    useEffect(() => {
        if (fromLink === 'category') {
            if (!toDisplay) {
                console.error("toDisplay is not defined");
                return;
            }
            fetch(`${urlBackend}/artworks/category/${toDisplay}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.artworks) {
                        console.log("Artworks fetched");
                        setArtworks(data.artworks);
                    } else {
                        console.error("Unexpected BDD response:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching artworks:", error);
                });
        } else if (fromLink === 'collection') {
            if (!toDisplay) {
                console.error("toDisplay is not defined");
                return;
            }
            fetch(`${urlBackend}/users/collection/${username}/${toDisplay}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.artworks) {
                        console.log(data.message);
                        setArtworks(data.artworks);
                    } else {
                        console.error("Unexpected BDD response:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching artworks:", error);
                });
        } else if (fromLink === 'bookmarks') {
            if (!toDisplay) {
                console.error("toDisplay is not defined");
                return;
            }
            fetch(`${urlBackend}/users/${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setArtworks(data.userInfo.favorites);
                    } else {
                        console.error("Unexpected BDD response:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching artworks:", error);
                });
        } else if (fromLink === 'following') {
            if (!toDisplay) {
                console.error("toDisplay is not defined");
                return;
            }
            fetch(`${urlBackend}/users/${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setArtists(data.userInfo.following);
                    } else {
                        console.error("Unexpected BDD response:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching artworks:", error);
                });
        } else {
            console.log('fromLink or toDisplay are not correct');
        }
    }, [toDisplay, fromLink, username]);

    const handleDelete = (id) => {
        fetch(`${urlBackend}/artworks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork._id !== id));
                } else {
                    console.error("Unexpected BDD response:", data);
                }
            })
            .catch(error => {
                console.error("Error deleting artwork:", error);
            });
    };

    const renderArtworks = () => {
        if (fromLink === 'collection') {
            return artworks.map(artwork => (
                <div key={artwork._id} className={styles.artworkCard}>
                    <ArtworkCard artwork={artwork} />
                    <Tooltip title="Delete" arrow>
                        <HighlightOffIcon className={styles.deleteIcon} onClick={() => handleDelete(artwork._id)} />
                    </Tooltip>
                </div>
            ));
        } else {
            return artworks.map(artwork => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
            ));
        }
    };

    const artistsList = artists.map(artist => (
        <ArtistCard key={artist._id} artist={artist} />
    ));

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    {isModalOpen && modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {isModalOpen && modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {isModalOpen && modalType === 'upload' && <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} />}
                </div>
                <div>
                    <h2 className='titlePage'>Artworks in {toDisplay}'s {fromLink}</h2>
                    {fromLink === 'following' ? (
                        artists.length > 0 ? (
                            <div className={styles.artworkList}>
                                {artistsList}
                            </div>
                        ) : (
                            <p className={styles.noArtworks}>No artists available</p>
                        )
                    ) : (
                        artworks.length > 0 ? (
                            <div className={styles.artworkList}>
                                {renderArtworks()}
                            </div>
                        ) : (
                            <p className={styles.noArtworks}>No artworks available</p>
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default ArtworksDisplay;
