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

  const onClickHandler = async () => {
    if (!isCurrentPackage) {
      setLoading(true);
      await loadCheckoutHandler(
        productData.prices.priceId,
        window.location.origin
      );
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isCurrentPackage && styles["plansScreen__plan--disabled"]
      } ${styles.plansScreen__plan}`}
      key={productId}
    >
      <div className={styles.plansScreen__info}>
        <h5>{productData.name}</h5>
        <h6>{productData.description}</h6>
      </div>
      <button onClick={onClickHandler}>
        {isLoading ? <LoadingSpinner width="20px" /> : currentPackage}
      </button>
    </div>
  );
}

export default Plan;
