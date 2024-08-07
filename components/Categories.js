import styles from '../styles/Categories.module.css';
import { useState } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';


function Categories() {
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

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
                </div>
                <div className={styles.featuredSection}>
                    <h1 className={styles.title}>Categories</h1>
                </div>
            </main>
        </div>
    );
}

export default Categories;
