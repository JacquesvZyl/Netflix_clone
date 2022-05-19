import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";
import styles from "./Plan.module.scss";

function Plan(props) {
  const { subscription, productData, productId, loadCheckoutHandler } = props;
  const [isLoading, setLoading] = useState(false);

  const isCurrentPackage = productData.name
    ?.toLowerCase()
    .includes(subscription?.role);

  const currentPackage = isCurrentPackage ? "Current Package" : "Subscribe";
  console.log("plan running");
  const onClickHandler = async () => {
    if (!isCurrentPackage) {
      setLoading(true);
      try {
        await loadCheckoutHandler(
          productData.prices.priceId,
          window.location.origin
        );
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    }
  };

  return (
    <div
      className={`${
        isCurrentPackage ? styles["plansScreen__plan--disabled"] : undefined
      } ${styles.plansScreen__plan}`}
      key={productId}
    >
      <div className={styles.plansScreen__info}>
        <h5>{productData.name}</h5>
        <h6>{productData.description}</h6>
      </div>
      <button
        className={isLoading ? styles.button__loading : undefined}
        onClick={onClickHandler}
        disabled={isLoading}
      >
        <span className={styles.text}>{currentPackage}</span>
        <span className={styles.spinner}></span>
      </button>
    </div>
  );
}

export default Plan;
