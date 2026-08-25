import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  Minus,
  Plus,
  ShoppingBag,
  X,
  Check,
} from "lucide-react";
import {
  addToCart,
  closeProductModal,
  productModalProduct,
  openCart,
} from "../../lib/store";
import { formatPrice } from "../../lib/format";
import type { Product } from "../../lib/types";

export default function ProductModal() {
  const product = useStore(productModalProduct);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setJustAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProductModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const stock = product.stock;
  const maxQty = Math.max(1, Math.min(stock, 99));

  const onAdd = () => {
    addToCart(product as Product, qty);
    setJustAdded(true);
    setTimeout(() => {
      closeProductModal();
      openCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <div
        className="absolute inset-0 bg-celestial-ink/50"
        onClick={() => closeProductModal()}
        aria-hidden="true"
      />

      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[calc(100%-2rem)]">
        <div className="relative overflow-hidden rounded-3xl bg-celestial-surface shadow-celestial-lg max-h-[90vh] overflow-y-auto overscroll-contain">
          <button
            type="button"
            onClick={() => closeProductModal()}
            aria-label="Cerrar detalle"
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-celestial-surface/90 text-celestial-muted hover:text-celestial-ink hover:bg-celestial-bg tap-safe"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="grid gap-0 md:grid-cols-2">
            <div className="aspect-square bg-celestial-bg overflow-hidden">
              <img
                src={product.imagen}
                alt={product.imagenAlt}
                width="800"
                height="800"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-celestial-muted">
                  {product.categoria}
                </p>
                <h2
                  id="product-title"
                  className="mt-1 font-display text-2xl text-celestial-ink text-balance"
                >
                  {product.nombre}
                </h2>
                <p className="mt-3 font-display text-3xl text-celestial-sky-700 tabular-nums">
                  {formatPrice(product.precio)}
                </p>
                {product.precioBs !== undefined && (
                  <p className="mt-1 text-xs text-celestial-muted tabular-nums">
                    Referencial en bolívares: Bs. {product.precioBs.toFixed(2)}
                  </p>
                )}
              </div>

              <p className="text-sm text-celestial-muted text-pretty">
                {product.descripcion}
              </p>

              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm text-celestial-ink">Cantidad</span>
                <div
                  className="inline-flex items-center gap-1 rounded-full border border-celestial-border"
                  role="group"
                  aria-label="Selector de cantidad"
                >
                  <button
                    type="button"
                    onClick={() => setQty((q: number) => Math.max(1, q - 1))}
                    aria-label="Disminuir cantidad"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-l-full text-celestial-muted hover:text-celestial-sky-700 hover:bg-celestial-bg tap-safe"
                  >
                    <Minus size={16} aria-hidden="true" />
                  </button>
                  <span
                    aria-live="polite"
                    className="min-w-8 text-center text-sm tabular-nums"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q: number) => Math.min(maxQty, q + 1))}
                    aria-label="Aumentar cantidad"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-r-full text-celestial-muted hover:text-celestial-sky-700 hover:bg-celestial-bg tap-safe"
                  >
                    <Plus size={16} aria-hidden="true" />
                  </button>
                </div>
                <span className="text-xs text-celestial-muted tabular-nums">
                  {stock} disponibles
                </span>
              </div>

              <button
                type="button"
                onClick={onAdd}
                disabled={justAdded}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-celestial-sky-600 px-6 py-3 text-base font-medium text-white shadow-celestial-sm hover:bg-celestial-sky-700 disabled:opacity-80 transition-colors duration-150 tap-safe"
              >
                {justAdded ? (
                  <>
                    <Check size={18} aria-hidden="true" />
                    Agregado
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} aria-hidden="true" />
                    Agregar al carrito
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}