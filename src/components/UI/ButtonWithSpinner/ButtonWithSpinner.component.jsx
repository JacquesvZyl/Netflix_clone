import React from "react";
import styles from "./ButtonWithSpinner.module.scss";

function ButtonWithSpinner(props) {
  const { isLoading = false, children } = props;
  return (
    <button
      className={isLoading ? styles.button__loading : undefined}
      disabled={isLoading}
      {...props}
    >
      <span className={styles.text}>{children}</span>
      <span className={styles.spinner}></span>
    </button>
  );
}

export default ButtonWithSpinner;
