import "./App.scss";
import React, { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Routes/HomeScreen/HomeScreen.component";
import Login from "./Routes/Login/Login.component";
import { onAuthStateChangeListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./Routes/profileScreen/ProfileScreen.component";
import VideoPopup from "./components/videoPlayerPopup/VideoPopup.component";

function App() {
  const user = useSelector(selectUser);
  const trailer = useSelector((state) => state.trailer.trailerData);
  console.log(trailer);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in App useEffect");
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        //logged in
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        //logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      {trailer && <VideoPopup />}
      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={user ? <HomeScreen /> : <Login />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
