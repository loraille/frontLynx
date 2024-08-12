import styles from '../styles/UserTest2.module.css';
import Header from './Header';
import ArtworkUpload from '../components/ArtworkUpload'
import ArtworkCard from '../components/ArtworkCard';
import CollectionsCard from '../components/CollectionsCard';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { urlBackend } from '../assets/varGlobal'
import { useRouter } from 'next/router';

function User() {
    const router = useRouter();
    const { username } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);
    /////// État pour stocker la liste des œuvres d’art/olletions pour l’utilisateur: ////////
    const [artworks, setArtworks] = useState([]);
    const [collections, setCollections] = useState([]);
    const [settings, setSettings] = useState([]);  // État pour stocker les infos de l'utilisateur
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
        // fetch(`${urlBackend}/artworks/artist/${username}`)
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
    console.log("YoupiYOUPI//////////////", artworks);


     // Préparation de la liste des cartes d'œuvres d'art
     const listArtworkCards = artworks.map(artwork => {
        return (
            <ArtworkCard
                key={artwork._id}
                artwork={artwork}
            />
        );
    });

    // Préparation de la liste des cartes de collections
    const listCollectionsCard = collections.map(collection => {
        return (
            <CollectionsCard
                key={collection._id}
                collectionName={collection.name}
                artworks={collection.artworks}
                image_url={collection.artworks[collection.artworks.length - 1].url} // Accès direct à l'image
            />
        );
    });





    // const [settings, setSettings] = useState([])
    // useEffect(() => {
    //     fetch(`${urlBackend}/users/${username}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setSettings(data.userInfo);
    //             console.log(data.message)
    //         });
    // }, []);

//     return (
//         <div>
//             <main className={styles.main}>
//                 <div className={styles.header}>
//                     <Header onOpenModal={handleOpenModal} />
//                 </div>
//                 <div className={styles.container}>
//                     <div className={styles.infos}>
//                         <h2 className='titlePage'>Profile</h2>
//                     </div>
//                     <div className={styles.collection}>
//                         <h2 className='titlePage'>Collections</h2>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }


return (
    <div>
        <main className={styles.main}>
            <div className={styles.header}>
                <Header onOpenModal={handleOpenModal} />
            </div>
            <div className={styles.container}>
                <div className={styles.infos}>
                    <h2 className={styles.titlePage}>{settings.username}</h2>
                    <p>{bio}</p>
                </div>
                <div className={styles.artworkSection}>
                    <h2 className={styles.titlePage}>Artworks</h2>
                    <div className={styles.cardContainer}>
                        {listArtworkCards}
                    </div>
                </div>
                <div className={styles.collectionsSection}>
                    <h2 className={styles.titlePage}>Collections</h2>
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