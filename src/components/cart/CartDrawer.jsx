import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartIconEmpty() {
  return (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6.5h14l-1.5 8.5H8.2L6.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6.5 5.8 3.8H3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M16.5 5.5 20 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 5.5 16.5 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CartDrawer() {
  const navigate = useNavigate();
  const { isOpen, closeCart, items, subtotal, totalQty, incQty, decQty, removeItem } = useCart();


  // close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const isEmpty = items.length === 0;

  // Free shipping rule
  const FREE_SHIP_THRESHOLD = 2500000; // contoh 2.5jt
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);
  const freeShipText =
    remaining > 0
      ? `Spend Rp ${remaining.toLocaleString("id-ID")} more for FREE shipping.`
      : "You’ve unlocked FREE shipping.";


  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        aria-label="Close cart overlay"
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
      />

      {/* panel */}
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl flex flex-col">
        {/* header */}
        <div className="h-16 px-6 flex items-center justify-between border-b">
          <div className="text-sm tracking-widest font-semibold">CART</div>
          <button
            aria-label="Close cart"
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-black/5"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="px-6 pt-4">
          <div className="text-xs text-gray-700 text-center">{freeShipText}</div>
          <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto">
          {isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className="text-black/80 mb-6">
                <CartIconEmpty />
              </div>
              <p className="text-black/70 mb-6">Your cart is currently empty.</p>

              <button
                onClick={() => {
                  closeCart();
                  navigate("/catalog");
                }}
                className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide bg-pink-300 hover:bg-pink-400 text-white"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div className="px-6 py-5 space-y-5">
              {items.map((it) => (
                <div key={it.key ?? it.id ?? it.slug} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-black/5 overflow-hidden flex items-center justify-center">
                    {it.image ? (
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-xs text-black/40">No Image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 leading-snug">
                          {it.name}
                        </div>

                        {it.variant?.type === "bundle" && (
                          <div className="mt-1 space-y-1">
                            {it.variant?.discountLabel && (
                              <span className="inline-flex items-center rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
                                {it.variant.discountLabel} Bundle
                              </span>
                            )}

                            {it.variant?.note && (
                              <div className="text-xs text-gray-500">{it.variant.note}</div>
                            )}

                            {typeof it.variant?.originalPrice === "number" && (
                              <div className="text-xs text-gray-400 line-through">
                                Rp {it.variant.originalPrice.toLocaleString("id-ID")}
                              </div>
                            )}
                          </div>
                        )}

                      </div>

                      <div className="text-sm font-semibold text-gray-900">
                        Rp {(Number(it.price || 0) * (it.qty || 1)).toLocaleString("id-ID")}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => decQty(it.key ?? it.id ?? it.slug)}
                          className="px-4 py-2 text-sm hover:bg-black/5"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <div className="w-10 text-center text-sm font-semibold">
                          {it.qty || 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => incQty(it.key ?? it.id ?? it.slug)}
                          className="px-4 py-2 text-sm hover:bg-black/5"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeItem(it.key ?? it.id ?? it.slug)}
                        className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black"
                        aria-label={`Remove ${it.name}`}
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* footer summary (only if not empty) */}
        {!isEmpty && (
          <div className="border-t p-6">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-black/60">Subtotal</span>
              <span className="font-semibold">Rp {Number(subtotal).toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
              className="w-full py-3 rounded-full font-semibold text-sm bg-black text-white hover:bg-black/90"
            >
              CHECKOUT • Rp {subtotal.toLocaleString("id-ID")}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
