import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  Minus,
  Plus,
  Trash2,
  X,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import {
  cartList,
  cartOpen,
  cartTotal,
  closeCart,
  removeFromCart,
  setCartQty,
} from "../../lib/store";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  formatPrice,
  generateOrderNumber,
} from "../../lib/format";

export default function CartDrawer() {
  const open = useStore(cartOpen);
  const items = useStore(cartList);
  const total = useStore(cartTotal);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [orderNumber] = useState<string>(() => generateOrderNumber());

  const checkoutUrl = useMemo(() => {
    if (items.length === 0) return "#";
    return buildWhatsAppUrl(buildOrderMessage(items, total, orderNumber));
  }, [items, total, orderNumber]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeBtnRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open && items.length === 0) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-celestial-ink/40 transition-opacity duration-200 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => closeCart()}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-celestial-surface shadow-celestial-lg transition-transform duration-250 ease-out overscroll-contain ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionDuration: "250ms" }}
      >
        <header className="flex items-center justify-between border-b border-celestial-border px-5 py-4">
          <h2
            id="cart-title"
            className="font-display text-xl text-celestial-ink"
          >
            Tu carrito
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => closeCart()}
            aria-label="Cerrar carrito"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-celestial-muted hover:text-celestial-ink hover:bg-celestial-bg tap-safe"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-celestial-sky-300/30 text-celestial-sky-700">
                <ShoppingBag size={24} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg text-celestial-ink">
                  Tu carrito está vacío
                </p>
                <p className="mt-1 text-sm text-celestial-muted text-pretty">
                  Explora el catálogo y agrega los detalles que
                  acompañarán tu próximo retiro.
                </p>
              </div>
              <button
                type="button"
                onClick={() => closeCart()}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-celestial-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-celestial-sky-700 transition-colors duration-150 tap-safe"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <ul className="grid gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-celestial-border p-3"
                >
                  <img
                    src={item.imagen}
                    alt={item.imagenAlt}
                    width="80"
                    height="80"
                    loading="lazy"
                    className="h-20 w-20 rounded-xl object-cover bg-celestial-bg shrink-0"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-display text-sm text-celestial-ink text-pretty line-clamp-2">
                      {item.nombre}
                    </p>
                    <p className="mt-1 text-sm text-celestial-sky-700 tabular-nums">
                      {formatPrice(item.precio)}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div
                        className="inline-flex items-center gap-1 rounded-full border border-celestial-border"
                        role="group"
                        aria-label={`Cantidad de ${item.nombre}`}
                      >
                        <button
                          type="button"
                          onClick={() => setCartQty(item.id, item.qty - 1)}
                          aria-label="Disminuir cantidad"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-l-full text-celestial-muted hover:text-celestial-sky-700 hover:bg-celestial-bg tap-safe"
                        >
                          <Minus size={14} aria-hidden="true" />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-6 text-center text-sm tabular-nums"
                        >
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCartQty(item.id, item.qty + 1)}
                          aria-label="Aumentar cantidad"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-r-full text-celestial-muted hover:text-celestial-sky-700 hover:bg-celestial-bg tap-safe"
                        >
                          <Plus size={14} aria-hidden="true" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.nombre}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-celestial-muted hover:text-red-600 hover:bg-red-50 tap-safe"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-celestial-border bg-celestial-bg/50 px-5 py-4">
            <div className="flex items-center justify-between text-xs text-celestial-muted">
              <span>Pedido</span>
              <span className="tabular-nums">#{orderNumber}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-celestial-muted">Total</p>
              <p className="font-display text-2xl text-celestial-ink tabular-nums">
                {formatPrice(total)}
              </p>
            </div>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-celestial-sky-600 px-5 py-3 text-sm font-medium text-white shadow-celestial-sm hover:bg-celestial-sky-700 transition-colors duration-150 tap-safe"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Enviar pedido por WhatsApp
            </a>
          </footer>
        )}
      </div>
    </div>
  );
}