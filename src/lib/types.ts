export interface Product {
  id: string;
  slug: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  precioBs?: number;
  descripcion: string;
  imagen: string;
  imagenAlt: string;
  destacado: boolean;
  stock: number;
}

export type Categoria =
  | "pulseras"
  | "collares"
  | "jesucitos"
  | "cruces"
  | "accesorios";

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  qty: number;
  imagen: string;
  imagenAlt: string;
}