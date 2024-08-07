import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import { urlBackend } from '../assets/varGlobal';
import Image from 'next/image';
import CommentZone from './CommentZone';
import styles from '../styles/ArtworkView.module.css';

function ArtworkView() {

    //////////Modale/////////////////////////////////////////////
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
    const [artwork, setArtwork] = useState({});
    const [tags, setTags] = useState([]);
    /////////////////////////////////////////////////////////////

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`${urlBackend}/artworks/${id}`)
                .then(response => response.json())
                .then(data => {
                    setArtwork(data.artworkInfo);
                    setTags(data.artworkInfo.tags);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de l\'œuvre d\'art:', error);
                });
        }
    }, [id]);

    const listTags = tags.map(tag => (
        <div className={styles.tags} key={tag._id}>{tag.name}</div>
    ));

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    {isModalOpen && (
                        <div className={styles.modalBackdrop}>
                            {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                            {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
                        </div>
                    )}
                </div>
                <div className={styles.container}>
                    <div className={styles.artworkZone}>
                        <div className="titleArt">{artwork.title}</div>
                        {artwork.url && (
                            <div className={styles.imageContainer}>
                                <Image
                                    src={artwork.url}
                                    alt={artwork.title}
                                    width={500}
                                    height={500}
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <div className={styles.tagsTitle}>
                            {listTags}
                        </div>
                    </div>
                    <div className={styles.textZone}>
                        <div className={`titleArtworkTextZone ${styles.artist}`} >{artwork.uploader}</div>
                        <div className="titleArtworkTextZone">Description</div>
                        <div className={styles.descriptionText}>{artwork.description}</div>
                        <div className="titleArtworkTextZone">Comments</div>
                        <CommentZone artwork={artwork} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ArtworkView;
