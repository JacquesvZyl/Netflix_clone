import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
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
        <img
          className={styles["nav__logo"]}
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix Logo"
        />
        <img
          className={styles["nav__avatar"]}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="netflix avatar"
        />
      </div>
    </div>
  );
}

export default Navbar;
