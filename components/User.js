import styles from '../styles/User.module.css';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from '../components/ArtworkUpload'
import ArtworkCard from '../components/ArtworkCard';
import CollectionsCard from '../components/CollectionsCard';
import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { urlBackend } from '../assets/varGlobal'
import { useRouter } from 'next/router';

function User() {
    const router = useRouter();
    const { username } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [collections, setCollections] = useState([]);
    const [settings, setSettings] = useState(null);
    const [bio, setBio] = useState('');
    const [modalType, setModalType] = useState('');

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType('');
    };

    // Fetch des informations utilisateur (settings) et des collections
    useEffect(() => {
        fetch(`${urlBackend}/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.userInfo) {
                    setSettings(data.userInfo);
                    setCollections(data.userInfo.collections);
                    setBio(data.userInfo.bio);
                    console.log(data.message);
                } else {
                    console.error("Unexpected response for user info:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching user info:", error);
            });


        fetch(`${urlBackend}/artworks/uploader/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.artworkInfo) {
                    setArtworks(data.artworkInfo);
                } else {
                    console.error("Unexpected response for artworks:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching artworks:", error);
            });

    }, [username]);



    //////////////// Préparation de la liste des artworkCard//////////////////////
    const listArtworkCards = artworks.map(artwork => {
        return (
            <ArtworkCard
                key={artwork._id}
                artwork={artwork}
            />
        );
    });

    ////////////////// Préparation de la liste des collectionsCard/////////////////////
    const listCollectionsCard = collections.map(collection => {
        return (
            collection.artworks.length && // ISSUE 001 when a collection is empty don't try to display it
            <CollectionsCard
                key={collection._id}
                uploader = {settings.username} // ISSUE 002 missing uploader for ArtworksDisplay collection's artworks when visitor
                collectionName={collection.name}
                artworks={collection.artworks}
                image_url={collection.artworks[collection.artworks.length - 1].url}
            />
        );
    });

    if (!settings) {
        return <div>Loading...</div>; // Ou un autre indicateur de chargement
    }

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
                {modalType === 'upload' && <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} />}
                <div
                    className={`${styles.bannerBackground}`}
                    style={settings.bannerUrl ? { backgroundImage: `url(${settings.bannerUrl})` } : {}}>
                    <div className={styles.infoUser} id={styles.scrollbar1}>
                        <h2 className='titlePage'>{settings.username}</h2>
                        <p>{bio}</p>
                    </div>
                </div>

                <div className={styles.artworkSection} id={styles.scrollbar1}>
                    <h2 className='titlePage'>Artworks</h2>
                    <div className={styles.cardContainer}>
                        {listArtworkCards}
                    </div>
                </div>
                <div className={styles.collectionsSection} id={styles.scrollbar1}>
                    <h2 className='titlePage'>Collections</h2>
                    <div className={styles.cardContainerCollections}>
                        {listCollectionsCard}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default User;