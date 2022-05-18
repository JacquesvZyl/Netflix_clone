import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar.component";
import Plans from "../../components/plans/Plans.component";
import { logout, selectUser } from "../../features/userSlice";
import { signOutUser } from "../../firebase";
import styles from "./ProfileScreen.module.scss";
function ProfileScreen() {
  const user = useSelector(selectUser);

  const logoutUser = async () => {
    await signOutUser();
  };
  return (
    <div className={styles.profileScreen}>
      <Navbar />
      <div className={styles.profileScreen__body}>
        <h1>Edit Profile</h1>
        <div className={styles.profileScreen__info}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />
          <div className={styles.profileScreen__details}>
            <h2>{user.email}</h2>
            <div className={styles.profileScreen__plans}>
              <h3>Plans</h3>
              <Plans />
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
