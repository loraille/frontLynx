import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import { urlBackend } from '../assets/varGlobal';
import Image from 'next/image';
import CommentZone from './CommentZone';
import styles from '../styles/ArtworkView.module.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useSelector } from 'react-redux';

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
    //////////////////artwork by ID///////////////////////////////////////////

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`${urlBackend}/artworks/${id}`)
                .then(response => response.json())
                .then(data => {
                    setArtwork(data.artworkInfo);
                    setTags(data.artworkInfo.tags);
                    console.log(data.message)
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de l\'œuvre d\'art:', error);
                });
        }
    }, [id]);
    //////////////search by tagName/////////////////////////////////////
    const handleTagClick = (tagName) => {
        router.push(`/resultSearch?category=tags&query=${tagName}`);
    };
    /////////////map tag to display//////////////////////////////////////
    const listTags = tags.map(tag => (
        <div
            className={styles.tags}
            key={tag._id}
            onClick={() => handleTagClick(tag.name)}
        >
            {tag.name}
        </div>
    ));
    /////////////clic to artist profile///////////////////////////////////
    const handleUsernameClick = (username) => {
        router.push(`/user/?username=${username}`);
    };
    ////////////clic to image source in a new window//////////////////////
    const handleImageClick = (url) => {
        window.open(url, '_blank');
    };
    ///////////////////////bookmark///////////////////////////////
    const username = useSelector(state => state.user.value.username)
    const [isBookmarked, setIsbookmarked] = useState(false)
    const handleBookmarkClick = () => {
        if (isBookmarked) {
            setIsbookmarked(false)
            try {
                fetch(`${urlBackend}/users/bookmark/${username}/${artwork._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => console.log(data.message))
            } catch (error) { console.error('problem to remove artwork from favorite') }
        } else {
            setIsbookmarked(true)
            try {
                fetch(`${urlBackend}/users/bookmark/${username}/${artwork._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => console.log(data.message))
            } catch (error) { console.error('problem to add artwork to favorite') }
        }
    }

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
                            <div className={styles.imageContainer} >
                                <Image
                                    src={artwork.url}
                                    alt={artwork.title}
                                    width={500}
                                    height={500}
                                    objectFit="cover"
                                    className={`${styles.image}`}
                                    onClick={() => handleImageClick(artwork.url)}
                                />
                                {!isBookmarked ? (<BookmarkBorderIcon className={styles.bookmark} onClick={() => handleBookmarkClick()} />) : (<BookmarkIcon className={styles.bookmark} onClick={() => handleBookmarkClick()} />)}
                            </div>
                        )}
                        <div className={styles.tagsTitle}>
                            {listTags}
                        </div>
                    </div>
                    <div className={styles.textZone}>
                        <div className={`titleArtworkTextZone ${styles.artist}`} onClick={() => handleUsernameClick(artwork.uploader)}>{artwork.uploader}</div>
                        <div className="titleArtworkTextZone">Description</div>
                        <div className={styles.descriptionText}>{artwork.description}
                        </div>
                        <div className="titleArtworkTextZone">Comments</div>
                        <CommentZone artwork={artwork} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ArtworkView;
