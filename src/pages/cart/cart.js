import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Producto } from "@/api";
import { CartLayout } from "@/layouts";
import { useCart } from "@/hooks";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";

const productoCtrl = new Producto();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);
  const [productos, setProductos] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productoCtrl.getProductoById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setProductos(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <Seo title="Carrito" />

      <CartLayout>
        {currentStep === 1 && <Cart.StepOne productos={productos} />}
        {currentStep === 2 && <Cart.StepTwo productos={productos} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}