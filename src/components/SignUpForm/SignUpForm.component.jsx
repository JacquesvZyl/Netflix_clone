import { doc, setDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthUserWithEmailAndPassword, db } from "../../firebase";
import ButtonWithSpinner from "../UI/ButtonWithSpinner/ButtonWithSpinner.component";
import styles from "./SignUpForm.module.scss";

function SignUpForm() {
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value)
        throw new Error("Passwords do not match");
      const resp = await createAuthUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(resp);
      await setDoc(doc(db, "customers", resp.user.uid), {
        myList: [],
      });
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <form className={styles.signUp__form}>
      <h1>Sign Up</h1>
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm Password"
      />
      <ButtonWithSpinner isLoading={isLoading} onClick={register}>
        Sign Up
      </ButtonWithSpinner>
    </form>
  );
}

export default SignUpForm;
