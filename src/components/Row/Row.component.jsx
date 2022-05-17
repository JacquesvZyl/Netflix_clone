import React, { useEffect, useState } from "react";
import { fetchData } from "../../app/data";
import styles from "./Row.module.scss";
import RowPoster from "./RowPoster.component";

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
            movie.poster_path && (
              <RowPoster
                movie={movie}
                type={title.toLowerCase().includes("netflix") ? "tv" : "movie"}
                key={movie.id}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
