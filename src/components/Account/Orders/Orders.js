import { useState, useEffect } from "react";
import { map, size } from "lodash";
import { Order as OrderCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { Order } from "./Order";

const orderCtrl = new OrderCtrl();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();
  
  const hasOrders = size(orders) > 0;

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //if (!orders) return <NoResult text="Aún no tienes ningún pedido"/>;

  return size(orders) === 0 ? (
    <NoResult text="Aún no tienes ningún pedido" />
  ) : (
    <div>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );

  // return (
  //   <div>
  //     {map(orders, (order) => (
  //       <Order key={order.id} order={order} />
  //     ))}
  //   </div>
  // );
}