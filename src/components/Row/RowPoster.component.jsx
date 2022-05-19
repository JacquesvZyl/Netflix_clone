import React from "react";
import { useDispatch } from "react-redux";
import { setTrailerData } from "../../features/trailerSlice";
import styles from "./RowPoster.module.scss";

function RowPoster(props) {
  const { id, poster_path, name, original_title, title } = props.movie;
  const dispatch = useDispatch();

  const setTrailer = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/${props.type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    );
    const data = await resp.json();
    if (data.videos.results[0]) {
      const officialTrailer = data.videos.results.find((trailer) => {
        return (
          trailer.name.toLowerCase().includes("official") ||
          trailer.name.toLowerCase().includes("trailer")
        );
      });

      dispatch(
        setTrailerData({
          key: officialTrailer
            ? officialTrailer.key
            : data.videos.results[0].key,
          backdrop_path: data.backdrop_path,
          name: data.name,
          title: data.title,
          original_name: data.original_name,
          overview: data.overview,
          isBanner: false,
        })
      );
    } else {
      alert("This video is currently unavailable. Please try again later");
    }
  };

  return (
    <img
      className={`${styles["row__poster"]} ${
        props.isLargeRow && styles["row__posterLarge"]
      }`}
      src={`https://image.tmdb.org/t/p/w185${poster_path}`}
      alt={name || original_title || title}
      onClick={setTrailer}
    />
  );
}

export default RowPoster;
