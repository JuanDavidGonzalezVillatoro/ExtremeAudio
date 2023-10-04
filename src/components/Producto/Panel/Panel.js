import { useState } from "react";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import styles from "./Panel.module.scss";

export function Panel(props) {
  const { productoId, producto } = props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  //const category = producto.category.data;
  const buyPrice = fn.calcDiscountedPrice(producto.price.toFixed(2), producto.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(productoId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContiner}>
        <Image src={producto.cover.data.attributes.url} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{producto.title}</h2>

          {/* <div className={styles.moreInfo}>
            <span>
              <Image src={category.attributes.icon.data.attributes.url} />
              {category.attributes.title}
            </span>
            <span>
              <Icon name="check" />
              En stock
            </span>
          </div> */}

          <div className={styles.price}>
            {producto.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  Q{producto.price}
                </span>
                <span className={styles.discount}>-{producto.discount}%</span>
              </>
            )}

            <span className={styles.price}>Q{buyPrice}</span>
          </div>

          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Agregar al carrito
          </Button>

          <WishlistIcon productoId={productoId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}