import { useStore } from "@nanostores/react";
import { ShoppingCart } from "lucide-react";
import { cartCount, openCart } from "../../lib/store";

export default function CartButton() {
  const count = useStore(cartCount);
  const display = count > 99 ? "99+" : String(count);

  return (
    <button
      type="button"
      onClick={() => openCart()}
      aria-label={`Abrir carrito, ${count} ${count === 1 ? "artículo" : "artículos"}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-celestial-border bg-celestial-surface text-celestial-ink hover:border-celestial-sky-500 hover:text-celestial-sky-700 transition-colors duration-150 tap-safe"
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