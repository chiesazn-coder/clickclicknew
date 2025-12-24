// src/components/ProductsSection.jsx
import React from "react";
import ProductCard from "./ProductCard";
import "../styles/main.css";
import { products } from "../data/products";

const ProductsSection = () => {
  const trackRef = React.useRef(null);

  const scrollTrack = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".product-card");
    const cardWidth = firstCard?.getBoundingClientRect().width || 300;

    const gap =
      parseInt(
        getComputedStyle(el).columnGap ||
          getComputedStyle(el).gap ||
          "32",
        10
      ) || 0;

    const step = cardWidth + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="all-products" className="products">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="products-title">ALL PRODUCTS</h2>

        <div className="products-wrap">
          <button
            className="swipe-hint swipe-hint--left"
            onClick={() => scrollTrack(-1)}
            aria-label="Scroll products left"
            type="button"
          >
            ‹
          </button>

          <div className="track" ref={trackRef}>
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>

          <button
            className="swipe-hint swipe-hint--right"
            onClick={() => scrollTrack(1)}
            aria-label="Scroll products right"
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
