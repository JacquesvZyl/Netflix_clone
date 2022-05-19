import "./App.scss";
import React, { useEffect } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./Routes/HomeScreen/HomeScreen.component";
import Login from "./Routes/Login/Login.component";
import { onAuthStateChangeListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./Routes/profileScreen/ProfileScreen.component";
import VideoPopup from "./components/videoPlayerPopup/VideoPopup.component";
import { removePlan } from "./features/subScriptionPlanSlice";

function App() {
  const user = useSelector(selectUser);
  const subscription = useSelector((state) => state.subscription.plan);
  console.log(subscription);
  const trailer = useSelector((state) => state.trailer.trailerData);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
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
        dispatch(removePlan());
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
          <Route
            path="/"
            element={
              subscription?.role ? (
                <HomeScreen />
              ) : (
                <Navigate replace to="/profile" />
              )
            }
          />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
