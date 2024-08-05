import React from 'react';
import { Input, ConfigProvider } from 'antd';
import styles from '../styles/SearchBar.module.css';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SearchBar = () => (

    <div>
        <Search className={styles.main} placeholder="input search text" onSearch={onSearch} enterButton />

    </div>

);

export default SearchBar;
