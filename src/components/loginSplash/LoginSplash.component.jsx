import React from "react";
import styles from "./LoginSplash.module.scss";

function LoginSplash(props) {
  return (
    <div className={styles.login__splash}>
      <h1>Unlimited Films, TV programmes and more.</h1>
      <h2>Watch anywhere. Cancel at any time.</h2>
      <h3>Ready to watch? Press the button below to get started!</h3>

      <button
        className={styles["loginScreen__getStarted"]}
        onClick={() => props.setSignIn(true)}
      >
        GET STARTED
      </button>
    </div>
  );
}

export default LoginSplash;
