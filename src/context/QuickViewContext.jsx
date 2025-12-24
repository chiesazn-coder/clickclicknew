import React, { createContext, useContext, useMemo, useState } from "react";

const QuickViewContext = createContext(null);

export function QuickViewProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  const openQuickView = (p) => {
    setProduct(p);
    setIsOpen(true);
    setImgIdx(0);
    setQty(1);
    setSelectedColor(p?.colors?.[0] ?? null);
  };

  const closeQuickView = () => {
    setIsOpen(false);
  };

  const api = useMemo(
    () => ({
      isOpen,
      product,
      selectedColor,
      qty,
      imgIdx,
      setSelectedColor,
      setQty,
      setImgIdx,
      openQuickView,
      closeQuickView,
    }),
    [isOpen, product, selectedColor, qty, imgIdx]
  );

  return <QuickViewContext.Provider value={api}>{children}</QuickViewContext.Provider>;
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used inside QuickViewProvider");
  return ctx;
}
