import React, { useEffect, useState } from "react";
import { fetchData } from "../../app/data";
import styles from "./Banner.module.scss";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const request = await fetch(
        `${fetchData.baseUrl}${fetchData.fetchNetflixOriginals}`
      );
      const data = await request.json();
      console.log(data);
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );

      return request;
    };

    fetchMovie();
  }, []);
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n) + "..." : string;
  };
  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles["banner__contents"]}>
        <h1 className={styles["banner__title"]}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles["banner__buttons"]}>
          <button className={styles["banner_button"]}>Play</button>
          <button className={styles["banner_button"]}>My List</button>
        </div>
        <h1 className={styles["banner_description"]}>
          {truncate(movie?.overview, 200)}{" "}
        </h1>
      </div>
      <div className={styles["banner--fadeBottom"]}></div>
    </header>
  );
}

export default Banner;
