import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "clickclick_cart_v1";

const initialState = {
  isOpen: false,
  items: [], // { id, slug, name, price, image, qty }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "SET_ITEMS":
      return { ...state, items: action.payload || [] };

    case "ADD_ITEM": {
      const item = action.payload;
      if (!item) return state;

      // kita pakai key supaya variant (misal warna) bisa unik
      const key = item.key ?? item.id ?? item.slug;
      if (!key) return state;

      const addQty = Math.max(1, Number(item.qty || 1));
      const existingIdx = state.items.findIndex((x) => (x.key ?? x.id ?? x.slug) === key);

      if (existingIdx >= 0) {
        const updated = [...state.items];
        const prevQty = Number(updated[existingIdx].qty || 1);
        updated[existingIdx] = { ...updated[existingIdx], qty: prevQty + addQty };
        return { ...state, items: updated };
      }

      const newItem = {
        key,
        id: item.id ?? null,
        slug: item.slug ?? null,
        name: item.name ?? "Product",
        price: Number(item.price ?? 0),
        image: item.image ?? null,
        qty: addQty,
        variant: item.variant ?? null, // misal { color: "#..." }
      };

      return { ...state, items: [...state.items, newItem] };
    }

    case "REMOVE_ITEM": {
      const key = action.payload;
      return { ...state, items: state.items.filter((x) => (x.key ?? x.id ?? x.slug) !== key) };
    }

    case "SET_QTY": {
      const { key, qty } = action.payload || {};
      const nextQty = Math.max(1, Number(qty || 1));
      return {
        ...state,
        items: state.items.map((x) =>
          (x.key ?? x.id ?? x.slug) === key ? { ...x, qty: nextQty } : x
        ),
      };
    }    

    case "INC_QTY": {
      const key = action.payload;
      return {
        ...state,
        items: state.items.map((x) =>
          (x.key ?? x.id ?? x.slug) === key ? { ...x, qty: (x.qty || 1) + 1 } : x
        ),
      };
    }
    
    case "DEC_QTY": {
      const key = action.payload;
      return {
        ...state,
        items: state.items.map((x) => {
          if ((x.key ?? x.id ?? x.slug) !== key) return x;
          const next = (x.qty || 1) - 1;
          return { ...x, qty: next < 1 ? 1 : next };
        }),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.items) return null;
    return parsed.items;
  } catch {
    return null;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // load once
  useEffect(() => {
    const savedItems = loadFromStorage();
    if (savedItems) dispatch({ type: "SET_ITEMS", payload: savedItems });
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {
      // ignore
    }
  }, [state.items]);

  // lock body scroll when drawer open
  useEffect(() => {
    if (!state.isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [state.isOpen]);

  const api = useMemo(() => {
    const totalQty = state.items.reduce((sum, x) => sum + (x.qty || 1), 0);
    const subtotal = state.items.reduce((sum, x) => sum + (Number(x.price) || 0) * (x.qty || 1), 0);

    return {
      isOpen: state.isOpen,
      items: state.items,
      totalQty,
      subtotal,

      openCart: () => dispatch({ type: "OPEN_CART" }),
      closeCart: () => dispatch({ type: "CLOSE_CART" }),
      toggleCart: () => dispatch({ type: "TOGGLE_CART" }),

      addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
      removeItem: (key) => dispatch({ type: "REMOVE_ITEM", payload: key }),
      setQty: (key, qty) => dispatch({ type: "SET_QTY", payload: { key, qty } }),
      incQty: (key) => dispatch({ type: "INC_QTY", payload: key }),
      decQty: (key) => dispatch({ type: "DEC_QTY", payload: key }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.isOpen, state.items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
