import React from 'react'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/user'
import { useRouter } from 'next/router'
import SearchBar from './SearchBar'

import Modal from './ArtworkUpload'; //DEMO

function Header({ onOpenModal }) {

    const dispatch = useDispatch()
    const username = useSelector((state) => state.user.value.username)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    /// DEMO 
    const handleUploadArtwork = (event) => {
        handleClose();
        console.log("Create -> Upload an artwork", event.currentTarget);
        setIsModalOpen(true);
    };
    /// OMED

    const handleClose = () => {
        setAnchorEl(null)
    };

    const handleSettings = () => {
        handleClose()
        router.push('/editSettings')
    }


    const handleCollection = () => {
        handleClose()
        router.push('/collections')
    }

    const handleProfile = () => {
        handleClose()
        router.push(`/user?username=${username}`)
    }

    const handleLogout = () => {
        handleClose()
        dispatch(logout())
        router.push('/')
    }

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
                            {username}
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
                            <MenuItem onClick={handleUploadArtwork}>Create</MenuItem> {/*DEMO*/}
                            <MenuItem onClick={handleCollection}>My Collections</MenuItem>
                            <MenuItem onClick={handleClose}>My Followings</MenuItem>
                            <MenuItem onClick={handleClose}>My Bookmarks</MenuItem>
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