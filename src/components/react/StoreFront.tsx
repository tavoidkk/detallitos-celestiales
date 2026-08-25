import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { ShoppingCart } from "lucide-react";
import ProductModal from "./ProductModal";
import CartDrawer from "./CartDrawer";
import { getProductById } from "../../lib/products";
import {
  addToCart,
  cartCount,
  openCart,
  openProductModal,
  productModalProduct,
} from "../../lib/store";

function CartFloatingButton() {
  const count = useStore(cartCount);
  const display = count > 99 ? "99+" : String(count);

  return (
    <button
      type="button"
      onClick={() => openCart()}
      aria-label={`Abrir carrito, ${count} ${count === 1 ? "artículo" : "artículos"}`}
      className="fixed top-3 right-4 md:top-4 md:right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-celestial-border bg-celestial-surface/95 text-celestial-ink shadow-celestial-sm backdrop-blur hover:border-celestial-sky-500 hover:text-celestial-sky-700 transition-colors duration-150 tap-safe"
    >
      <ShoppingCart size={20} aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-celestial-gold-600 px-1 text-[11px] font-medium text-white tabular-nums"
        >
          {display}
        </span>
      )}
    </button>
  );
}

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

    const rebind = () => {
      document
        .querySelectorAll<HTMLButtonElement>(
          "[data-open-product]:not([data-bound])",
        )
        .forEach((btn) => {
          btn.dataset.bound = "1";
          btn.addEventListener("click", () => {
            const id = btn.dataset.openProduct;
            if (!id) return;
            window.dispatchEvent(
              new CustomEvent("dc:open-product", { detail: { id } }),
            );
          });
        });
    };
    rebind();
    document.addEventListener("astro:after-swap", rebind);

    return () => {
      window.removeEventListener("dc:open-product", onOpen);
      window.removeEventListener("dc:quick-add", onQuickAdd);
      document.removeEventListener("astro:after-swap", rebind);
    };
  }, []);

  const product = useStore(productModalProduct);

  return (
    <>
      <CartFloatingButton />
      {product && <ProductModal key={product.id} />}
      <CartDrawer />
    </>
  );
}