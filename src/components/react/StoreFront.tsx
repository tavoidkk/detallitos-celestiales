import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import ProductModal from "./ProductModal";
import CartDrawer from "./CartDrawer";
import { getProductById } from "../../lib/products";
import { openProductModal, productModalProduct } from "../../lib/store";

export default function StoreFront() {
  // Wire the custom event from Astro ProductCard buttons
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (!detail?.id) return;
      const product = getProductById(detail.id);
      if (product) openProductModal(product);
    };
    window.addEventListener("dc:open-product", handler);
    return () => window.removeEventListener("dc:open-product", handler);
  }, []);

  // Keep modal in sync with global product state
  const product = useStore(productModalProduct);

  return (
    <>
      {product && <ProductModal key={product.id} />}
      <CartDrawer />
    </>
  );
}