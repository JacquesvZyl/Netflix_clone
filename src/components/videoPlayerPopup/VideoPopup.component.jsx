import React from "react";
import * as ReactDOM from "react-dom";
import YouTube from "react-youtube";
import styles from "./VideoPopup.module.scss";
const rootElement = document.getElementById("popup-root");

const opts = {
  playerVars: {
    autoplay: 1,
  },
};

function VideoPopup(props) {
  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={props.onClick}>
      <YouTube videoId={props.videoId} opts={opts} />
    </div>,
    rootElement
  );
}

export default VideoPopup;
