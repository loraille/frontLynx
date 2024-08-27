import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "../reducers/user";
import { urlBackend } from "../modules/utils";
import SearchBar from "./SearchBar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Modal from "./ArtworkUpload";

function Header({ onOpenModal }) {
  /////////////////////for modal//////////////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  ////////////////////Setup////////////////////////////////////////////
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value.username);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  /////////////// Fetch user info when user logged////////////////////
  useEffect(() => {
    if (username) {
      fetch(`${urlBackend}/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setUserInfo(data.userInfo);
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }
  }, [username]);
  //////////////////close avatar's menu////////////////////////
  const handleClose = () => {
    setAnchorEl(null);
  };
  //////////////////////logout avatar's menu//////////////////
  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Lynx</title>
        <meta name="description" content="Lynx artists & artworks platform" />
        <meta
          name="keywords"
          content="art, artists, artworks, platform, Lynx"
        />
        <meta name="author" content="Lynx no owners" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Language" content="en" />
      </Head>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className={styles.headerContent}>
        <Link href="/">
          <span className={styles.h1}> Lynx</span>
        </Link>
        <SearchBar className={styles.searchBar} />
      </div>

      <div className={styles.navigation}>
        <Link href="/artists">
          <span className={styles.link}>Artists</span>
        </Link>
        <Link href="/categories">
          <span className={styles.link}>Categories</span>
        </Link>
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
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href={`/user?username=${username}`} passHref>
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    My Profile
                  </a>
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onOpenModal("upload");
                  handleClose();
                }}
              >
                Create
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/collections" passHref>
                  <a className={styles.menu}>My Collections</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href={`/artworksDisplay/?fromLink=following&toDisplay=${username}`}
                  passHref
                >
                  <a className={styles.menu}>My Followings</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href={`/artworksDisplay/?fromLink=bookmarks&toDisplay=${username}`}
                  passHref
                >
                  <a className={styles.menu}>My Bookmarks</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/editSettings" passHref>
                  <a className={styles.menu}>My Settings</a>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <div className="button" onClick={() => onOpenModal("signup")}>
              Sign Up
            </div>
            <div className="button" onClick={() => onOpenModal("signin")}>
              Sign In
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
