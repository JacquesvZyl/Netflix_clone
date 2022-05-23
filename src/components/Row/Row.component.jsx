import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../../app/data";
import styles from "./Row.module.scss";
import RowPoster from "./RowPoster.component";
import { ReactComponent as LeftArrow } from "../../assets/images/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";
import { returnArrayOfMoviesInList } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";
import { toastStyleError } from "../../utils/globalVariables";

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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!fetchUrl) return;
    const fetchMovies = async () => {
      let request;
      try {
        setLoading(true);
        request = await fetch(`${fetchData.baseUrl}${fetchUrl}`);
        const data = await request.json();
        const moviesWithType = data.results.map((movieArr) => {
          return {
            ...movieArr,
            media_type: type,
          };
        });
        setMovies(moviesWithType);
      } catch (error) {
        toast(`⚠ ${error.message}`, {
          duration: 6000,
          style: toastStyleError,
        });
      }
      setLoading(false);
      return request;
    };

    fetchMovies();
  }, [fetchUrl, type]);

  useEffect(() => {
    if (!isMyList) return;

    returnArrayOfMoviesInList(user, setMovies);
  }, [isMyList, user]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const isListEmpty = isMyList && movies.length === 0;

  const moviePosterArray = movies.map(
    (movie) =>
      movie.poster_path && (
        <RowPoster isLargeRow={isLargeRow} movie={movie} key={movie.id} />
      )
  );

  const showData = isLoading ? <LoadingSpinner /> : moviePosterArray;

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
            showData
          ) : (
            <span className={styles.row__empty}>
              You have not added any titles yet
            </span>
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
