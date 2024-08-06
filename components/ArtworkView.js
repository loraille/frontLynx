import styles from '../styles/ArtworkView.module.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import { urlBackend } from '../assets/varGlobal';
import Image from 'next/image';
import CommentZone from './CommentZone';

function ArtworkView() {
    const [artwork, setArtwork] = useState({});
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`${urlBackend}/artworks/66b102508e9043a76228b5b6`)
            .then(response => response.json())
            .then(data => {
                setArtwork(data.artworkInfo);
                setTags(data.artworkInfo.tags);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'œuvre d\'art:', error);
            });

        fetch(`${urlBackend}/comments/66b102508e9043a76228b5b6`)
            .then(response => response.json())
            .then(data => {
                setComments(data.comments);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des commentaires:', error);
            });
    }, []);


    // Afficher les tags
    const listTags = tags.map(tag => (
        <div className={styles.tags} key={tag._id}>{tag.name}</div>
    ));

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header />
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
                        <div className={`titleArtworkTextZone ${styles.artist}`} >Artist</div>
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
