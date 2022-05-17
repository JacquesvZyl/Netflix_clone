import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../app/data";

import { setTrailerData } from "../../features/trailerSlice";
import styles from "./Banner.module.scss";

function Banner() {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      let selectedMovie;
      const request = await fetch(
        `${fetchData.baseUrl}${fetchData.fetchNetflixOriginals}`
      );
      const data = await request.json();

      while (!selectedMovie || !selectedMovie.backdrop_path) {
        selectedMovie =
          data.results[Math.floor(Math.random() * data.results.length - 1)];
      }
      console.log(selectedMovie);

      setMovie(selectedMovie);

      return request;
    };

    fetchMovie();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n) + "..." : string;
  };

  const setTrailer = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    );
    const data = await resp.json();
    console.log(data);
    data.videos.results[0]
      ? dispatch(
          setTrailerData({ key: data.videos.results[0].key, isBanner: true })
        )
      : alert("No video Found");
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
          <button className={styles["banner_button"]} onClick={setTrailer}>
            Play
          </button>
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
