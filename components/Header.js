import React from 'react';
import styles from '../styles/Header.module.css';
import Link from 'next/link';

function Header({ onOpenModal }) {
    return (
        <div className={styles.main}>
            <div className={styles.headerContent}>
                <h1 className={styles.h1}>Lynx</h1>
                {/* <SearchBar /> */}
            </div>
            <div className={styles.navigation}>
                <Link href="/artists"><span className={styles.link}>Artists</span></Link>
                <Link href="/bookmarks"><span className={styles.link}>Categories</span></Link>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button} onClick={onOpenModal}>Sign Up</div>
                <div className={styles.button}>Sign In</div>
            </div>
        </div>
    );
}

export default Header;
