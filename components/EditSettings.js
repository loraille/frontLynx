import styles from '../styles/EditSettings.module.css';
import { useState, useEffect } from 'react';
import SignIn from './SignIn';
import Signup from './Signup';
import Header from './Header';
import { useSelector } from 'react-redux';
import { urlBackend } from '../assets/varGlobal';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Image from 'next/image';

function EditSettings() {
    //////////////////////////////////Modale/////////////////////////////////

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
    ///////////////Recuperation des setings///////////////////////////////
    const username = useSelector(state => state.user.value.username)
    console.log(username)
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        fetch(`${urlBackend}/users/${username}`)
            .then(response => response.json())
            .then(data => {
                setSettings(data.userInfo);
            });
    }, []);
    console.log(settings)

    ///////////////Fonction de modification///////////////////////////////
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    const UploadButton = styled(Button)(({ theme }) => ({
        cursor: 'pointer',
        border: '1px solid rgb(255, 255, 255)',
        fontFamily: '"Khand"',
        fontSize: '14px',
        color: 'rgb(254, 184, 48)',
        padding: '5px 15px',
        transition: 'all 327ms ease 0s',
        width: 'auto',
        boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 0px',
        borderRadius: '9px',
        background: 'rgb(66, 65, 65)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            color: 'rgb(255, 255, 255)',
            background: 'rgb(254, 184, 48)',
            borderColor: 'rgb(255, 255, 255)',
        },
    }));
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        if (settings.bio) {
            setBio(settings.bio);
        }
        if (settings.avatarUrl) {
            setAvatarUrl(settings.avatarUrl);
        }
        if (settings.bannerUrl) {
            setBannerUrl(settings.bannerUrl);
        }
    }, [settings]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = () => {
        setIsEditing(false);
        // fetch
    };

    const handleFileChange = (event, setUrl) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.header}>
                    <Header onOpenModal={handleOpenModal} />
                </div>
                <div>
                    <h1 className='titlePage'>My Settings</h1>
                </div>
                <div className={styles.container}>
                    {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                    {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}

                    <div className={styles.settings}>
                        <div>username:{settings.username}</div>
                        <div>email:{settings.email}</div>
                        <div>password</div>
                        <div className={styles.inline}>avatar:<UploadButton
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, setAvatarUrl)} />
                        </UploadButton></div>
                        <div className={styles.inline}>banner:<UploadButton
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, setBannerUrl)} />
                        </UploadButton></div>

                        <div>bio</div>
                        <div className={styles.bioContainer}>
                            {isEditing ? (
                                <textarea
                                    id={styles.scrollbar1}
                                    className={`${styles.bioText} ${styles.inputField}`}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            ) : (
                                <div className={styles.bioText} id={styles.scrollbar1}>
                                    {bio ? bio : 'Add your bio'}
                                </div>
                            )}
                            {isEditing ? (
                                <DoneIcon onClick={handleUpdateClick} className={styles.icon} />
                            ) : (
                                <EditIcon onClick={handleEditClick} className={styles.icon} />
                            )}
                        </div>
                        <button
                            id="create"
                            className={`button ${styles.validate}`}
                            onClick={() => handleUpload()}
                        >
                            Update!
                        </button>
                    </div>
                    <div className={styles.imgZone}>
                        <span className='title'>Banner</span>
                        {bannerUrl ? (
                            <div className={styles.imageContainer}>
                                <Image
                                    src={bannerUrl}
                                    alt="a modifier"
                                    width={1000}
                                    height={120}
                                />
                            </div>
                        ) : (
                            <div className={styles.imageContainer}>
                                <span>Add your banner</span>
                            </div>
                        )}
                        <div><span className='title'>Avatar</span></div>
                        {avatarUrl ? (
                            <div className={styles.imageAvatar}>
                                <Image
                                    src={avatarUrl}
                                    alt="a modifier"
                                    width={300}
                                    height={300}
                                    objectFit="cover"
                                />
                            </div>
                        ) : (
                            <div className={styles.imageAvatar}>
                                <span>Add your avatar</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditSettings;

