import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPlans, loadCheckout } from "../../firebase";
import styles from "./Plans.module.scss";
function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const retrievePlans = async () => {
      const data = await getPlans();
      setProducts(data);
    };

    retrievePlans();
  }, []);

  const loadCheckoutHandler = async (priceId, origin) => {
    await loadCheckout(user, priceId, origin);
  };

  return (
    <div className={styles.plans}>
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add logic to check if user sub is active
        return (
          <div className={styles.plansScreen__plan} key={productId}>
            <div className={styles.plansScreen__info}>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                loadCheckoutHandler(
                  productData.prices.priceId,
                  window.location.origin
                )
              }
            >
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
