import React, { useState } from "react";
import SignUpScreen from "../signUpScreen/SignUpScreen.component";
import styles from "./Login.module.scss";

function Login() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className={styles.loginScreen}>
      <div className={styles["loginScreen__background"]}>
        <img
          className={styles["loginScreen__logo"]}
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
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
            <h3>
              Ready to watch? Enter your e-mail to create or restart your
              membership
            </h3>
            <div className={styles["loginScreen__input"]}>
              <form>
                <input type="email" placeholder="Email Address" />
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
