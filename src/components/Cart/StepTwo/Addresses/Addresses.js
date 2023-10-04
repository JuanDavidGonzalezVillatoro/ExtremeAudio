import { useState, useEffect } from "react";
import { add, map } from "lodash";
import classNames from "classnames";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { Separator } from "@/components/Shared";
import { Button } from "semantic-ui-react";
import styles from "./Addresses.module.scss";

const addressCtrl = new Address();

export function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h2>Dirección de entrega</h2>

      <Button primary href="/account">
        Crear nueva dirección
      </Button>

      <Separator height={20} />

      {map(addresses, (address) => (
        <div
          key={address.id}
          onClick={() => setAddressSelected(address)}
          className={classNames(styles.address, {
            [styles.active]: address.id === addressSelected?.id,
          })}
        >
          <p>
            {address.attributes.name} ({address.attributes.title})
          </p>
          <p>
            {address.attributes.address}, {address.attributes.postal_code},{" "}
            {address.attributes.state}, {address.attributes.city}
          </p>
          <br/>
          <p><i class="truck icon"></i> Q40 - Envío Cargo Expreso</p>
        </div>
        
      ))}
    </div>

  );
}