import React, { useEffect, useState } from "react";
import { fetchData } from "../../app/data";
import styles from "./Row.module.scss";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const request = await fetch(`${fetchData.baseUrl}${fetchUrl}`);
      const data = await request.json();
      setMovies(data.results);

      return request;
    };

    fetchMovies();
  }, [fetchUrl]);
  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles["row__posters"]}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`${styles["row__poster"]} ${
                  isLargeRow && styles["row__posterLarge"]
                }`}
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.name || movie.original_title || movie.title}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
