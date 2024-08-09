import styles from '../styles/User.module.css';
import Header from './Header';
import ArtworkUpload from '../components/ArtworkUpload'
import ArtworkCard from '../components/ArtworkCard';
import CollectionsCard from '../components/CollectionsCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { urlBackend } from '../assets/varGlobal'

function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    <button onClick={handleOpenModal} className={styles.btn}>
                        Open Modal
                    </button>
                    {/* <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} /> */}

                    {/* Ajout des nouvelles sections ici */}
                    {/* <div className={styles.mainContent}>
                        <div className={styles.artworkSection}>
                            <ArtworkCard />
                        </div>
                        <div className={styles.collectionsSection}>
                            <CollectionsCard />
                        </div>
                    </div> */}
                </div>
            </main>
        </div>
    );
}

export default User;