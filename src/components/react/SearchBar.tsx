import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { getAllProducts } from "../../lib/products";
import { openProductModal } from "../../lib/store";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const products = useMemo(() => getAllProducts(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return products
      .filter((p) => {
        return (
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [query, products]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIdx];
      if (target) {
        openProductModal(target);
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center gap-2 rounded-full border border-celestial-border bg-celestial-surface px-3 py-2 focus-within:border-celestial-sky-500 transition-colors duration-150">
        <Search size={16} aria-hidden="true" className="text-celestial-muted" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          autoComplete="off"
          spellCheck={false}
          placeholder="Buscar productos…"
          aria-label="Buscar productos"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-32 md:w-56 bg-transparent text-sm text-celestial-ink placeholder:text-celestial-muted focus:outline-none"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Limpiar búsqueda"
            className="text-celestial-muted hover:text-celestial-ink tap-safe"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div
          role="listbox"
          aria-label="Resultados de búsqueda"
          className="absolute right-0 top-full mt-2 w-72 md:w-80 max-h-80 overflow-y-auto overscroll-contain rounded-2xl border border-celestial-border bg-celestial-surface shadow-celestial-md z-50"
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-celestial-muted">
              Sin resultados para «{query}»
            </p>
          ) : (
            <ul className="py-1">
              {results.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === activeIdx}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => {
                      openProductModal(p);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors duration-150 tap-safe ${
                      i === activeIdx
                        ? "bg-celestial-sky-300/30"
                        : "hover:bg-celestial-bg"
                    }`}
                  >
                    <img
                      src={p.imagen}
                      alt=""
                      width="40"
                      height="40"
                      loading="lazy"
                      className="h-10 w-10 rounded-lg object-cover bg-celestial-bg shrink-0"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-celestial-ink">
                        {p.nombre}
                      </span>
                      <span className="block text-xs text-celestial-muted">
                        {p.categoria}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}