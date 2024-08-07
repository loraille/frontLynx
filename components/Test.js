import React, { useState } from 'react';
import Modal from './ArtworkUpload';
import styles from '../styles/Test.module.css';

function Test() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.main}>
            <button onClick={handleOpenModal} className={styles.btn}>
                Open Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Test;
