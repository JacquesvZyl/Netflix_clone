import React, { useState } from "react";
import SignUpScreen from "../signUpScreen/SignUpScreen.component";
import styles from "./Login.module.scss";
import logo from "../../assets/images/netflix_logo.png";
import LoginSplash from "../../components/loginSplash/LoginSplash.component";

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
        {signIn ? <SignUpScreen /> : <LoginSplash setSignIn={setSignIn} />}
      </div>
    </div>
  );
}

export default Login;
