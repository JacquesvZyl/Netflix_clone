import React from "react";
import styles from "./LoadingSpinner.module.scss";

function LoadingSpinner(props) {
  const { width = "120px", stroke = "rgb(223, 58, 52)" } = props;

  return (
    <div className={styles.spinner__container}>
      <svg
        className={styles.spinner}
        viewBox="0 0 50 50"
        style={{ width: width, height: width }}
      >
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          style={{ stroke }}
        ></circle>
      </svg>
    </div>
  );
}

export default LoadingSpinner;
