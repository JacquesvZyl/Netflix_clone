import React from "react";
import { useSelector } from "react-redux";
import styles from "./VideoInfo.module.scss";
function VideoInfo(props) {
  const movie = useSelector((state) => state.trailer.trailerData);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n) + "..." : string;
  };

  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/w780/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles["banner__contents"]}>
        <h1 className={styles["banner__title"]}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles["banner__buttons"]}>
          <button
            className={styles["banner_button"]}
            onClick={props.onPlayVideo}
          >
            Play
          </button>
          <button className={styles["banner_button"]}>My List</button>
        </div>
        <h1 className={styles["banner_description"]}>
          {truncate(movie?.overview, 200)}{" "}
        </h1>
      </div>
    </div>
  );
}

export default VideoInfo;
