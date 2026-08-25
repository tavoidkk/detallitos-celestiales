import type { Product } from "./types";
import raw from "../data/productos.json";

const data = raw as Product[];

export function getAllProducts(): Product[] {
  return data;
}

export function getFeaturedProducts(): Product[] {
  return data.filter((p) => p.destacado).slice(0, 4);
}

export function getProductById(id: string): Product | undefined {
  return data.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return data.filter((p) => p.categoria === category);
}