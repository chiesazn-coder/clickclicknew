import React, { useRef } from "react";
import { bundles } from "../data/bundles";
import { useCart } from "../context/CartContext";

const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const BundleSection = () => {
  const trackRef = useRef(null);
  const { addItem, openCart } = useCart();

  const scrollByAmount = (direction) => {
    if (!trackRef.current) return;
    const cardWidth = 260;
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
      price: bundle.price,
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
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-lg md:text-3xl font-semibold tracking-[0.18em] uppercase text-slate-900">
          Bundle Packages
        </h2>

        <div className="relative mt-8 md:mt-10">
          {/* ARROW LEFT (desktop only) */}
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
            className="
              no-scrollbar
              flex
              gap-4
              overflow-x-auto
              scroll-smooth
              px-2
              pb-4
              md:gap-12
              md:px-10
              md:justify-center
            "
          >
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="
                  flex
                  w-[260px]
                  md:w-[250px]
                  flex-shrink-0
                  flex-col
                  items-center
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-4
                  md:border-0
                "
              >
                {/* IMAGE + BADGE */}
                <div className="relative mb-4 flex h-44 w-full items-center justify-center">
                  <div className="absolute top-0 left-0 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
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
                <p className="text-center text-xs font-semibold text-slate-900 uppercase">
                  {bundle.title}
                </p>

                {/* PRICE */}
                <div className="mt-2 text-center">
                  <p className="text-xs text-slate-400 line-through">
                    {formatIDR(bundle.originalPrice)}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatIDR(bundle.price)}
                  </p>
                </div>

                {/* NOTE */}
                <p className="mt-2 text-center text-[11px] text-slate-500 leading-relaxed">
                  {bundle.note}
                </p>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handleSelectBundle(bundle)}
                  className="
                    mt-4
                    w-full
                    rounded-full
                    bg-slate-900
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    hover:bg-black
                  "
                >
                  Pilih Bundle
                </button>
              </div>
            ))}
          </div>

          {/* ARROW RIGHT (desktop only) */}
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
