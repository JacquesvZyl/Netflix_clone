import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import netflixLogo from "../../assets/images/netflix_logo.png";
import netflixAvatar from "../../assets/images/Netflix_avatar.png";
function Navbar() {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`${styles.nav} ${show && styles["nav__black"]}`}>
      <div className={styles["nav__contents"]}>
        <Link to="/">
          <img
            className={styles["nav__logo"]}
            src={netflixLogo}
            alt="Netflix Logo"
          />
        </Link>
        <Link to="/profile">
          <img
            className={styles["nav__avatar"]}
            src={netflixAvatar}
            alt="netflix avatar"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
