import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext"; 

const formatRupiah = (number) => {
  const n = Number(number || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
};

export default function WishlistPage() {
  const { items, removeItem, toggleItem, clear } = useWishlist();
  const { addItem, openCart } = useCart(); // ✅ tambah

  // Support items = array OR object
  const wishlistItems = Array.isArray(items) ? items : Object.values(items || {});

  const handleRemove = (key) => {
    if (typeof removeItem === "function") return removeItem(key);
    if (typeof toggleItem === "function") return toggleItem({ key });
  };

  const handleAddToCart = (item) => {
    // Samakan mapping field dari wishlist item → cart item
    const key = item.key ?? item.id ?? item.slug;

    addItem({
      key,
      id: item.id ?? null,
      slug: item.slug ?? null,
      name: item.name ?? item.title ?? "Product",
      price: Number(item.price || 0),
      image: item.image ?? null,
      qty: 1,
      variant: item.variant ?? null,
    });

    openCart();

    // Opsional: kalau kamu mau otomatis hilang dari wishlist setelah masuk cart
    // handleRemove(key);
  };

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Your wishlist
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Wishlist
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                Simpan produk favorit kamu biar gampang ditemukan lagi.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/catalog"
                className="px-5 py-3 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
              >
                Open catalog
              </Link>

              {wishlistItems.length > 0 && typeof clear === "function" && (
                <button
                  type="button"
                  onClick={clear}
                  className="px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Clear wishlist
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            {wishlistItems.length} item
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      {wishlistItems.length === 0 ? (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 md:p-12 text-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                Wishlist kamu masih kosong
              </h2>
              <p className="mt-3 text-gray-600 max-w-xl mx-auto leading-relaxed">
                Klik tombol Add to Wishlist di halaman product untuk menyimpan
                pilihan kamu.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/catalog"
                  className="px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Browse products
                </Link>
                <Link
                  to="/"
                  className="px-5 py-3 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* GRID */
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.key}
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Image */}
                  <div className="bg-gray-50 flex items-center justify-center h-64">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full object-contain p-6"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {formatRupiah(item.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.key)}
                        className="shrink-0 px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-800 hover:border-black transition"
                        aria-label="Remove from wishlist"
                        title="Remove"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-3">
                      {/* View product sebaiknya ke detail page */}
                      <Link
                        to={`/product/${item.slug}`}
                        className="flex-1 text-center py-2.5 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
                      >
                        View product
                      </Link>

                      {/* Add to cart: jadi button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 text-center py-2.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                      >
                        Add to cart
                      </button>
                    </div>

                    <p className="mt-4 text-xs text-gray-500">
                      Saved for later. Tanpa spam. Tanpa ribet.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm font-semibold">Keep it real.</p>
                <p className="mt-1 text-sm text-gray-600">
                  Lanjut browse produk lain dan simpan yang paling kamu suka.
                </p>
              </div>

              <Link
                to="/catalog"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
              >
                Explore catalog
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
