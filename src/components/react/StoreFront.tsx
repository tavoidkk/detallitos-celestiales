import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import ProductModal from "./ProductModal";
import CartDrawer from "./CartDrawer";
import { getProductById } from "../../lib/products";
import {
  addToCart,
  openCart,
  openProductModal,
  productModalProduct,
} from "../../lib/store";

export default function StoreFront() {
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (!detail?.id) return;
      const product = getProductById(detail.id);
      if (product) openProductModal(product);
    };
    const onQuickAdd = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (!detail?.id) return;
      const product = getProductById(detail.id);
      if (product) {
        addToCart(product, 1);
        openCart();
      }
    };
    window.addEventListener("dc:open-product", onOpen);
    window.addEventListener("dc:quick-add", onQuickAdd);

    return () => {
      window.removeEventListener("dc:open-product", onOpen);
      window.removeEventListener("dc:quick-add", onQuickAdd);
    };
  }, []);

  const product = useStore(productModalProduct);

  return (
    <>
      {product && <ProductModal key={product.id} />}
      <CartDrawer />
    </>
  );
}