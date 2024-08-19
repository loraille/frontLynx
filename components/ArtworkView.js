import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from './Header';
import SignIn from './SignIn';
import Signup from './Signup';
import ArtworkUpload from './ArtworkUpload';
import SignUpIn from './SignUpIn';
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
        console.log("ArtworkViewhandleCloseModal")
        setIsModalOpen(false);
        setModalType('');
    };

    ////////////////////variables/////////////////////////////////////////////
    const username = useSelector(state => state.user.value.username);
    const [artwork, setArtwork] = useState({});
    const [tags, setTags] = useState([]);
    const [isBookmarked, setIsbookmarked] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    //////////////////check if artworks and artist are followed//////////////
    // Fetch user info when username changes
    useEffect(() => {
        if (username) {
            fetch(`${urlBackend}/users/${username}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    setUserInfo(data.userInfo);
                })
                .catch(error => console.error('Error fetching user info:', error));
        }
    }, [username]);

    // Check if artwork is bookmarked when username, userInfo, or artwork changes
    useEffect(() => {
        if (username && userInfo && artwork) {
            checkBookmark();
        }
    }, [username, userInfo, artwork]);

    const checkBookmark = async () => {
        if (userInfo.favorites && artwork._id) {
            const isInBookmark = userInfo.favorites.some(e => e._id === artwork._id.toString());
            setIsbookmarked(isInBookmark);
        } else {
            console.error('userInfo.favorites,artwork._id is undefined');
        }
    };

    // Check if artist is followed//////////////////////////////////////////
    useEffect(() => {
        if (username && userInfo) {
            checkFollowing();
        }
    }, [username, userInfo]);

    const checkFollowing = async () => {
        if (userInfo.following) {
            const isInFollowing = userInfo.following.some(e => e.username === artwork.uploader);
            setIsFollowed(isInFollowing);
        } else {
            console.error('userInfo.following is undefined');
        }
    };

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
                    console.log(data.message);
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
    ////////////clic to image source in a new window//////////////////////
    const handleLogin = (url) => {
        console.log('SIGNUP/SIGNIN', url);
        // ##SignUpIn
        handleOpenModal('signupin');
    };
    ///////////////////////bookmark///////////////////////////////
    const handleBookmarkClick = async () => {
        if (isBookmarked) {
            setIsbookmarked(false);
            try {
                const response = await fetch(`${urlBackend}/users/bookmark/${username}/${artwork._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error('problem to remove artwork from favorite', error);
            }
        } else {
            setIsbookmarked(true);
            try {
                const response = await fetch(`${urlBackend}/users/bookmark/${username}/${artwork._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error('problem to add artwork to favorite', error);
            }
        }
    };

    /////////////////////////Following///////////////////////////////////////////////////
    const handleFollowingClick = async () => {
        if (isFollowed) {
            setIsFollowed(false);
            try {
                const response = await fetch(`${urlBackend}/users/following/${username}/${artwork.uploader}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error('problem to remove artist from following', error);
            }
        } else {
            setIsFollowed(true);
            try {
                const response = await fetch(`${urlBackend}/users/following/${username}/${artwork.uploader}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error('problem to add artist to following', error);
            }
        }
    };
    const x = 800
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
                            {modalType === 'signupin' && <SignUpIn isOpen={isModalOpen} onClose={handleCloseModal} onOpenModal={handleOpenModal} />}
                            {modalType === 'upload' && <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} />}
                        </div>
                    )}
                </div>
                <div className={styles.container}>
                    <div className={styles.artworkZone}>
                        <div className={styles.titleZone}>
{/*                             <div className="titleArt">{artwork.title}</div>   */} 
                           <div className={styles.titleArt}>{artwork.title}</div>
                            {username !== null ? (
                                !isBookmarked ? (
                                    <BookmarkBorderIcon className={styles.bookmark} onClick={handleBookmarkClick} />
                                ) : (
                                    <BookmarkIcon className={styles.bookmark} onClick={handleBookmarkClick} />
                                )
                            ) : <BookmarkBorderIcon className={styles.bookmarkOff} onClick={handleLogin} />}
                        </div>

                        {artwork.url && (
                            <div className={styles.imageContainer}>
                                <Image
                                    src={artwork.url}
                                    alt={artwork.title}
                                    layout='fill'
                                    objectFit='contain'
                                    // width={x}
                                    // height={x}
                                    className={`${styles.image}`}
                                    onClick={() => handleImageClick(artwork.url)}
                                />
                            </div>
                        )}
                        <div className={styles.tagsTitle}>
                            {listTags}
                        </div>
                    </div>
                    <div className={styles.textZone}>
                        <div className={styles.zoneArtist}>
                            <div onClick={() => handleUsernameClick(artwork.uploader)} className={`titleArtworkTextZone ${styles.artist}`}>{artwork.uploader}</div>
                            <div>
                                {username !== null ? (
                                    !isFollowed ? (
                                        <BookmarkBorderIcon className={styles.bookmark} onClick={handleFollowingClick} />
                                    ) : (
                                        <BookmarkIcon className={styles.bookmark} onClick={handleFollowingClick} />
                                    )) : <BookmarkBorderIcon className={styles.bookmarkOff} onClick={handleLogin} />}
                            </div>
                        </div>
                        {/*  id={styles.scrollbar1}  */}
                        <div className="titleArtworkTextZone">Description</div>
                        <div className={`${styles.descriptionText} ${styles.scrollbar1}`}>{artwork.description}</div>
                        <div className="titleArtworkTextZone">Comments</div>
                        {username !== null ? (
                            <CommentZone artwork={artwork} />
                        ) : <CommentZone artwork={artwork} onClickSend={handleLogin} />}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ArtworkView;
