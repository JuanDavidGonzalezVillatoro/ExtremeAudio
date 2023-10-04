import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./GridProductos.module.scss";

export function GridProductos(props) {
  const { wishlist, onReload } = props;

  return (
    <div className={styles.gridProductos}>
      {map(wishlist, (item) => {
        const producto = item.attributes.producto.data;
        const cover = producto.attributes.cover.data;

        return (
          <div key={item.id} className={styles.producto}>
            <Link href={`/${producto.attributes.slug}`}>
              <div>
                <img src={cover.attributes.url} />

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
                    producto.attributes.price,
                    producto.attributes.discount
                  )}
                </span>
              </div>
            </Link>

            <WishlistIcon
              productoId={producto.id}
              className={styles.whislistIcon}
              removeCallback={onReload}
            />
          </div>
        );
      })}
    </div>
  );
}