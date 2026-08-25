import { atom, computed } from "nanostores";
import type { CartItem, Product } from "./types";

const STORAGE_KEY = "dc_cart_v1";

function loadInitial(): Record<string, CartItem> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Record<string, CartItem>;
  } catch {
    /* ignore corrupted storage */
  }
  return {};
}

export const cartItems = atom<Record<string, CartItem>>(loadInitial());

if (typeof window !== "undefined") {
  cartItems.subscribe((value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  });
}

export const cartOpen = atom(false);
export const productModalProduct = atom<Product | null>(null);

export const cartCount = computed(cartItems, (items) => {
  return Object.values(items).reduce((sum, item) => sum + item.qty, 0);
});

export const cartTotal = computed(cartItems, (items) => {
  return Object.values(items).reduce(
    (sum, item) => sum + item.qty * item.precio,
    0,
  );
});

export const cartList = computed(cartItems, (items) => {
  return Object.values(items).sort((a, b) => a.nombre.localeCompare(b.nombre));
});

export function addToCart(product: Product, qty: number = 1) {
  if (qty < 1) return;
  const current = { ...cartItems.get() };
  const existing = current[product.id];
  const nextQty = (existing?.qty ?? 0) + qty;
  const capped = Math.min(nextQty, Math.max(1, product.stock));
  current[product.id] = {
    id: product.id,
    nombre: product.nombre,
    precio: product.precio,
    qty: capped,
    imagen: product.imagen,
    imagenAlt: product.imagenAlt,
  };
  cartItems.set(current);
}

export function setCartQty(id: string, qty: number) {
  if (qty < 1) {
    removeFromCart(id);
    return;
  }
  const current = { ...cartItems.get() };
  const item = current[id];
  if (!item) return;
  current[id] = { ...item, qty };
  cartItems.set(current);
}

export function removeFromCart(id: string) {
  const current = { ...cartItems.get() };
  delete current[id];
  cartItems.set(current);
}

export function clearCart() {
  cartItems.set({});
}

export function openCart() {
  cartOpen.set(true);
}

export function closeCart() {
  cartOpen.set(false);
}

export function openProductModal(product: Product) {
  productModalProduct.set(product);
}

export function closeProductModal() {
  productModalProduct.set(null);
}