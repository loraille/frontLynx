import styles from '../styles/Categories.module.css';
import { useState, useEffect } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import Header from './Header';
import CollectionsCard from './CollectionsCard';
import { urlBackend } from '../assets/varGlobal';
import { useSelector } from 'react-redux';

function Collections() {
    //////////////////////////////////Modale/////////////////////////////////
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
    ///////////////Recuperation des collections///////////////////////////////
    const username = useSelector(state => state.user.value.username);

    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch(`${urlBackend}/users/${username}`)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched from backend:', data);
                setCollections(data.userInfo.collections);
            });
    }, [username]);

    ////////////////Mappage des collections//////////////////////////////////
    const listCollectionsCard = collections.map(collection => {
        return (
            collection.artworks.length && // ISSUE 001 when a collection is empty don't try to display it
            <CollectionsCard
                key={collection._id}
                uploader = {username} // ISSUE 002 missing uploader for ArtworksDisplay collection's artworks when visitor
                collectionName={collection.name}
                artworks={collection.artworks}
                image_url={collection.artworks[collection.artworks.length - 1].url}
            />
        );
    });

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
                    <div className={styles.featuredSection}>
                        <h2 className='titlePage'>My collections</h2>
                    </div>
                    <div className={styles.cardContainer}>
                        {listCollectionsCard}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Collections;
