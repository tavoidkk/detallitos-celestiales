import { SITE, CURRENCY, LOCALE } from "./config";

const moneyFmt = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 2,
});

export function formatPrice(amount: number): string {
  return moneyFmt.format(amount);
}

export function formatQty(n: number): string {
  return new Intl.NumberFormat(LOCALE).format(n);
}

export function buildWhatsAppUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${SITE.whatsapp}?text=${encoded}`;
}

export function buildOrderMessage(
  items: Array<{ nombre: string; qty: number; precio: number }>,
  total: number,
): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.nombre} (x${item.qty}) — ${formatPrice(item.precio * item.qty)}`,
  );
  return [
    "Hola Detallitos Celestiales ✨",
    "",
    "Quisiera hacer el siguiente pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Quedo atento(a) para coordinar el pago y envío. Gracias",
  ].join("\n");
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