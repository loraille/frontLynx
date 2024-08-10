import styles from '../styles/User.module.css';
import Header from './Header';
import ArtworkUpload from '../components/ArtworkUpload'
import ArtworkCard from '../components/ArtworkCard';
import CollectionsCard from '../components/CollectionsCard';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { urlBackend } from '../assets/varGlobal'
import { useRouter } from 'next/router';

function User() {
    const router = useRouter();
    const { username } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(username)
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [settings, setSettings] = useState([])
    useEffect(() => {
        fetch(`${urlBackend}/users/${username}`)
            .then(response => response.json())
            .then(data => {
                setSettings(data.userInfo);
                console.log(data.message)
            });
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div className={styles.container}>
                    <div className={styles.infos}>
                        <div className='titlePage'>{settings.username}</div>
                    </div>
                    <div className={styles.collection}>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default User;