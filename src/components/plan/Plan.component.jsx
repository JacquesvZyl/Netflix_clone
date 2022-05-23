import React, { useState } from "react";
import toast from "react-hot-toast";
import { toastStyleError } from "../../utils/globalVariables";

import ButtonWithSpinner from "../UI/ButtonWithSpinner/ButtonWithSpinner.component";
import styles from "./Plan.module.scss";

function Plan(props) {
  const {
    subscription,
    productData,
    productId,
    loadCheckoutHandler,
    onLoadHandler,
    loading,
  } = props;
  const [isLoading, setLoading] = useState(false);

  const isCurrentPackage = productData.name
    ?.toLowerCase()
    .includes(subscription?.role);

  const currentPackage = isCurrentPackage ? "Current Package" : "Subscribe";

  const onClickHandler = async () => {
    if (!isCurrentPackage) {
      setLoading(true);
      onLoadHandler(true);
      try {
        await loadCheckoutHandler(
          productData.prices.priceId,
          window.location.origin
        );
      } catch (error) {
        setLoading(false);
        onLoadHandler(false);
        toast(`⚠ ${error.message}`, {
          duration: 6000,
          style: toastStyleError,
        });
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
      <ButtonWithSpinner
        isLoading={isLoading}
        onClick={onClickHandler}
        disabled={loading}
      >
        {currentPackage}
      </ButtonWithSpinner>
    </div>
  );
}

export default Plan;
