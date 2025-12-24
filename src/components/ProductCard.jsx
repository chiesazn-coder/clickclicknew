import React from "react";
import { useQuickView } from "../context/QuickViewContext";

const ProductCard = ({ p }) => {
  const { openQuickView } = useQuickView();

  const [imgIdx, setImgIdx] = React.useState(0);
  const total = p?.images?.length || (p?.image ? 1 : 0);
  const timerRef = React.useRef(null);

  const nextImage = React.useCallback(() => {
    if (total <= 1) return;
    setImgIdx((i) => (i + 1) % total);
  }, [total]);

  const stopRotateAndReset = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeout(() => setImgIdx(0), 200);
  }, []);

  const startRotate = React.useCallback(() => {
    if (total <= 1 || timerRef.current) return;
    timerRef.current = setInterval(nextImage, 900);
  }, [nextImage, total]);

  const handleTouch = (e) => {
    e.preventDefault();
    stopRotateAndReset();
    nextImage();
    setTimeout(() => setImgIdx(0), 800);
  };

  React.useEffect(() => {
    return () => stopRotateAndReset();
  }, [stopRotateAndReset]);

  const imgSrc =
    p?.images && p.images[imgIdx]
      ? p.images[imgIdx]
      : p?.image || "/assets/placeholder.png";

  const originalPrice =
    typeof p?.originalPrice === "number" ? p.originalPrice : null;
  const price = typeof p?.price === "number" ? p.price : null;

  const priceOriginalText =
    originalPrice !== null ? `Rp ${originalPrice.toLocaleString("id-ID")}` : "";

  const priceText = price !== null ? `Rp ${price.toLocaleString("id-ID")}` : "";

  return (
    <article className="product-card">
      {/* Badge tetap di level product-card agar tidak ke-crop */}
      {p?.isNew && <span className="new-badge">-50%</span>}

      <div
        className="thumb group relative"
        role="button"
        tabIndex={0}
        aria-label={`Quick view for ${p?.title || "product"}`}
        onMouseEnter={startRotate}
        onMouseLeave={stopRotateAndReset}
        onTouchStart={handleTouch}
        onClick={() => openQuickView(p)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openQuickView(p);
          }
        }}
      >
        {/* ✅ Inner wrapper untuk crop rounded image saja */}
        <div className="thumb-inner">
          <img
            src={imgSrc}
            alt={p?.alt || p?.title || "product image"}
            loading="lazy"
          />
        </div>

        {/* overlay button like LuxyLemon */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(p);
            }}
            className="px-6 py-2 rounded-full text-sm font-semibold bg-black/80 text-white hover:bg-black"
          >
            QUICK VIEW
          </button>
        </div>
      </div>

      <div className="meta">
        <h3 className="name">{p?.title || "Product"}</h3>
        <div className="price">
          <span className="price-original">{priceOriginalText}</span>
          <span className="price-discount">{priceText}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
