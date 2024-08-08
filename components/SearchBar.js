import { useState } from 'react';
import { TextField, InputAdornment, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/SearchBar.module.css'; // Importez les styles

const SearchBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCategorySelect = (category) => {
        setCategory(category);
        handleMenuClose();
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = query.trim();
        if (searchQuery.length >= 3) {
            console.log(`Searching for: ${searchQuery} in category: ${category}`);
        } else {
            console.log('Please enter at least 3 characters.');
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const textFieldStyles = {
        '& .MuiInputBase-input': {
            color: '#D9D9D9',
            fontFamily: 'Khan, sans-serif',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
    };

    const menuItemStyles = {
        fontFamily: 'Khan, sans-serif',
    };

    return (
        <form className="avec-validation" noValidate onSubmit={handleSearch}>
            <Box className={styles.searchBar}>
                <TextField
                    id="oSaisie"
                    name="oSaisie"
                    type="text"
                    variant="outlined"
                    placeholder="Search"
                    aria-label="Saisie de mots clés"
                    value={query}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton className={styles.icon} onClick={handleMenuOpen}>
                                    <MenuIcon sx={{ color: 'white' }} />
                                </IconButton>
                                {category && (
                                    <Box className={styles.categoryText}>
                                        {category}:
                                    </Box>
                                )}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit">
                                    <SearchIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                        className: styles.searchInput
                    }}
                    sx={textFieldStyles}
                />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                        '& .MuiMenuItem-root': menuItemStyles,
                    }}
                >
                    <MenuItem onClick={() => handleCategorySelect('artworks')}>Artworks</MenuItem>
                    <MenuItem onClick={() => handleCategorySelect('artists')}>Artists</MenuItem>
                    <MenuItem onClick={() => handleCategorySelect('tags')}>Tags</MenuItem>
                </Menu>
            </Box>
        </form>
    );
};

export default SearchBar;
