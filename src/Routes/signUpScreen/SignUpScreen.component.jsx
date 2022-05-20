import { doc, setDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  db,
  signInWithEmailAndPw,
} from "../../firebase";
import styles from "./SignUpScreen.module.scss";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
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
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const resp = await signInWithEmailAndPw(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/watch");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.signUpScreen}>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className={styles.signUpScreen__gray}>New to Netflix?</span>{" "}
          <span className={styles.signUpScreen__link} onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
