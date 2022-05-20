import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import {
  addRemoveToList,
  isMovieInList,
  returnMoviesInList,
} from "../../firebase";
import styles from "./VideoInfo.module.scss";
function VideoInfo(props) {
  const user = useSelector(selectUser);
  const movie = useSelector((state) => state.trailer.trailerData);
  console.log(movie);
  const [allMovies, setAllMovies] = useState(null);
  const [isAddedToList, setAddedToList] = useState(false);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n) + "..." : string;
  };

  const addRemoveSavedShows = async () => {
    addRemoveToList(user, movie, isAddedToList);
  };

  useEffect(() => {
    return returnMoviesInList(user, setAllMovies);
  }, [movie?.id]);

  useEffect(() => {
    if (!allMovies) return;
    const checkMovieList = isMovieInList(allMovies, movie);
    setAddedToList(checkMovieList);
  }, [allMovies]);

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
          <button
            className={styles["banner_button"]}
            onClick={addRemoveSavedShows}
          >
            {isAddedToList ? "Remove from list" : "Add to List"}
          </button>
        </div>
        <h1 className={styles["banner_description"]}>
          {truncate(movie?.overview, 200)}{" "}
        </h1>
      </div>
    </div>
  );
}

export default VideoInfo;
