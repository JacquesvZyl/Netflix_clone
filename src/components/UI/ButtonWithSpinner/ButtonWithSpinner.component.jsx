import React from "react";
import styles from "./ButtonWithSpinner.module.scss";

function ButtonWithSpinner(props) {
  const { isLoading = false, children, ...restProps } = props;
  return (
    <button
      className={isLoading ? styles.button__loading : undefined}
      disabled={isLoading}
      {...restProps}
    >
      <span className={styles.text}>{children}</span>
      <span className={styles.spinner}></span>
    </button>
  );
}

export default ButtonWithSpinner;
