import styles from "../styles/Categories.module.css";
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";
import ArtworkUpload from "./ArtworkUpload";
import Header from "./Header";
import CategoriesCard from "./CategoriesCard";
import { urlBackend } from "../modules/utils";

function Categories() {
  //////////////////////////////////Modale/////////////////////////////////
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
  ///////////////Recuperation des catgories///////////////////////////////
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${urlBackend}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);
  ////////////////Mappage des categories//////////////////////////////////
  const listCategoriesCard = categories.map((category) => {
    return <CategoriesCard key={category._id} category={category} />;
  });
  ////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header onOpenModal={handleOpenModal} />
        </div>
        <div className={styles.container}>
          {modalType === "signup" && (
            <Signup isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
          {modalType === "signin" && (
            <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
          {modalType === "upload" && (
            <ArtworkUpload isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
          <div>
            <h2 className="titlePage">Categories</h2>
          </div>
          <div className={styles.cardContainer}>{listCategoriesCard}</div>
        </div>
      </main>
    </div>
  );
}

export default Categories;
