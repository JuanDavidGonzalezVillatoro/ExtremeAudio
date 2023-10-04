import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();

export function Resume(props) {
  const { productos, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;
    let shipPrice = 40; //Precio de envío

    forEach(productos, (producto) => {
      const price = fn.calcDiscountedPrice(
        producto.attributes.price,
        producto.attributes.discount
      );
      totalTemp += (price * producto.quantity);
    });

    totalTemp = totalTemp + shipPrice;

    setTotal(totalTemp.toFixed(2));
  }, [productos]);

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.error(result.error.message);
    } else {
      const response = await cartCtrl.paymentCart(
        result.token,
        productos,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        deleteAllItems();
        goToStepEnd();
      } else {
        console.error("Error al realizar el pedido");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(productos, (producto) => (
            <div key={producto.id} className={styles.product}>
              <div>
                <p>{producto.attributes.title}</p>
                <span>{producto.attributes.category.data.attributes.title}</span>
              </div>
              <span>
                Q
                {producto.quantity > 0 && `${producto.quantity}x`}
                {fn.calcDiscountedPrice(
                  producto.attributes.price,
                  producto.attributes.discount
                )}
              </span>
            </div>  
                      
          ))}
          <div className={styles.product}>
              <p>Envío Cargo Expreso - 4 a 5 días</p>
              <span>Q40.00</span>
          </div>
        </div>
        
      </div>

      {/* <div className={styles.block}>
        <div className={styles.products}>
          <div>
            <div className={styles.product}>
              <p>Envío Cargo Expreso - 4 a 5 días</p>
              <span>Q40.00</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>Q{total}</span>
        </div>

        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}