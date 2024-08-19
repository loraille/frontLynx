import React, { useEffect, useState, useRef, useCallback } from "react";
import ArtworkCard from "./ArtworkCard";
import styles from "../styles/ArtworkList.module.css";
import { urlBackend } from "../assets/varGlobal";

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastArtworkRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, limit]
  );

  useEffect(() => {
    const calculateLimit = () => {
      const screenWidth = window.innerWidth;
      const cardWidth = 220;
      const cardsPerRow = Math.floor(screenWidth / cardWidth);
      const rows = Math.floor(window.innerHeight / 280);
      setLimit(cardsPerRow * rows);
    };

    calculateLimit();
    window.addEventListener("resize", calculateLimit);
    return () => window.removeEventListener("resize", calculateLimit);
  }, []);

  useEffect(() => {
    if (limit > 0) {
      console.log(
        `------------->${urlBackend}/artworks?offset=${offset}&limit=${limit}`
      );
      fetch(`${urlBackend}/artworks?offset=${offset}&limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.artworks.length === 0) {
            setHasMore(false);
          } else {
            setArtworks((prevArtworks) => [...prevArtworks, ...data.artworks]);
          }
        });
    }
  }, [offset, limit]);

  let renderedArtworks = artworks.map((artwork, index) => {
    if (artworks.length === index + 1) {
      return (
        <div key={artwork._id} ref={lastArtworkRef}>
          <ArtworkCard artwork={artwork} />
        </div>
      );
    }
    return <ArtworkCard key={artwork._id} artwork={artwork} />;
  });

  return <div className={styles.artworkList}>{renderedArtworks}</div>;
};

export default ArtworkList;
