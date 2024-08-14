import styles from '../styles/User.module.css';
import Header from './Header';
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
    /////// État pour stocker la liste des œuvres d’art/olletions pour l’utilisateur: ////////
    const [artworks, setArtworks] = useState([]);
    const [collections, setCollections] = useState([]);
    const [settings, setSettings] = useState(null); //remplace ([]) afin de représenter l'état initial ou les données ne sont pas encore chargées
    const [bio, setBio] = useState('');



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Fetch des informations utilisateur (settings) et des collections
    useEffect(() => {
        fetch(`${urlBackend}/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.userInfo) {
                    setSettings(data.userInfo);  // Stockage des informations utilisateur
                    setCollections(data.userInfo.collections);  // Stockage des collections de l'utilisateur
                    setBio(data.userInfo.bio);  // Stockage de la biographie de l'utilisateur
                    console.log(data.message);
                } else {
                    console.error("Unexpected response for user info:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching user info:", error);
            });

        // Fetch des œuvres d'art pour l'utilisateur/artiste
        fetch(`${urlBackend}/artworks/uploader/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.artworkInfo) {
                    setArtworks(data.artworkInfo);  // Stockage des œuvres d'art de l'utilisateur
                } else {
                    console.error("Unexpected response for artworks:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching artworks:", error);
            });

    }, [username]);
    // console.log("YoupiYOUPI//////////////", artworks);


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
            collection.artworks.length && //skip empty collection
            <CollectionsCard
                key={collection._id}
                collectionName={collection.name}
                artworks={collection.artworks}
                image_url={collection.artworks[collection.artworks.length - 1].url} // Accès direct à l'image
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
                <div className={styles.container}>
                    <div
                        className={`${styles.infos} ${styles.bannerBackground}`}
                        style={settings.bannerUrl ? { backgroundImage: `url(${settings.bannerUrl})` } : {}}>
                        <div className={styles.overlay}></div> {/* Overlay semi-transparent */}
                        <h2 className='titlePage'>{settings.username}</h2>
                        <p className={styles.bio}>{bio}</p>
                    </div>
                    <div className={styles.artworkSection} id={styles.scrollbar1}>
                        <h2 className='titlePage'>Artworks</h2>
                        <div className={styles.cardContainer}>
                            {listArtworkCards}
                        </div>
                    </div>
                    <div className={styles.collectionsSection} id={styles.scrollbar1}>
                        <h2 className='titlePage'>Collections</h2>
                        <div className={styles.cardContainer}>
                            {listCollectionsCard}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default User;