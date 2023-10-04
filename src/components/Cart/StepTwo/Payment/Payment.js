import { CardElement } from "@stripe/react-stripe-js";
import styles from "./Payment.module.scss";
import { Separator } from "@/components/Shared";

export function Payment() {
  const cardStyle = {
    style: {
      base: {
        color: "#fff",
        fontSize: "16px",
        "::placeholder": {
          color: "#909090",
        },
      },
      invalid: {
        iconColor: '#ff9100',
        color: '#ff9100',
      },
    },
  };

  return (
    <div className={styles.payment}>
      <h2>Métodos de pago</h2>

      <div className={styles.block}>
        <CardElement options={cardStyle} />
      </div>
    </div>
  );
}