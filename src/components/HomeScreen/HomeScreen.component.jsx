import React from "react";
import Banner from "../Banner/Banner.component";
import Navbar from "../navbar/Navbar.component";
import styles from "./homescreen.module.scss";
function HomeScreen() {
  return (
    <div className={styles.homescreen}>
      <Navbar />
      <Banner />
    </div>
  );
}

export default HomeScreen;
