import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { CATEGORIES } from "../data/store";

// Flatten products (exclude "all" to avoid duplicates)
const ALL_PRODUCTS = Object.values(CATEGORIES)
  .filter((c) => c.slug !== "all")
  .flatMap((c) =>
    c.products.map((p) => ({
      ...p,
      category: c.slug,
      categoryLabel: c.label,
    }))
  );

const PRODUCTS_BY_ID = Object.fromEntries(ALL_PRODUCTS.map((p) => [p.id, p]));

export function getProductById(id) {
  return PRODUCTS_BY_ID[id];
}

export function parsePrice(str) {
  return parseInt(String(str).replace(/[^\d]/g, ""), 10) || 0;
}

export function formatPrice(num) {
  return num.toLocaleString("ru-RU") + " ₽";
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [favorites, setFavorites] = useState([]); // [id]

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback(
    (id, qty) => {
      if (qty <= 0) {
        removeFromCart(id);
        return;
      }
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleFavorite,
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      favoritesCount: favorites.length,
    }),
    [
      cart,
      favorites,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleFavorite,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
