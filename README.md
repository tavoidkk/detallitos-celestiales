# Detallitos Celestiales

Tienda web de detalles religiosos para retiros espirituales católicos
(Emaús, Samuel, Semillitas y más).

Construida con **Astro** (arquitectura de islas) + **Tailwind CSS v4** +
**Nano Stores** (estado del carrito) + **React** para las islas interactivas.

## Características

- Landing page con hero, productos destacados, sección de envíos,
  encargos personalizados y frase bíblica.
- Catálogo completo con filtros por categoría.
- Modal de detalle de producto con selector de cantidad.
- Drawer de carrito con persistencia en `localStorage`.
- Checkout por WhatsApp con número de orden, lista de productos,
  cantidades y total.
- View Transitions de Astro entre páginas.
- Accesible: skip link, `aria-label`, `focus-visible`, soporte
  de `prefers-reduced-motion`.

## Estructura

```
src/
├── components/
│   ├── astro/   Componentes server-rendered
│   └── react/   Islas interactivas
├── data/        Catálogo de productos (productos.json)
├── layouts/     Layout base
├── lib/         config, types, store, format, products
├── pages/       Rutas (index, catalogo)
└── styles/      CSS global (Tailwind v4)
```

## Desarrollo

```bash
pnpm install
pnpm dev        # servidor en http://127.0.0.1:4321
pnpm check      # verificación de tipos (astro check)
pnpm build      # build estático en dist/
pnpm preview    # servir el build localmente
```

## Configuración

Edita `src/lib/config.ts` para ajustar:

- Número de WhatsApp
- Información de envíos (ciudades, copy)
- Redes sociales
- Versículo bíblico

## Próximos pasos

- Reemplazar placeholders de Unsplash en `src/data/productos.json`
  con fotos reales de los productos.
- Conectar con un backend o CMS si se requiere gestión de inventario.