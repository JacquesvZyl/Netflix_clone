import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../app/data";

import { setTrailerData } from "../../features/trailerSlice";
import { selectUser } from "../../features/userSlice";
import {
  addRemoveToList,
  isMovieInList,
  returnMoviesInList,
} from "../../firebase";
import { toastStyleError } from "../../utils/globalVariables";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";
import styles from "./Banner.module.scss";

function Banner({ type }) {
  const [movie, setMovie] = useState([]);
  const [allMovies, setAllMovies] = useState(null);
  const [isAddedToList, setAddedToList] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchMovie = async () => {
      let request;
      setLoading(true);
      try {
        let selectedMovie;
        request = await fetch(
          `${fetchData.baseUrl}${fetchData.fetchNetflixOriginals}`
        );
        const data = await request.json();

        while (!selectedMovie || !selectedMovie.backdrop_path) {
          selectedMovie =
            data.results[Math.floor(Math.random() * data.results.length - 1)];
        }

        const finalMovieData = { ...selectedMovie, media_type: type };
        setMovie(finalMovieData);
      } catch (error) {
        toast(`${error.message}`, {
          duration: 6000,
          style: toastStyleError,
        });
      }
      setLoading(false);
      return request;
    };

    fetchMovie();
  }, [type]);

  useEffect(() => {
    return returnMoviesInList(user, setAllMovies);
  }, [movie?.id, user]);

  useEffect(() => {
    if (!allMovies) return;
    const checkMovieList = isMovieInList(allMovies, movie);
    setAddedToList(checkMovieList);
  }, [allMovies, movie]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n) + "..." : string;
  };

  const addRemoveSavedShows = async () => {
    addRemoveToList(user, movie, isAddedToList);
  };

  const setTrailer = async () => {
    try {
      const resp = await fetch(
        `https://api.themoviedb.org/3/${type}/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
      );
      const data = await resp.json();

      data.videos.results[0]
        ? dispatch(
            setTrailerData({ key: data.videos.results[0].key, isBanner: true })
          )
        : toast(`This title is not currently available`, {
            duration: 6000,
            style: toastStyleError,
          });
    } catch (error) {
      toast(`${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
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
          <button className={styles["banner_button"]} onClick={setTrailer}>
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
      <div className={styles["banner--fadeBottom"]}></div>
    </header>
  );
}

export default Banner;
