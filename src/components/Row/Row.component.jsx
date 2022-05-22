import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../../app/data";
import styles from "./Row.module.scss";
import RowPoster from "./RowPoster.component";
import { ReactComponent as LeftArrow } from "../../assets/images/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";
import { returnArrayOfMoviesInList } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Row({
  title,
  fetchUrl = false,
  isLargeRow = false,
  isMyList = false,
  type,
}) {
  const [movies, setMovies] = useState([]);
  const ref = useRef();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!fetchUrl) return;
    const fetchMovies = async () => {
      const request = await fetch(`${fetchData.baseUrl}${fetchUrl}`);
      const data = await request.json();
      const moviesWithType = data.results.map((movieArr) => {
        return {
          ...movieArr,
          media_type: type,
        };
      });
      setMovies(moviesWithType);

      return request;
    };

    fetchMovies();
  }, [fetchUrl]);

  useEffect(() => {
    if (!isMyList) return;

    returnArrayOfMoviesInList(user, setMovies);
  }, [isMyList]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const isListEmpty = isMyList && movies.length == 0;

  const moviePosterArray = movies.map(
    (movie) =>
      movie.poster_path && (
        <RowPoster isLargeRow={isLargeRow} movie={movie} key={movie.id} />
      )
  );

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__btn__container}>
        <button
          className={`${styles.row__scrollBtn} ${styles["row__scrollBtn--left"]} `}
          onClick={() => scroll(-380)}
        >
          <LeftArrow height="100%" width="100%" />
        </button>
        <div
          className={`${styles.row__posters} ${
            isListEmpty ? styles.empty__list : undefined
          }`}
          ref={ref}
        >
          {!isListEmpty ? (
            moviePosterArray
          ) : (
            <span>You have not added any shows or movies yet</span>
          )}
        </div>
        <button
          className={`${styles.row__scrollBtn} ${styles["row__scrollBtn--right"]} `}
          onClick={() => scroll(380)}
        >
          <RightArrow height="100%" width="100%" />
        </button>
      </div>
    </div>
  );
}

export default Row;
