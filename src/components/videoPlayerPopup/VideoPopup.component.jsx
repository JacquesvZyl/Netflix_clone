import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import { removeTrailerData } from "../../features/trailerSlice";
import VideoInfo from "../VideoInfo/VideoInfo.component";
import styles from "./VideoPopup.module.scss";
const rootElement = document.getElementById("popup-root");

const optsDesktop = {
  playerVars: {
    autoplay: 1,
  },
};
const optsMobile = {
  width: 320,
  height: 160,
  playerVars: {
    autoplay: 1,
  },
};

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onClick} />;
}

function VideoPopup() {
  const [playVideo, setPlayVideo] = useState(false);
  const dispatch = useDispatch();
  const trailer = useSelector((state) => state.trailer.trailerData);

  const onModalClick = () => {
    dispatch(removeTrailerData());
    setPlayVideo(false);
  };
  const onPlayVideo = () => {
    setPlayVideo(true);
  };
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={onModalClick} />
      <div className={styles.modal}>
        {!playVideo && !trailer.isBanner ? (
          <VideoInfo onPlayVideo={onPlayVideo} />
        ) : (
          <YouTube
            videoId={trailer.key}
            opts={window.innerWidth < 640 ? optsMobile : optsDesktop}
          />
        )}
      </div>
    </>,
    rootElement
  );
}

export default VideoPopup;
