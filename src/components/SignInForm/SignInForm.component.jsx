import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPw } from "../../firebase";
import ButtonWithSpinner from "../UI/ButtonWithSpinner/ButtonWithSpinner.component";
import styles from "./SignInForm.module.scss";

function SignInForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await signInWithEmailAndPw(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/watch");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <form className={styles.signIn__form}>
      <h1>Sign In</h1>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <ButtonWithSpinner isLoading={isLoading} onClick={signIn}>
        Sign In
      </ButtonWithSpinner>
    </form>
  );
}

export default SignInForm;
