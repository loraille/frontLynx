import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArtworkCard from "./ArtworkCard";
import SignIn from "./SignIn";
import Signup from "./Signup";
import ArtworkUpload from "./ArtworkUpload";
import Header from "./Header";
import styles from "../styles/ArtworksDisplay.module.css";
import ArtistCard from "./ArtistCard";
import { urlBackend } from "../modules/utils";
import { useRouter } from "next/router";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddArtwork from "../components/AddArtwork";

function ArtworksDisplay() {
  ///////////////////////////modale/////////////////////////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };
  ////////////////////////setup///////////////////////////////////////////////////////
  const router = useRouter();
  const { uploader, toDisplay, fromLink } = router.query;
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isDeletable, setisDeletable] = useState(true);

  let username = useSelector((state) => state.user.value.username);
  ////////get infos by bookmark || collection || category || Following////////////////
  useEffect(() => {
    ////////////////////////CATEGORY//////////////////////////////////////////////////
    if (fromLink === "category") {
      if (!toDisplay) {
        console.error("toDisplay is not defined");
        return;
      }
      fetch(`${urlBackend}/artworks/category/${toDisplay}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.artworks) {
            console.log("Artworks fetched");
            setArtworks(data.artworks);
          } else {
            console.error("Unexpected BDD response:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching artworks:", error);
        });
      ////////////////////////COLLECTION//////////////////////////////////////////////
    } else if (fromLink === "collection") {
      // only logged in user can delete his own artwork
      if (username != uploader) {
        setisDeletable(false);
      }
      username = uploader; // not logged in visitor or logged in
      if (!toDisplay) {
        console.error("toDisplay is not defined");
        return;
      }
      fetch(`${urlBackend}/users/collection/${username}/${toDisplay}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.artworks) {
            console.log(data.message);
            setArtworks(data.artworks);
          } else {
            console.error("Unexpected BDD response:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching artworks:", error);
        });
      ////////////////////////BOOKMARKS////////////////////////////////////////////////
    } else if (fromLink === "bookmarks") {
      if (!toDisplay) {
        console.error("toDisplay is not defined");
        return;
      }
      fetch(`${urlBackend}/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setArtworks(data.userInfo.favorites);
          } else {
            console.error("Unexpected BDD response:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching artworks:", error);
        });
      ////////////////////////FOLLOWING////////////////////////////////////////////////
    } else if (fromLink === "following") {
      if (!toDisplay) {
        console.error("toDisisDeletableplay is not defined");
        return;
      }
      fetch(`${urlBackend}/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setArtists(data.userInfo.following);
          } else {
            console.error("Unexpected BDD response:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching artworks:", error);
        });
    } else {
      console.log("fromLink or toDisplay are not correct");
    }
  }, [toDisplay, fromLink, username, uploader]);
  ///////////////////Delete artwork///////////////////////////////////////////////////////
  const handleDelete = (id) => {
    fetch(`${urlBackend}/artworks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionName: toDisplay,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setArtworks((prevArtworks) =>
            prevArtworks.filter((artwork) => artwork._id !== id)
          );
        } else {
          console.error("Unexpected BDD response:", data);
        }
      })
      .catch((error) => {
        console.error("Error deleting artwork:", error);
      });
  };
  ////////////////////Remove bookmark//////////////////////////////////////////////////////
  const handleBookmarkClick = async (id) => {
    try {
      const response = await fetch(
        `${urlBackend}/users/bookmark/${username}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.message);

      // Mettre à jour l'état local après la suppression du bookmark
      setArtworks((prevArtworks) =>
        prevArtworks.filter((artist) => artist._id !== id)
      );
    } catch (error) {
      console.error("problem to remove artwork from favorite", error);
    }
  };
  ////////////////////Remove following//////////////////////////////////////////////////////
  const handleFollowingClick = async (uploader) => {
    try {
      const response = await fetch(
        `${urlBackend}/users/following/${username}/${uploader}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.message);
      // Mettre à jour l'état local après la suppression du bookmark
      setArtists((prevArtists) =>
        prevArtists.filter((artist) => artist.username !== uploader)
      );
    } catch (error) {
      console.error("problem to remove artist from following", error);
    }
  };
  ////////////////////Render artworks||artists/////////////////////////////////////////////
  const renderArtworks = () => {
    if (fromLink === "collection" && isDeletable) {
      let artworksInCollection = artworks.map((artwork) => (
        <div key={artwork._id} className={styles.artworkCard}>
          <ArtworkCard artwork={artwork} />
          <Tooltip title="Delete" arrow>
            <HighlightOffIcon
              className={styles.deleteIcon}
              onClick={() => handleDelete(artwork._id)}
            />
          </Tooltip>
        </div>
      ));
      artworksInCollection.unshift(
        <AddArtwork
          key="addCart"
          artwork={{
            _id: "addCart",
            url: "/addArt.jpg",
            title: "+Add a new creation!!!",
            uploader: username,
          }}
          onClick={() => handleOpenModal("upload")}
        />
      );
      return artworksInCollection;
    } else if (fromLink === "bookmarks") {
      return artworks.map((artwork) => (
        <div key={artwork._id} className={styles.artworkCard}>
          <ArtworkCard artwork={artwork} />
          <BookmarkIcon
            className={styles.bookmarkIcon}
            onClick={() => handleBookmarkClick(artwork._id)}
          />
        </div>
      ));
    } else {
      return artworks.map((artwork) => (
        <ArtworkCard key={artwork._id} artwork={artwork} />
      ));
    }
  };

  const artistsList = artists.map((artist) => (
    <div className={styles.artworkCard}>
      <ArtistCard key={artist._id} artist={artist} />
      <BookmarkIcon
        className={styles.bookmarkArtistIcon}
        onClick={() => handleFollowingClick(artist.username)}
      />
    </div>
  ));

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header onOpenModal={handleOpenModal} />
        </div>
        <div className={styles.container}>
          {isModalOpen && modalType === "signup" && (
            <Signup isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
          {isModalOpen && modalType === "signin" && (
            <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
          {isModalOpen && modalType === "upload" && (
            <ArtworkUpload
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              intoCollection={toDisplay}
            />
          )}
        </div>
        <div>
          { fromLink ==="bookmarks" && <h2 className="titlePage">Artworks in {toDisplay}'s {fromLink} </h2> }
          { fromLink ==="following" && <h2 className="titlePage">Artists in {toDisplay}'s {fromLink}</h2> }
          {fromLink === "following" ? (
            artists.length > 0 ? (
              <div className={styles.artworkList}>{artistsList}</div>
            ) : (
              <p className={styles.noArtworks}>No artists available</p>
            )
          ) : artworks.length > 0 ? (
            <div className={styles.artworkList}>{renderArtworks()}</div>
          ) : (
            <p className={styles.noArtworks}>No artworks available</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ArtworksDisplay;
