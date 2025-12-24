import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuickView } from "../../context/QuickViewContext";
import { useCart } from "../../context/CartContext";

export default function QuickViewDrawer() {
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();

  const {
    isOpen,
    product: p,
    selectedColor,
    qty,
    imgIdx,
    setSelectedColor,
    setQty,
    setImgIdx,
    closeQuickView,
  } = useQuickView();

  // close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeQuickView();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeQuickView]);

  // lock scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen || !p) return null;

  const images = p.images?.length ? p.images : [p.image].filter(Boolean);
  const mainImg = images?.[imgIdx] ?? "/assets/placeholder.png";

  const price = Number(p.price || 0);
  const original = Number(p.originalPrice || 0);
  const hasDiscount = Boolean(p.originalPrice) && original > price;

  const handleAdd = () => {
    const key = `${p.id}-${selectedColor ?? "default"}`;

    addItem({
      key,
      id: p.id,
      slug: p.slug,
      name: p.title,
      price: price,
      image: mainImg,
      qty,
      variant: { color: selectedColor ?? null },
    });

    closeQuickView();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        aria-label="Close quick view overlay"
        onClick={closeQuickView}
        className="absolute inset-0 bg-black/40"
      />

      {/* panel */}
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-xl flex flex-col">
        {/* header */}
        <div className="h-16 px-6 flex items-center justify-between border-b">
          <div className="text-sm tracking-widest font-semibold">QUICK VIEW</div>
          <button
            aria-label="Close quick view"
            onClick={closeQuickView}
            className="p-2 rounded-full hover:bg-black/5"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* image */}
            <div>
              <div className="w-full rounded-2xl bg-black/5 overflow-hidden">
                <img src={mainImg} alt={p.alt || p.title} className="w-full h-auto object-cover" />
              </div>

              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setImgIdx(i)}
                      className={`h-16 w-16 rounded-xl overflow-hidden border ${
                        i === imgIdx ? "border-black" : "border-transparent"
                      } bg-black/5`}
                      aria-label={`Select image ${i + 1}`}
                      type="button"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* info */}
            <div>
              <h2 className="text-xl font-semibold tracking-wide">{p.title}</h2>

              <div className="mt-2 flex items-center gap-3">
                {hasDiscount && (
                  <span className="text-black/40 line-through">
                    Rp {original.toLocaleString("id-ID")}
                  </span>
                )}
                <span className="text-lg font-semibold">
                  Rp {price.toLocaleString("id-ID")}
                </span>
                {hasDiscount && (
                  <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 font-semibold">
                    SAVE {Math.round(((original - price) / original) * 100)}%
                  </span>
                )}
              </div>

              {p.shortDescription && (
                <p className="mt-3 text-sm text-black/70 leading-relaxed">
                  {p.shortDescription}
                </p>
              )}

              {/* qty + add */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-black/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-black/5"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="w-10 text-center text-sm font-semibold">{qty}</div>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-4 py-2 hover:bg-black/5"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-3 rounded-full font-semibold text-sm border border-pink-300 text-pink-500 hover:bg-pink-50 transition"
                >
                  ADD TO CART
                </button>
              </div>

              {/* optional: view details */}
              <button
                type="button"
                onClick={() => {
                  closeQuickView();
                  navigate(`/product/${p.slug}`);
                }}
                className="mt-4 w-full py-3 rounded-full font-semibold text-sm bg-black text-white hover:bg-black/90 transition"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
