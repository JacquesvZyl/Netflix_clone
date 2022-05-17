import React from "react";
import { useDispatch } from "react-redux";
import { setTrailerKey } from "../../features/trailerSlice";
import styles from "./RowPoster.module.scss";

function RowPoster(props) {
  const { id, poster_path, name, original_title, title, isLargeRow } =
    props.movie;
  const dispatch = useDispatch();

  const setTrailerData = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/${props.type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    );
    const data = await resp.json();
    console.log(data);
    data.videos.results[0]
      ? dispatch(setTrailerKey(data.videos.results[0].key))
      : alert("No video Found");
  };

  return (
    <img
      className={`${styles["row__poster"]} ${
        isLargeRow && styles["row__posterLarge"]
      }`}
      key={id}
      src={`https://image.tmdb.org/t/p/w185${poster_path}`}
      alt={name || original_title || title}
      onClick={setTrailerData}
    />
  );
}

export default RowPoster;
