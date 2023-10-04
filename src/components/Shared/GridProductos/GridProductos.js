import Link from "next/link";
import { map } from "lodash";
import { fn } from "@/utils";
import { Label } from "@/components/Shared";
import styles from "./GridProductos.module.scss";

export function GridProductos(props) {
  const { productos } = props;

  return (
    <div className={styles.gridProductos}>
      {map(productos, (producto) => (
        <Link
          key={producto.id}
          href={`/${producto.attributes.slug}`}
          className={styles.producto}
        >
          <div>
            <img src={producto.attributes.cover.data.attributes.url} />
            {producto.attributes.discount > 0 && (
              <Label.Discount className={styles.discount}>
                {`-${producto.attributes.discount}%`}
              </Label.Discount>
            )}
          </div>

          <div>
            <span>{producto.attributes.title}</span>
            
            <span className={styles.price}>
            Q
              {fn.calcDiscountedPrice(
                producto.attributes.price.toFixed(2),
                producto.attributes.discount
              )}
            </span>
          </div>
        </Link>

        
      ))}
    </div>
  );
}