import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

// GANTI PATH GAMBAR SESUAI FILE KAMU
import wellnessProduct from "../assets/wellness/massage-device.png";

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

export default function WellnessPage() {
  const { addItem, openCart } = useCart();

  // DATA PRODUK (bisa dipindah ke data file nanti)
  const product = useMemo(
    () => ({
      id: "wellness-001",
      slug: "everyday-comfort-device",
      name: "ClickClick Everyday Comfort Device",
      price: 0, // 🔥 isi > 0 saat launch
      image: wellnessProduct,
      status: "Coming Soon",
      shortDesc:
        "Alat wellness pertama dari ClickClick, dirancang untuk membantu tubuh lebih rileks setelah aktivitas harian.",
      highlights: [
        "Digunakan tanpa setup rumit",
        "Nyaman untuk area leher dan bahu",
        "Cocok untuk rutinitas harian",
      ],
      useCases: [
        {
          title: "Setelah jam kerja",
          desc: "Membantu tubuh kembali rileks setelah duduk dan aktivitas panjang.",
        },
        {
          title: "Di sela aktivitas",
          desc: "Dipakai sebentar untuk membantu tubuh terasa lebih nyaman.",
        },
        {
          title: "Sebelum tidur",
          desc: "Membantu transisi ke kondisi tubuh yang lebih tenang.",
        },
      ],
      details: [
        {
          title: "How to use",
          content:
            "Gunakan pada area leher atau bahu dalam posisi santai. Mulai dari intensitas rendah dan sesuaikan perlahan.",
        },
        {
          title: "Comfort focus",
          content:
            "Dirancang untuk memberikan rasa nyaman, bukan tekanan berlebih atau sensasi agresif.",
        },
        {
          title: "What’s inside the box",
          content:
            "1x Everyday Comfort Device, kabel pengisi daya, dan panduan penggunaan.",
        },
        {
          title: "Warranty & support",
          content:
            "Dukungan pelanggan ClickClick siap membantu selama masa penggunaan.",
        },
      ],
    }),
    []
  );

  const canBuy = product.price > 0;

  const handleBuy = () => {
    if (!canBuy) return;

    addItem({
      key: product.id,
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
      variant: { type: "wellness" },
    });

    openCart();
  };

  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Wellness by ClickClick
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
            Dirancang untuk tubuh
            <br />
            yang terus bergerak.
          </h1>

          <p className="mt-6 max-w-2xl text-gray-600 leading-relaxed">
            Setelah jam kerja panjang, konten yang tidak berhenti, dan rutinitas
            harian — tubuh juga butuh jeda. Produk wellness ClickClick hadir
            untuk membantu kamu kembali merasa nyaman.
          </p>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* IMAGE */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="relative aspect-square bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

                {product.status && (
                  <span className="absolute top-4 left-4 text-xs font-semibold border border-gray-200 bg-white px-3 py-1 rounded-full">
                    {product.status}
                  </span>
                )}
              </div>
            </div>

            {/* STICKY BUY BOX */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl font-semibold">{product.name}</h2>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {product.shortDesc}
              </p>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Price
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {canBuy ? formatRupiah(product.price) : "Segera hadir"}
                </p>
              </div>

              <button
                onClick={handleBuy}
                disabled={!canBuy}
                className={`mt-6 w-full py-3 rounded-lg text-sm font-semibold transition ${
                  canBuy
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {canBuy ? "Buy now" : "Coming soon"}
              </button>

              <p className="mt-4 text-xs text-gray-500">
                Designed for everyday comfort • ClickClick support included
              </p>

              {/* HIGHLIGHTS */}
              <ul className="mt-8 space-y-3 text-sm text-gray-700">
                {product.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-900" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT FITS YOUR DAY */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h3 className="text-3xl font-semibold">
            How it fits your day
          </h3>

          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            Tidak perlu jadwal khusus. Digunakan saat tubuh membutuhkannya.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl bg-white border border-gray-200 p-6"
              >
                <p className="text-sm font-semibold">{u.title}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS ACCORDION */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            {product.details.map((d) => (
              <details
                key={d.title}
                className="border-b border-gray-200 py-5"
              >
                <summary className="cursor-pointer font-medium text-gray-900 flex justify-between items-center">
                  {d.title}
                  <span>+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {d.content}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl bg-black text-white p-12">
            <p className="text-xs uppercase tracking-widest text-white/70">
              Wellness by ClickClick
            </p>

            <h4 className="mt-4 text-3xl font-semibold">
              Kenyamanan bukan kemewahan.
            </h4>

            <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">
              Produk wellness pertama dari ClickClick dibuat untuk menemani
              rutinitas harian. Saat tubuh terasa lebih nyaman, kamu bisa tetap
              fokus pada hal yang penting.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/catalog"
                className="px-6 py-3 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition text-center"
              >
                Lihat produk lainnya
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-white/30 rounded-lg text-sm font-semibold hover:border-white/60 transition text-center"
              >
                Tanya produk ini
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
