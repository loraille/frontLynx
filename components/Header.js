import React from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';

function Header({ onOpenModal }) {
    const username = useSelector((state) => state.user.value.username);

    return (
        <div className={styles.main}>
            <div className={styles.headerContent}>
                <Link href='/'><span className={styles.h1}> Lynx</span></Link>
                {/* <SearchBar /> */}
            </div>
            <div className={styles.navigation}>
                <Link href="/artists"><span className={styles.link}>Artists</span></Link>
                <Link href="/categories"><span className={styles.link}>Categories</span></Link>
            </div>
            <div className={styles.buttons}>
                {username ? (
                    <div className={styles.user}>{username}</div>
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
