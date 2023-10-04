import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import styles from "./Basket.module.scss";

export function Basket(props) {
  const { productos } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 50 }, (_, index) => {
  const number = index + 1;
   return { key: number, text: String(number), value: number };
 });

  return (
    <div className={styles.basket}>
      <h2>Carrito</h2>

      <div className={styles.block}>
        {map(productos, (producto) => (
          <div key={producto.id} className={styles.product}>
            <Image src={producto.attributes.cover.data.attributes.url} />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{producto.attributes.title}</p>
                  <p>Categoría: {producto.attributes.category.data.attributes.title}</p>
                </div>

                <Icon
                  name="trash alternate online"
                  link
                  onClick={() => deleteItem(producto.id)}
                />
              </div>

              <div className={styles.quantity}>

              <span>
                  Q
                  {fn.calcDiscountedPrice(
                    producto.attributes.price.toFixed(2),
                    producto.attributes.discount
                  )}
              </span>
              
              <span/>
              
                <Dropdown
                  className="number"
                  options={options}
                  selection
                  value={producto.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(producto.id, data.value)
                  }
                />
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}