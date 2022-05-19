import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../../app/data";
import styles from "./Row.module.scss";
import RowPoster from "./RowPoster.component";
import { ReactComponent as LeftArrow } from "../../assets/images/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const fetchMovies = async () => {
      const request = await fetch(`${fetchData.baseUrl}${fetchUrl}`);
      const data = await request.json();
      setMovies(data.results);

      return request;
    };

    fetchMovies();
  }, [fetchUrl]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__btn__container}>
        <button
          className={`${styles.row__scrollBtn} ${styles["row__scrollBtn--left"]} `}
          onClick={() => scroll(-380)}
        >
          <LeftArrow height="60px" width="30px" />
        </button>
        <div className={styles["row__posters"]} ref={ref}>
          {movies.map(
            (movie) =>
              movie.poster_path && (
                <RowPoster
                  isLargeRow={isLargeRow}
                  movie={movie}
                  type={
                    title.toLowerCase().includes("netflix") ? "tv" : "movie"
                  }
                  key={movie.id}
                />
              )
          )}
        </div>
        <button
          className={`${styles.row__scrollBtn} ${styles["row__scrollBtn--right"]} `}
          onClick={() => scroll(380)}
        >
          <RightArrow height="60px" width="30px" />
        </button>
      </div>
    </div>
  );
}

export default Row;
