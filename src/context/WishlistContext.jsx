import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "clickclick_wishlist_v1";

// item shape:
// { key, id, slug, name, price, image }
export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // load dari localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      // ignore kalau corrupted
      setItems([]);
    }
  }, []);

  // save ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const hasItem = (key) => items.some((it) => it.key === key);

  const addItem = (item) => {
    setItems((prev) => {
      if (prev.some((it) => it.key === item.key)) return prev;
      return [item, ...prev];
    });
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((it) => it.key !== key));
  };

  const toggleItem = (item) => {
    setItems((prev) => {
      const exists = prev.some((it) => it.key === item.key);
      return exists ? prev.filter((it) => it.key !== item.key) : [item, ...prev];
    });
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      hasItem,
      addItem,
      removeItem,
      toggleItem,
      clear,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
