import React, { useEffect, useState } from 'react';
import ArtworkCard from './ArtworkCard';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';
import styles from '../styles/ArtworksDisplay.module.css';

const ArtworksDisplay = ({ category }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [artworks, setArtworks] = useState([]);

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType('');
    };

    useEffect(() => {
        if (!category) {
            console.error("Category is not defined");
            return;
        }
        fetch(`http://localhost:3000/artworks/category/${category}`) 
        // fetch(`http://localhost:3000/categories/${category}/artworks`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log("Fetched artworks:", data.artworks);
                    setArtworks(data.artworks);
                } else {
                    console.error("Unexpected API response:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching artworks:", error);
            });
    }, [category]);

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
                    <h1 className={styles.title}>Artworks in {category} Category</h1>
                    {artworks.length > 0 ? (
                        <div className={styles.artworkList}>
                            {artworks.map(artwork => (
                                <ArtworkCard key={artwork._id} artwork={artwork} />
                            ))}
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