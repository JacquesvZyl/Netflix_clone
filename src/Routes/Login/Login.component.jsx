import React, { useState } from "react";
import SignUpScreen from "../signUpScreen/SignUpScreen.component";
import styles from "./Login.module.scss";
import logo from "../../assets/images/netflix_logo.png";

function Login() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className={styles.loginScreen}>
      <div className={styles["loginScreen__background"]}>
        <img
          className={styles["loginScreen__logo"]}
          src={logo}
          alt="netflix logo"
        />
        <button
          className={styles["loginScreen__button"]}
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>
        <div className={styles["loginScreen__gradient"]} />
      </div>
      <div className={styles["loginScreen__body"]}>
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited Films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Press the button below to get started!</h3>
            <div className={styles["loginScreen__input"]}>
              <form>
                <button
                  className={styles["loginScreen__getStarted"]}
                  onClick={() => setSignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
