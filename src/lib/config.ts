export const SITE = {
  name: "Detallitos Celestiales",
  tagline: "Regalos con Amor",
  description:
    "Detalles religiosos para retiros espirituales católicos. Pulseras, collares, cruces y jesucitos para Emaús, Samuel, Semillitas y más.",
  url: "https://detallitoscelestiales.com",
  phone: "+58 414-6828768",
  whatsapp: "584146828768",
  email: "hola@detallitoscelestiales.com",
  bibleVerse: {
    text: "Todo lo puedo en Cristo que me fortalece",
    ref: "Filipenses 4:13",
  },
  shipping: {
    nationwide: "Envíos nacionales a toda Venezuela",
    deliveryCities: ["Maracaibo", "Mene Mauroa"],
    deliveryNote: "Delivery disponible en Maracaibo y Mene Mauroa",
  },
  social: {
    instagram: "https://instagram.com/detallitoscelestiales",
    facebook: "https://facebook.com/detallitoscelestiales",
    tiktok: "https://tiktok.com/@detallitoscelestiales",
  },
} as const;

export const CATEGORIAS = [
  { id: "pulseras", label: "Pulseras" },
  { id: "collares", label: "Collares" },
  { id: "jesucitos", label: "Jesucitos" },
  { id: "cruces", label: "Cruces" },
  { id: "accesorios", label: "Accesorios" },
] as const;

export const CURRENCY = "USD";
export const LOCALE = "es-VE";