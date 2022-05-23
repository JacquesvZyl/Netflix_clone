import "./App.scss";
import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Routes/HomeScreen/HomeScreen.component";
import Login from "./Routes/Login/Login.component";

import { useSelector } from "react-redux";

import ProfileScreen from "./Routes/profileScreen/ProfileScreen.component";
import VideoPopup from "./components/videoPlayerPopup/VideoPopup.component";

import SubscriptionRoute from "./components/ProtectedRoutes/SubscriptionRoute.component";
import ProfileRoute from "./components/ProtectedRoutes/ProfileRoute..component";
import { Toaster } from "react-hot-toast";

function App() {
  const trailer = useSelector((state) => state.trailer.trailerData);

  return (
    <div className="App">
      {trailer && <VideoPopup />}

      <Routes>
        {/*     <Route
          path="/"
          element={
            subscription?.role ? (
              <HomeScreen />
            ) : (
              <Navigate replace to="/profile" />
            )
          }
        /> */}
        <Route
          path="/watch"
          element={
            <SubscriptionRoute>
              <HomeScreen />
            </SubscriptionRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileRoute>
              <ProfileScreen />
            </ProfileRoute>
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/watch" />} />
      </Routes>
      <Toaster position="bottom center" />
    </div>
  );
}

export default App;
