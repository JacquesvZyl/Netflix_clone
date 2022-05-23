import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar.component";
import Plans from "../../components/plans/Plans.component";
import { selectUser } from "../../features/userSlice";
import { getPlans, signOutUser } from "../../firebase";
import { capitalizeFirstLetter } from "../../utils/utilFunctions";
import styles from "./ProfileScreen.module.scss";
import netflixAvatar from "../../assets/images/Netflix_avatar.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.component";
import { toastStyleError } from "../../utils/globalVariables";
import toast from "react-hot-toast";

function ProfileScreen() {
  const [isloading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const user = useSelector(selectUser);
  const subscription = useSelector((state) => state.subscription.plan);

  useEffect(() => {
    const retrievePlans = async () => {
      setLoading(true);
      try {
        const data = await getPlans();
        setProducts(data);
      } catch (error) {
        toast(`⚠ ${error.message}`, {
          duration: 6000,
          style: toastStyleError,
        });
      }
      setLoading(false);
    };

    retrievePlans();
  }, []);

  const logoutUser = async () => {
    await signOutUser();
  };
  return (
    <div className={styles.profileScreen}>
      <Navbar />
      <div className={styles.profileScreen__body}>
        <h1>Edit Profile</h1>
        <div className={styles.profileScreen__info}>
          <img src={netflixAvatar} alt="avatar" />
          <div className={styles.profileScreen__details}>
            <h2>{user.email}</h2>
            <div className={styles.profileScreen__plans}>
              <h3>
                Plans{" "}
                <span>
                  (Current Plan:{" "}
                  {subscription?.role
                    ? capitalizeFirstLetter(subscription.role)
                    : "None"}
                  )
                </span>
              </h3>
              {isloading ? (
                <LoadingSpinner width="265px" />
              ) : (
                <Plans products={products} />
              )}
              <button
                className={styles.profileScreen__signOut}
                onClick={logoutUser}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
