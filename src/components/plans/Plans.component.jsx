import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlan } from "../../features/subScriptionPlanSlice";
import { getSubscription, loadCheckout } from "../../firebase";
import Plan from "../plan/Plan.component";
import styles from "./Plans.module.scss";
function Plans(props) {
  const subscription = useSelector((state) => state.subscription.plan);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSub = async () => {
      const currentsub = await getSubscription(user);
      dispatch(addPlan(currentsub));
    };

    getSub();
  }, [user, dispatch]);

  const loadCheckoutHandler = async (priceId, origin) => {
    try {
      await loadCheckout(user, priceId, origin);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className={styles.plans}>
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {props.products &&
        Object.entries(props.products).map(([productId, productData]) => {
          // TODO: add logic to check if user sub is active

          return (
            <Plan
              subscription={subscription}
              productData={productData}
              productId={productId}
              loadCheckoutHandler={loadCheckoutHandler}
              key={productId}
            />
          );
        })}
    </div>
  );
}

export default Plans;
