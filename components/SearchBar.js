import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/SearchBar.module.css";
import { useRouter } from "next/router";

const SearchBar = () => {
  ////////////////setup/////////////////////////////
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  //////////////open choice menu//////////////////////
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //////////////close choice menu///////////////////
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  /////////////set a category///////////////////////
  const handleCategorySelect = (category) => {
    setCategory(category);
    handleMenuClose();
  };
  /////////////search///////////////////////////////
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery.length >= 3) {
      const searchUrl = `/resultSearch?category=${category}&query=${encodeURIComponent(
        searchQuery
      )}`;
      console.log(searchUrl);
      router.push(searchUrl);
    } else {
      console.log("Please enter at least 3 characters.");
    }
  };
  ////////////////textfield input change////////////////////////////
  const handleInputChange = (event) => {
    setQuery(event.target.value);
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
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
                {category && (
                  <Box className={styles.categoryText}>{category}:</Box>
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon sx={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            ),
            className: styles.searchInput,
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "#D9D9D9",
              fontFamily: "Khand",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "transparent",
              },
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiMenuItem-root": {
              fontFamily: "Khand",
            },
          }}
        >
          <MenuItem onClick={() => handleCategorySelect("artworks")}>
            Artworks
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect("artists")}>
            Artists
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect("tags")}>Tags</MenuItem>
        </Menu>
      </Box>
    </form>
  );
};

export default SearchBar;
