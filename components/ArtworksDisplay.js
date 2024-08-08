import React, { useEffect, useState } from 'react';
import ArtworkCard from './ArtworkCard';
import styles from '../styles/ArtworkList.module.css';

const ArtworkList = () => {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
            fetch("http://localhost:3000/artworks/66b0d552609040f17889a147")
                .then(response => response.json())
                .then(data => {
                    console.log("fetched", data.artworks);
                    setArtworks(data.artworks);
                })
    }, []);

    // let artz; 
    // if (artworks.length) {
    //     artz = artworks.map(artwork => (
    //         <ArtistCard key={artwork._id} artwork={artwork} />
    //     ));
    // }

    // console.log("artz", artz);
    let renderedArtworks = artworks.map(artwork => (
        <ArtworkCard key={artwork._id} artwork={artwork} />
    ));
    
    return (
        <div className={styles.artworkList}>
            {renderedArtworks}
        </div>
    );
};

export default ArtworkList;
