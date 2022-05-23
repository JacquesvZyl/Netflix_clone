import React, { useState } from "react";
import SignInForm from "../../components/SignInForm/SignInForm.component";
import SignUpForm from "../../components/SignUpForm/SignUpForm.component";
import styles from "./SignUpScreen.module.scss";

function SignUpScreen() {
  const [isOnSignInScreen, setSignInScreen] = useState(true);

  const onSignInChangehandler = () => {
    setSignInScreen((val) => !val);
  };

  return (
    <div className={styles.signUpScreen}>
      {isOnSignInScreen ? <SignInForm /> : <SignUpForm />}
      <h4>
        <span className={styles.signUpScreen__gray}>
          {isOnSignInScreen ? "New to Netflix?" : "Already have an account?"}
        </span>{" "}
        <span
          className={styles.signUpScreen__link}
          onClick={onSignInChangehandler}
        >
          {isOnSignInScreen ? "Sign Up now." : "Sign in"}
        </span>
      </h4>
    </div>
  );
}

export default SignUpScreen;
