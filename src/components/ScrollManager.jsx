import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  // Matikan scroll restoration bawaan browser
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle scroll setiap route berubah
  useLayoutEffect(() => {
    // Kalau ada hash (#section), scroll ke element-nya
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        // pakai auto supaya tidak “meluncur” kalau ada smooth global
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
      return;
    }

    // Kalau tidak ada hash, selalu ke top
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
