import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import { Separator } from "@/components/Shared";
import styles from "./StepThree.module.scss";

export function StepThree() {
  return (
    <div className={styles.stepThree}>
    <Separator height={100} />
      <Icon name="check circle outline" />
      <h2>¡Gracias por tu compra!</h2>

      <Button as={Link} href="/account" primary>
        Ver pedido
      </Button>

    <Separator height={100} />
    </div>
  );
}