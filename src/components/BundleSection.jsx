import React, { useRef } from "react";
import { bundles } from "../data/bundles";
import { useCart } from "../context/CartContext";

const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const BundleSection = () => {
  const trackRef = useRef(null);
  const { addItem, openCart } = useCart();

  const scrollByAmount = (direction) => {
    if (!trackRef.current) return;
    const cardWidth = 260; // sesuaikan supaya gesernya pas satu item
    trackRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  const handleSelectBundle = (bundle) => {
    addItem({
      key: `bundle:${bundle.id}`,
      id: bundle.id,
      slug: bundle.slug,
      name: bundle.title,
      price: bundle.price, // ✅ number
      image: bundle.image,
      qty: 1,
      variant: {
        type: "bundle",
        note: bundle.note,
        originalPrice: bundle.originalPrice,
        discountLabel: bundle.discountLabel,
      },
    });

    openCart();
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-[0.18em] uppercase text-slate-900">
          BUNDLE PACKAGES
        </h2>

        <div className="relative mt-10">
          {/* ARROW LEFT */}
          <button
            type="button"
            onClick={() => scrollByAmount("prev")}
            className="absolute left-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 h-9 w-9 hover:shadow-lg md:flex z-10"
            aria-label="Scroll bundles left"
          >
            ‹
          </button>

          {/* TRACK */}
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-12 overflow-x-auto px-2 pb-2 md:px-10 md:justify-center"
          >
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="flex w-[220px] md:w-[250px] flex-col items-center"
              >
                {/* TOP IMAGE + BADGE DISCOUNT */}
                <div className="relative mb-3 flex h-40 w-full items-center justify-center overflow-visible">
                  <div className="absolute top-0 left-3 rounded-2xl bg-white px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
                    {bundle.discountLabel}
                  </div>

                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* NAME */}
                <p className="mt-1 text-center text-xs font-medium text-slate-900 uppercase">
                  {bundle.title}
                </p>

                {/* PRICES */}
                <div className="mt-1 text-center">
                  <p className="text-xs text-slate-400 line-through">
                    {formatIDR(bundle.originalPrice)}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatIDR(bundle.price)}
                  </p>
                </div>

                {/* NOTE */}
                <p className="mt-1 text-[11px] text-center text-slate-500">
                  {bundle.note}
                </p>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handleSelectBundle(bundle)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-xs font-semibold text-white hover:bg-black"
                >
                  Pilih Bundle
                </button>
              </div>
            ))}
          </div>

          {/* ARROW RIGHT */}
          <button
            type="button"
            onClick={() => scrollByAmount("next")}
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 h-9 w-9 hover:shadow-lg md:flex z-10"
            aria-label="Scroll bundles right"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default BundleSection;
