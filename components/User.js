import styles from '../styles/User.module.css';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from '../components/ArtworkUpload'
import ArtworkCard from '../components/ArtworkCard';
import CollectionsCard from '../components/CollectionsCard';
import AddArtwork from '../components/AddArtwork'; // Import the AddArtwork component
import { useState, useEffect } from 'react';
import { urlBackend } from '../assets/varGlobal'
import { useRouter } from 'next/router';
import AddBoxIcon from '@mui/icons-material/AddBox';

function User() {
    const router = useRouter();
    const { username } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [collections, setCollections] = useState([]);
    const [settings, setSettings] = useState(null);
    const [bio, setBio] = useState('');
    const [reload, setReload] = useState(false); // State to force reload

    /////////////modale//////////////////////////////////////
    const [modalType, setModalType] = useState('');
    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType('');
        if (modalType === 'upload') {
            setReload(!reload); // Force reload by toggling the state
        }
    };

    ///////////////////// get user infos/////////////////////////////////////////
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

        /////////////////get user's artwoks/////////////////////////////////////////////
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

    }, [username, reload]); // Add reload to the dependency array

    ////////////////artworksLits to display////////////////////////////////////
    const listArtworkCards = artworks.map(artwork => {
        return (
            <ArtworkCard
                key={artwork._id}
                artwork={artwork}
            />
        );
    });

    // Add the new artwork card
    listArtworkCards.unshift(
        <AddArtwork
            key="addCart"
            artwork={{
                _id: "addCart",
                url: "/addArt.jpg",
                title: "+Add a new creation!!!",
                uploader: username
            }}
            onClick={() => handleOpenModal('upload')}
        />
    );

    //////////////////collectionsCard to display///////////////////////////////
    const listCollectionsCard = collections.map(collection => {
        return (
            collection.artworks.length && // ISSUE 001 when a collection is empty don't try to display it
            <CollectionsCard
                key={collection._id}
                uploader={settings.username} // ISSUE 002 missing uploader for ArtworksDisplay collection's artworks when visitor
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
                    style={{ backgroundImage: `url(${settings.bannerUrl || '/defaultBanner.jpg'})` }}>
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
