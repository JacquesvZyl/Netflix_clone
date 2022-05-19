import { Navigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../features/userSlice";
import { getSubscription, onAuthStateChangeListener } from "../../firebase";
import { addPlan, removePlan } from "../../features/subScriptionPlanSlice";

function SubscriptionRoute({ children }) {
  const dispatch = useDispatch();
  const [savedUser, setSavedUser] = useState(false);
  const [savedSubscription, setSavedSubscription] = useState(false);
  const user = useSelector(selectUser);
  const subscription = useSelector((state) => state.subscription.plan);

  useEffect(() => {
    if (!user) return;
    const getSub = async () => {
      console.log("running");
      const currentsub = await getSubscription(user);
      dispatch(addPlan(currentsub));
      setSavedSubscription(true);
    };

    getSub();
  }, [user, dispatch]);

  useEffect(() => {
    console.log("running useEffect is App.js");
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
        setSavedUser(true);
      } else {
        //logged out
        dispatch(removePlan());
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (savedUser && savedSubscription) {
    if (!user.uid) {
      console.log("no UID can be found. Redirecting to /signIn");
      return <Navigate to="/sign-in" replace />;
    }
    if (!subscription?.role) {
      console.log("no subscription can be found. Redirecting to /profile");
      return <Navigate to="/profile" replace />;
    }
    console.log("UID and subscription found. Redirecting to /watch");
    return children;
  }
  return null;
}

export default SubscriptionRoute;
