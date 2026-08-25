import { SITE, CURRENCY, LOCALE } from "./config";
import type { CartItem } from "./types";

const moneyFmt = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 2,
});

const dateFmt = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: "long",
  timeStyle: "short",
});

export function formatPrice(amount: number): string {
  return moneyFmt.format(amount);
}

export function formatQty(n: number): string {
  return new Intl.NumberFormat(LOCALE).format(n);
}

export function formatDateTime(d: Date = new Date()): string {
  return dateFmt.format(d);
}

export function buildWhatsAppUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${SITE.whatsapp}?text=${encoded}`;
}

/**
 * Build a short, human-friendly order number like DC-A4F2-7C91.
 * Uses crypto.randomUUID when available, otherwise falls back to a timestamped token.
 */
export function generateOrderNumber(): string {
  let raw = "";
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      raw = crypto.randomUUID().replace(/-/g, "").toUpperCase();
    }
  } catch {
    /* fall through */
  }
  if (!raw) {
    raw = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`.toUpperCase();
  }
  const a = raw.slice(0, 4);
  const b = raw.slice(4, 8);
  return `DC-${a}-${b}`;
}

export interface OrderLine {
  nombre: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

export function buildOrderMessage(
  items: CartItem[],
  total: number,
  orderNumber: string,
): string {
  const lines: OrderLine[] = items.map((item) => ({
    nombre: item.nombre,
    qty: item.qty,
    unitPrice: item.precio,
    subtotal: item.qty * item.precio,
  }));

  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const body: string[] = [
    "Hola Detallitos Celestiales ✨",
    "",
    `Pedido #${orderNumber}`,
    `Fecha: ${formatDateTime()}`,
    "",
    "Productos:",
    ...lines.map(
      (l, i) =>
        `${i + 1}. ${l.nombre}\n   Cantidad: ${l.qty} · Unitario: ${formatPrice(l.unitPrice)} · Subtotal: ${formatPrice(l.subtotal)}`,
    ),
    "",
    `Artículos: ${itemCount}`,
    `Total: ${formatPrice(total)}`,
    "",
    "Quedo atento(a) para coordinar el pago y envío. Gracias",
  ];

  return body.join("\n");
}

export function buildCustomOrderMessage(retreat: string): string {
  return [
    "Hola Detallitos Celestiales ✨",
    "",
    `Estoy organizando un retiro tipo "${retreat}" y quisiera encargar detalles personalizados.`,
    "",
    "¿Podrían ayudarme con ideas, cantidades y precios?",
  ].join("\n");
}