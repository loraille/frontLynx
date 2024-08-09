import styles from '../styles/Categories.module.css';
import { useState, useEffect } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';
import CollectionsCard from './CollectionsCard'
import { urlBackend } from '../assets/varGlobal';


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
    console.log('############State collections:', collections); // voir l'état des collections

    
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch(`${urlBackend}/collections`)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched from backend:', data);
                setCollections(data.collections);
            });
    }, []);
    ////////////////Mappage des collections//////////////////////////////////
    // console.log('user.collections:', user.collections);  
    console.log('collections:', collections);

    const listCollectionsCard = collections.map(collection => {
        return (
            <CollectionsCard
                key={collection._id}
                collectionName={collection.name}
                artworks={collection.artworks}
                image_url={collection.image_url}
            // artworks si besoin de contrôler plus précisemment ce qui est accessible?
            // disponibilité des url d'images pour collections à régler
            />
        );
    });


    // const listCollectionsCard = collections.map(collection => {
    //     return (
    //         <CollectionsCard
    //             key={collection._id}
    //             collection={collection}  // Passe l'objet complet
    //         />
    //     );
    // });

    ////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
                    <div className={styles.featuredSection}>
                        <h1 className={styles.title}>My collections</h1>
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
