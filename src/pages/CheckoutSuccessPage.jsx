import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get("order_id") || "—";

  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header ala Shopify */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-widest">CLICKCLICK</div>
          <button
            onClick={() => navigate("/catalog")}
            className="text-sm text-gray-600 hover:text-black"
          >
            Continue shopping
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Thank you message */}
          <section className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold tracking-widest text-gray-500">
                    ORDER CONFIRMED
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                    Thank you. Your order is on the way.
                  </h1>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Pembayaran telah diterima dan pesanan kamu sedang diproses. Detail konfirmasi akan
                    dikirim ke email yang kamu gunakan saat checkout.
                  </p>

                  <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Order number</span>
                      <span className="text-sm font-semibold text-gray-900">{orderId}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Simpan nomor ini untuk memudahkan tracking dan support.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate("/catalog")}
                      className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90"
                    >
                      Continue shopping
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-black/5"
                    >
                      Back to home
                    </button>
                  </div>

                  <p className="mt-6 text-xs text-gray-500 leading-relaxed">
                    Need help? Hubungi tim kami dan sertakan order number di atas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Summary style ala Shopify */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900">What happens next</h2>

              <div className="mt-4 space-y-4 text-sm text-gray-600">
                <Step
                  title="Order processed"
                  desc="Pesanan masuk ke sistem dan disiapkan untuk pengemasan."
                />
                <Step
                  title="Packed and dispatched"
                  desc="Barang dikemas, lalu diserahkan ke kurir untuk pengiriman."
                />
                <Step
                  title="Delivered"
                  desc="Pesanan diterima. Kamu bisa hubungi kami jika ada kendala."
                />
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment</span>
                  <span className="text-sm font-semibold text-gray-900">Midtrans</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Transaksi diproses melalui Midtrans Payment Gateway.
                </p>
              </div>

              <button
                onClick={() => navigate("/catalog")}
                className="mt-6 w-full rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-black/5"
              >
                Shop more
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Step({ title, desc }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{desc}</div>
    </div>
  );
}
