import React from "react";
import styles from "./Banner.module.scss";

function Banner() {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n) + "..." : string;
  };
  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://i.imgur.com/e1hLQ2m.png')`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles["banner__contents"]}>
        <h1 className={styles["banner__title"]}>Movie Name</h1>
        <div className={styles["banner__buttons"]}>
          <button className={styles["banner_button"]}>Play</button>
          <button className={styles["banner_button"]}>My List</button>
        </div>
        <h1 className={styles["banner_description"]}>
          {truncate("Test description", 5)}{" "}
        </h1>
      </div>
      <div className={styles["banner--fadeBottom"]}></div>
    </header>
  );
}

export default Banner;
