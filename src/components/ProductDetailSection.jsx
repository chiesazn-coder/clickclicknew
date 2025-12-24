import React, { useMemo, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const ProductDetailSection = ({
  productId,
  productSlug,
  productImage,
  productName,
  rawPrice,
  description,
  sizeOptions = [],
  defaultSize = null,
  functionsText = "",
  dosageText = "",
}) => {
  const { addItem, openCart } = useCart();
  const { toggleItem, hasItem } = useWishlist();

  const wishlistKey = String(productId ?? productSlug ?? productName);
  const isWishlisted = hasItem(wishlistKey);

  const handleWishlist = () => {
    toggleItem({
      key: wishlistKey,
      id: productId ?? null,
      slug: productSlug ?? null,
      name: productName || "Product",
      price: Number(rawPrice || 0),
      image: productImage,
    });
  };


  const formattedPrice = formatRupiah(rawPrice);

  // pilih ukuran default: defaultSize > first option > null
  const initialSize = useMemo(() => {
    if (defaultSize) return defaultSize;
    if (sizeOptions.length > 0) return sizeOptions[0];
    return null;
  }, [defaultSize, sizeOptions]);

  const [selectedSize, setSelectedSize] = useState(initialSize);

  // kalau pindah produk, reset selectedSize
  useEffect(() => {
    setSelectedSize(initialSize);
  }, [initialSize, productId]);

  const handleAddToCart = () => {
    const variantLabel = selectedSize ? `size:${selectedSize}` : "default";
    const key = `${productId ?? productName}-${variantLabel}`;

    addItem({
      key,
      id: productId ?? null,
      slug: productSlug ?? null,
      name: productName || "Product",
      price: Number(rawPrice || 0),
      image: productImage,
      qty: 1,
      variant: selectedSize ? { size: selectedSize } : null,
    });

    openCart();
  };

  const renderText = (text) => {
    if (Array.isArray(text)) {
      return text.map((t, idx) => (
        <p key={idx} className="text-gray-600 text-sm">
          {t}
        </p>
      ));
    }
  
    return <p className="text-gray-600 text-sm">{text}</p>;
  };
  

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Kolom Kiri */}
          <div className="lg:w-1/2 flex justify-center items-start">
            <div className="p-3 border border-gray-200 rounded-lg max-w-lg w-full">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                {productName}
              </h2>
              <p className="text-lg text-gray-600">{formattedPrice}</p>
            </div>

            {/* Ukuran dinamis */}
            {sizeOptions.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">Ukuran</p>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((s) => {
                    const active = s === selectedSize;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={
                          active
                            ? "px-3 py-1.5 text-sm border-2 border-black bg-black text-white rounded-md"
                            : "px-3 py-1.5 text-sm border-2 border-gray-200 text-gray-800 rounded-md hover:border-black transition"
                        }
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              {description}
            </p>

            <div className="flex space-x-3 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                ADD TO CART
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={
                  isWishlisted
                    ? "flex-1 py-2.5 border-2 border-black bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
                    : "flex-1 py-2.5 border-2 border-gray-200 text-gray-800 text-sm font-semibold rounded-lg hover:border-black transition"
                }
              >
                {isWishlisted ? "SAVED" : "ADD TO WISHLIST"}
              </button>

            </div>

            {/* Accordion dinamis */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              {functionsText && (
                <details className="py-1.5">
                  <summary className="text-base font-medium cursor-pointer text-gray-900 flex justify-between items-center">
                    STORY BEHIND
                    <span className="text-xl">+</span>
                  </summary>

                  <div className="mt-1.5 space-y-1.5">
                    {renderText(functionsText)}
                  </div>
                </details>
              )}

              {dosageText && (
                <details className="py-1.5 border-t border-gray-200">
                  <summary className="text-base font-medium cursor-pointer text-gray-900 flex justify-between items-center">
                    PRODUCT PERFORMENCE
                    <span className="text-xl">+</span>
                  </summary>

                  <div className="mt-1.5 space-y-1.5">
                    {renderText(dosageText)}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailSection;
