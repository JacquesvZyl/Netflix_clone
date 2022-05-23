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
      const currentsub = await getSubscription(user);
      dispatch(addPlan(currentsub));
      setSavedSubscription(true);
    };

    getSub();
  }, [user, dispatch]);

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
      setSavedUser(true);
    });

    return unsubscribe;
  }, [dispatch]);

  if (savedUser) {
    if (!user) {
      return <Navigate to="/sign-in" replace />;
    }
    if (savedSubscription) {
      if (!subscription?.role) {
        return <Navigate to="/profile" replace />;
      }

      return children;
    }
  }
  return null;
}

export default SubscriptionRoute;
