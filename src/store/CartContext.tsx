import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { collections, fragrances } from "../config/site";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { SizeOption } from "../types/site";

export interface CartItem {
  fragranceId: string;
  size: SizeOption;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  itemCount: number;
  subtotal: number;
  getTotalPrice: () => number;
  toggleDrawer: (open?: boolean) => void;
  addToCart: (fragranceId: string, size: SizeOption, quantity: number) => void;
  removeFromCart: (fragranceId: string, size: SizeOption) => void;
  updateQuantity: (fragranceId: string, size: SizeOption, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function itemPrice(fragranceId: string, size: SizeOption) {
  const fragrance = fragrances.find((entry) => entry.id === fragranceId);
  if (!fragrance) return 0;
  const collection = collections.find((entry) => entry.id === fragrance.collection);
  return collection ? collection.prices[size] : 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("alluring-cart", []);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + itemPrice(item.fragranceId, item.size) * item.quantity,
      0,
    );

    return {
      items,
      isDrawerOpen,
      itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal,
      getTotalPrice: () => subtotal,
      toggleDrawer: (open?: boolean) => setDrawerOpen((previous) => open ?? !previous),
      addToCart: (fragranceId, size, quantity) => {
        setItems((current) => {
          const existing = current.find((item) => item.fragranceId === fragranceId && item.size === size);
          if (existing) {
            return current.map((item) =>
              item.fragranceId === fragranceId && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          }
          return [...current, { fragranceId, size, quantity }];
        });
        setDrawerOpen(true);
      },
      removeFromCart: (fragranceId, size) => {
        setItems((current) =>
          current.filter((item) => !(item.fragranceId === fragranceId && item.size === size)),
        );
      },
      updateQuantity: (fragranceId, size, quantity) => {
        if (quantity <= 0) {
          setItems((current) =>
            current.filter((item) => !(item.fragranceId === fragranceId && item.size === size)),
          );
          return;
        }
        setItems((current) =>
          current.map((item) =>
            item.fragranceId === fragranceId && item.size === size ? { ...item, quantity } : item,
          ),
        );
      },
      clearCart: () => setItems([]),
    };
  }, [isDrawerOpen, items, setItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}