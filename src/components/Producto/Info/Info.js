import { Container } from "semantic-ui-react";
import styles from "./Info.module.scss";
import Category from "@/pages/productos/[category]";

export function Info(props) {
  const { producto } = props;

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
        <p><span>{producto.title}</span>
        <p></p>{producto.summary}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>Código del producto:</span>
          </li>
          <li>
            {producto.slug}
          </li>
        </ul>
      </div>
    </Container>
  );
}