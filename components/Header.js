import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { urlBackend } from '../assets/varGlobal';
import SearchBar from './SearchBar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Modal from './ArtworkUpload'; // DEMO

function Header({ onOpenModal }) {
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.value.username);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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

    const handleUploadArtwork = (event) => {
        handleClose();
        console.log("Create -> Upload an artwork", event.currentTarget);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFollowings = () => {
        handleClose();
        router.push(`/artworksDisplay/?fromLink=following&toDisplay=${username}`);
    };

    const handleBookmarks = () => {
        handleClose();
        router.push(`/artworksDisplay/?fromLink=bookmarks&toDisplay=${username}`);
    };

    const handleSettings = () => {
        handleClose();
        router.push('/editSettings');
    };

    const handleCollection = () => {
        handleClose();
        router.push('/collections');
    };

    const handleProfile = () => {
        handleClose();
        router.push(`/user?username=${username}`);
    };

    const handleLogout = () => {
        handleClose();
        dispatch(logout());
        router.push('/');
    };

    return (
        <div className={styles.main}>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            <div className={styles.headerContent}>
                <Link href='/'><span className={styles.h1}> Lynx</span></Link>
                <SearchBar />
            </div>
            <div className={styles.navigation}>
                <Link href="/artists"><span className={styles.link}>Artists</span></Link>
                <Link href="/categories"><span className={styles.link}>Categories</span></Link>
            </div>
            <div className={styles.buttons}>
                {username ? (
                    <>
                        <div className={styles.user} onClick={handleClick}>
                            {userInfo && userInfo.avatarUrl ? (
                                <Image
                                    src={userInfo.avatarUrl}
                                    alt={userInfo.username}
                                    width={65}
                                    height={65}
                                    objectFit="cover"
                                    className={`${styles.image}`}
                                />
                            ) : (
                                <PermIdentityIcon className={styles.placeholder} />
                            )}
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                            <MenuItem onClick={() => {
                                onOpenModal('upload')
                                handleClose()
                            }}>Create</MenuItem> {/* DEMO */}
                            <MenuItem onClick={handleCollection}>My Collections</MenuItem>
                            <MenuItem onClick={handleFollowings}>My Followings</MenuItem>
                            <MenuItem onClick={handleBookmarks}>My Bookmarks</MenuItem>
                            <MenuItem onClick={handleSettings}>My Settings</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <div className={styles.button} onClick={() => onOpenModal('signup')}>Sign Up</div>
                        <div className={styles.button} onClick={() => onOpenModal('signin')}>Sign In</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
