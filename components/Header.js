import React from 'react';
import styles from '../styles/Header.module.css';
import SearchBar from './SearchBar';


function Header() {
    return (
        <div className={styles.main}>
            <div className={styles.headerContent}>
                <h1 className={styles.h1}>Lynx</h1>
                {/* <SearchBar /> */}
            </div>
            <div className={styles.navigation}>
                <div>Artists</div>
                <div>Categories</div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button}>Sign Up</div>
                <div className={styles.button}>Sign In</div>
            </div>
        </div>
    );
}

export default Header;
