import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import "./ProductDetailPage.css";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addItem, openCart } = useCart(); // ✅ ambil dari cart

  const product = products.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <p>Product not found.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAddToBag = () => {
    const mainImg = product.images?.[activeImageIndex] ?? product.image ?? null;

    // key harus unik per item/variant. kalau belum ada variant, cukup id/slug.
    const key = product.id ?? product.slug;

    addItem({
      key,
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: Number(product.price || 0),
      image: mainImg,
      qty: quantity,
      variant: null, // nanti kalau ada warna/size, isi di sini
    });

    openCart(); // ✅ ini yang bikin CartDrawer kebuka
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* KIRI – FOTO BESAR + THUMBNAIL */}
        <div className="product-detail-gallery">
          <img
            src={product.images[activeImageIndex]}
            alt={product.alt}
            className="product-detail-main-image"
          />

          <div className="product-detail-thumbnails">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail-button ${
                  index === activeImageIndex ? "active" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>
        </div>

        {/* KANAN – CARD DETAIL */}
        <div className="product-detail-info">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span> / </span>
            <span>Catalog</span>
            <span> / </span>
            <span className="breadcrumb-current">{product.title}</span>
          </nav>

          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-detail-price-block">
            <span className="product-detail-price">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            {product.originalPrice && (
              <span className="product-detail-original-price">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          <p className="product-detail-short">{product.shortDescription}</p>

          <div className="product-detail-actions">
            <div className="quantity-control">
              <button onClick={handleDecrease} className="qty-btn">
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button onClick={handleIncrease} className="qty-btn">
                +
              </button>
            </div>

            <button className="add-to-bag-button" onClick={handleAddToBag}>
              ADD TO BAG
            </button>
          </div>

          <div className="product-detail-meta">
            <p>
              Product code: <span>CLICK-{product.id}</span>
            </p>
            <p>Tags: Mirror, Selfie, Desk Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
