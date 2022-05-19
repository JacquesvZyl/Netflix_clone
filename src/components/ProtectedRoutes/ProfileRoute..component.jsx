import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";

function ProfileRoute({ children }) {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/sign-in" replace />;
  return children;
}

export default ProfileRoute;
