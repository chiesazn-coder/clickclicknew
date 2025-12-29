import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  // Pakai useLayoutEffect supaya scroll dilakukan sebelum browser nge-paint
  useLayoutEffect(() => {
    // Kalau URL ada hash (#section), biarkan router/anchor yang handle
    if (hash) return;

    // Scroll ke paling atas tiap pindah halaman (route)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  // Matikan scroll restoration bawaan browser (biar tidak balik ke posisi lama)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
};

export default ScrollToTop;
