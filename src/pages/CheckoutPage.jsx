// src/pages/CheckoutPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

// === Province dropdown: values sengaja pakai format "display" normal.
// Backend kamu akan canonicalize menjadi lowercase + mapping alias.
const INDONESIA_PROVINCES = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
  "Papua Barat",
  "Papua Barat Daya",
];

// Business rule: 1 produk = 1 kg
function chargeableWeightGramByQty(items) {
  const totalQty = (items || []).reduce(
    (sum, it) => sum + Number(it.qty ?? it.quantity ?? 0),
    0
  );
  const kg = Math.max(1, totalQty);
  return kg * 1000; // gram
}
function humanWeightFromQty(items) {
  const totalQty = (items || []).reduce(
    (sum, it) => sum + Number(it.qty ?? it.quantity ?? 0),
    0
  );
  return `${Math.max(1, totalQty)} kg`;
}

// Vite env (frontend)
const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Endpoints on hosting (public_html)
const CREATE_URL = `${API_BASE_URL}/api/create-transaction.php`;
const SHIP_URL = `${API_BASE_URL}/api/shipping-rates.php`;

const ID_SUBSIDY_MAX = 50000;
const PROTECTION_PRICE = 30000;

// Voucher (opsional)
const VOUCHERS = {
  CLICK50K: { type: "flat", amount: 50000, minSubtotal: 200000 },
  CLICK10: { type: "percent", amount: 10, max: 100000 },
  "DEV-20K": { type: "set-total", amount: 20000 },
  CLICK4U50: { type: "flat", amount: 50000 },
};

function calcDiscount(sub, shipFee, appliedVoucher) {
  if (!appliedVoucher?.code) return 0;
  const rule = VOUCHERS[appliedVoucher.code];
  if (!rule) return 0;

  if (rule.type === "flat") {
    if (rule.minSubtotal && sub < rule.minSubtotal) return 0;
    return Math.min(rule.amount, sub);
  }

  if (rule.type === "percent") {
    const cut = Math.floor(sub * (rule.amount / 100));
    return Math.min(rule.max || cut, cut);
  }

  if (rule.type === "set-total") {
    const target = Math.max(1000, rule.amount | 0);
    const current = sub + (shipFee || 0);
    return current > target ? current - target : 0;
  }

  return 0;
}

// Load Snap.js based on client key (SB- => sandbox)
function loadMidtransSnap(clientKey) {
  return new Promise((resolve, reject) => {
    if (window.snap) return resolve(true);
    if (!clientKey) return reject(new Error("Missing MIDTRANS client key"));

    const isSandbox = String(clientKey).includes("SB-");
    const s = document.createElement("script");
    s.src = isSandbox
      ? "https://app.sandbox.midtrans.com/snap/snap.js"
      : "https://app.midtrans.com/snap/snap.js";
    s.setAttribute("data-client-key", clientKey);
    s.onload = () => resolve(true);
    s.onerror = () => reject(new Error("Failed to load Midtrans Snap.js"));
    document.body.appendChild(s);
  });
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, totalQty, clearCart } = useCart();

  // Form state (baru)
  const [form, setForm] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    province: "", // dropdown
    postalCode: "",
    notes: "",
    paymentMethod: "midtrans_snap",
  });

  // Shipping state
  const [shippingOptions, setShippingOptions] = React.useState([]);
  const [selectedShip, setSelectedShip] = React.useState(null);
  const [shipNote, setShipNote] = React.useState(
    "Masukkan kota & provinsi untuk melihat opsi pengiriman."
  );
  const [loadingShip, setLoadingShip] = React.useState(false);

  // Protection + voucher
  const [withProtection, setWithProtection] = React.useState(false);
  const [voucherInput, setVoucherInput] = React.useState("");
  const [appliedVoucher, setAppliedVoucher] = React.useState(null);
  const [discountValue, setDiscountValue] = React.useState(0);

  // Submit state
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  // Preload Snap.js
  React.useEffect(() => {
    if (!MIDTRANS_CLIENT_KEY) return;
    loadMidtransSnap(MIDTRANS_CLIENT_KEY).catch(() => {});
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  function applyVoucher(e) {
    e.preventDefault();
    const code = (voucherInput || "").trim().toUpperCase();
    if (!code || !VOUCHERS[code]) {
      setAppliedVoucher(null);
      setErrMsg("Kode voucher tidak valid.");
      return;
    }
    setAppliedVoucher({ code });
    setErrMsg("");
  }

  // === Fetch shipping: sesuai shipping-rates.php
  async function fetchShipping() {
    // shipping-rates.php butuh province wajib
    if (!form.province.trim()) {
      setShippingOptions([]);
      setSelectedShip(null);
      setShipNote("Pilih provinsi untuk melihat opsi pengiriman.");
      return;
    }
    if (!form.city.trim()) {
      setShippingOptions([]);
      setSelectedShip(null);
      setShipNote("Masukkan kota untuk melihat opsi pengiriman.");
      return;
    }

    const weightGram = chargeableWeightGramByQty(items);

    setLoadingShip(true);
    setShipNote("Mengambil tarif pengiriman...");
    setErrMsg("");

    try {
      const res = await fetch(SHIP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: "ID",
          province: form.province,
          city: form.city,
          weight_gram: weightGram,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Gagal memuat tarif pengiriman.");

      let opts = Array.isArray(data.methods) ? data.methods : [];

      // FE apply subsidi max 50k (sesuai komentar di shipping-rates.php)
      opts = opts.map((opt) => {
        const original = Number(opt.fee || 0);
        const cut = Math.min(ID_SUBSIDY_MAX, original);
        return {
          ...opt,
          original_fee: original,
          subsidy: cut,
          fee: Math.max(0, original - cut),
        };
      });

      // sort
      opts.sort((a, b) => Number(a.fee) - Number(b.fee));

      setShippingOptions(opts);

      const first = opts[0];
      setSelectedShip(
        first ? { id: first.id, name: first.name, fee: Number(first.fee || 0) } : null
      );

      setShipNote(
        `Berat tertagih: ${humanWeightFromQty(items)} · Subsidi ongkir hingga ${formatIDR(
          ID_SUBSIDY_MAX
        )}.`
      );
    } catch (e) {
      setShippingOptions([]);
      setSelectedShip(null);
      setShipNote("Gagal memuat tarif pengiriman. Coba lagi.");
    } finally {
      setLoadingShip(false);
    }
  }

  // Debounce auto fetch shipping saat city/province/items berubah
  React.useEffect(() => {
    if (!items?.length) return;
    const t = setTimeout(fetchShipping, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.city, form.province, items]);

  // Totals
  const shipFee = selectedShip ? Number(selectedShip.fee || 0) : 0;
  const subtotalWithProtection = subtotal + (withProtection ? PROTECTION_PRICE : 0);

  React.useEffect(() => {
    const d = calcDiscount(subtotalWithProtection, shipFee, appliedVoucher);
    setDiscountValue(d);
  }, [subtotalWithProtection, shipFee, appliedVoucher]);

  const total = Math.max(0, subtotalWithProtection + shipFee - discountValue);

  function validate() {
    if (!items?.length) return "Keranjang masih kosong.";
    if (!form.email.trim()) return "Email wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Format email tidak valid.";
    if (!form.firstName.trim()) return "First name wajib diisi.";
    if (!form.lastName.trim()) return "Last name wajib diisi.";
    if (!form.phone.trim()) return "Phone wajib diisi.";
    if (!form.address.trim()) return "Address wajib diisi.";
    if (!form.city.trim()) return "City wajib diisi.";
    if (!form.province.trim()) return "Province wajib dipilih.";
    if (!form.postalCode.trim()) return "Postal code wajib diisi.";
    if (!selectedShip) return "Silakan pilih metode pengiriman.";
    if (!MIDTRANS_CLIENT_KEY) return "Midtrans client key belum di-set di Vite env.";
    return "";
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErrMsg(v);
      return;
    }

    setIsSubmitting(true);
    setErrMsg("");

    try {
      await loadMidtransSnap(MIDTRANS_CLIENT_KEY);

      const order_id = `CC-${Date.now()}`;

      const item_details = items.map((it) => ({
        id: String(it.id ?? it.slug ?? it.name),
        name: String(it.name || "Item").slice(0, 50),
        price: Number(it.price),
        quantity: Number(it.qty ?? it.quantity ?? 1),
      }));

      // protection
      if (withProtection) {
        item_details.push({
          id: "SHIP_PROTECT",
          name: "Shipping Protection",
          price: PROTECTION_PRICE,
          quantity: 1,
        });
      }

      // discount negative
      if (discountValue > 0) {
        item_details.push({
          id: "DISCOUNT",
          name: `Voucher ${appliedVoucher?.code || ""}`.trim().slice(0, 50),
          price: -Math.min(discountValue, subtotalWithProtection + shipFee),
          quantity: 1,
        });
      }

      // Kirim ke create-transaction.php (yang simpan DB + call Snap)
      const res = await fetch(CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id,
          item_details,
          shipping_fee: shipFee,
          customer_details: {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            shipping_address: {
              address: form.address,
              city: form.city,
              province: form.province,
              postal_code: form.postalCode,
              country_code: "IDN",
            },
          },
          expiry: { unit: "days", duration: 1 },
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Gagal membuat transaksi (HTTP ${res.status})`);

      const token = data.token;
      const returnedOrderId = data.order_id || order_id;
      if (!token) throw new Error("Token Midtrans tidak ditemukan dari backend.");

      // Optional snapshot
      try {
        const snapshot = {
          order_id: returnedOrderId,
          subtotal,
          shipping_fee: shipFee,
          protection: withProtection ? PROTECTION_PRICE : 0,
          discount: discountValue,
          total,
        };
        sessionStorage.setItem("last_checkout_snapshot", JSON.stringify(snapshot));
        localStorage.setItem("last_order_id", returnedOrderId);
      } catch (_) {}

      window.snap.pay(token, {
        onSuccess: () => {
          clearCart();
          navigate(`/checkout/success?order_id=${encodeURIComponent(returnedOrderId)}`);
        },
        onPending: () => {
          navigate(`/checkout/pending?order_id=${encodeURIComponent(returnedOrderId)}`);
        },
        onError: () => setErrMsg("Payment failed. Please try again."),
        onClose: () => {},
      });
    } catch (err) {
      console.error(err);
      setErrMsg(err?.message || "Gagal memulai pembayaran. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!items?.length) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Keranjang kamu masih kosong.</p>

          <button
            onClick={() => navigate("/catalog")}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90"
          >
            Start Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-widest">CLICKCLICK</div>
          <button onClick={() => navigate("/catalog")} className="text-sm text-gray-600 hover:text-black">
            Return to shop
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT */}
          <section className="lg:col-span-7">
            <form onSubmit={onSubmit} className="space-y-8">
              {errMsg ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errMsg}
                </div>
              ) : null}

              {/* Contact */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900">Contact</h2>
                  <span className="text-xs text-gray-500">Required</span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@email.com"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="First name"
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      placeholder="Your first name"
                      required
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>

                  <Field
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+62 ..."
                    required
                  />
                </div>
              </div>

              {/* Shipping address */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-gray-900">Shipping address</h2>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  <Field
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="Street address, apartment, etc."
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={onChange}
                      placeholder="Jakarta Barat"
                      required
                    />

                    {/* Province dropdown */}
                    <label className="block">
                      <span className="text-xs font-semibold text-gray-700">Province</span>
                      <select
                        name="province"
                        value={form.province}
                        onChange={onChange}
                        required
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black bg-white"
                      >
                        <option value="">Pilih provinsi</option>
                        {INDONESIA_PROVINCES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <Field
                    label="Postal code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={onChange}
                    placeholder="12345"
                    required
                  />

                  <Textarea
                    label="Order notes (optional)"
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    placeholder="Catatan untuk kurir, warna preferensi, dll."
                  />
                </div>
              </div>

              {/* Shipping method */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900">Shipping method</h2>
                  <button
                    type="button"
                    onClick={fetchShipping}
                    className="text-xs font-semibold text-gray-600 hover:text-black"
                  >
                    Refresh
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">{shipNote}</p>

                {loadingShip ? (
                  <p className="mt-3 text-sm text-gray-600">Loading shipping options…</p>
                ) : shippingOptions.length ? (
                  <div className="mt-4 space-y-2">
                    {shippingOptions.map((opt) => {
                      const checked = selectedShip?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setSelectedShip({
                              id: opt.id,
                              name: opt.name,
                              fee: Number(opt.fee || 0),
                            })
                          }
                          className={`w-full text-left rounded-xl border px-4 py-4 transition ${
                            checked ? "border-black" : "border-gray-200 hover:border-gray-300"
                          }`}
                          aria-pressed={checked}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{opt.name}</div>
                              <div className="mt-1 text-xs text-gray-500">
                                {opt.etd ? `Estimasi ${opt.etd} hari` : ""}
                              </div>
                            </div>

                            <div className="text-sm font-semibold text-gray-900">
                              {Number(opt.fee || 0) === 0 ? "Free" : formatIDR(opt.fee)}
                            </div>
                          </div>

                          {opt.original_fee != null && Number(opt.original_fee) !== Number(opt.fee) ? (
                            <div className="mt-2 text-xs text-gray-500">
                              <span className="line-through mr-2">{formatIDR(opt.original_fee)}</span>
                              <span>Subsidi {formatIDR(opt.subsidy || 0)}</span>
                            </div>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-600">
                    Pilih provinsi dan isi kota untuk melihat opsi pengiriman.
                  </p>
                )}

                <p className="mt-3 text-xs text-gray-500">
                  Catatan: 1 produk dihitung 1 kg (payload weight_gram dikirim ke backend).
                </p>
              </div>

              {/* Protection + Voucher */}
              <div className="border border-gray-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Shipping protection</div>
                    <div className="text-xs text-gray-500">Perlindungan paket opsional</div>
                  </div>

                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={withProtection}
                      onChange={(e) => setWithProtection(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="font-semibold">{formatIDR(PROTECTION_PRICE)}</span>
                  </label>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900">Voucher</div>
                  <form onSubmit={applyVoucher} className="mt-2 flex gap-2">
                    <input
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      placeholder="Discount code"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold hover:bg-black/5"
                    >
                      Apply
                    </button>
                  </form>

                  {appliedVoucher?.code ? (
                    <p className="mt-2 text-xs text-gray-600">
                      Voucher aktif: <span className="font-semibold">{appliedVoucher.code}</span>
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Payment */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-gray-900">Payment</h2>

                <p className="mt-1 text-sm text-gray-600">
                  Pembayaran diproses aman melalui <span className="font-semibold">Midtrans Snap</span>.
                </p>

                <div className="mt-4 space-y-3">
                  <Radio
                    checked={form.paymentMethod === "midtrans_snap"}
                    onChange={() => setForm((s) => ({ ...s, paymentMethod: "midtrans_snap" }))}
                    title="Midtrans Snap"
                    desc="Mendukung transfer bank, e-wallet, QRIS, kartu, dan metode lainnya."
                  />
                </div>

                <p className="mt-3 text-xs text-gray-500">Secure payment powered by Midtrans</p>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/catalog")}
                  className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-black/5"
                >
                  Continue shopping
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-black/90 disabled:opacity-60"
                >
                  {isSubmitting ? "Processing..." : "Pay with Midtrans"}
                </button>
              </div>
            </form>
          </section>

          {/* RIGHT */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-semibold text-gray-900">Order summary</h2>

              <div className="mt-4 space-y-4">
                {items.map((it) => (
                  <div key={it.key ?? it.id ?? it.slug ?? it.name} className="flex gap-4">
                    <div className="relative h-16 w-16 rounded-lg bg-black/5 overflow-hidden flex items-center justify-center">
                      {it.image ? (
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-xs text-black/40">No Image</div>
                      )}

                      <div className="absolute -top-2 -right-2 h-6 min-w-[24px] px-2 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center">
                        {it.qty ?? it.quantity ?? 0}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-medium leading-snug">{it.name}</div>
                      <div className="mt-1 text-xs text-gray-500">{formatIDR(it.price)} each</div>
                    </div>

                    <div className="text-sm font-semibold">
                      {formatIDR(Number(it.price) * Number(it.qty ?? it.quantity ?? 0))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-4 space-y-3 text-sm">
                <Row label="Subtotal" value={formatIDR(subtotal)} />
                <Row label="Shipping" value={selectedShip ? (shipFee === 0 ? "Free" : formatIDR(shipFee)) : "Select shipping"} />
                <Row label="Protection" value={withProtection ? formatIDR(PROTECTION_PRICE) : "No"} />
                <Row label="Discount" value={discountValue > 0 ? `- ${formatIDR(discountValue)}` : "0"} />

                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-base font-semibold text-gray-900">{formatIDR(total)}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                Setelah klik Pay with Midtrans, popup pembayaran akan muncul untuk menyelesaikan transaksi.
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Berat tertagih sekarang: <span className="font-semibold">{humanWeightFromQty(items)}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* --- UI helpers --- */
function Field({ label, name, value, onChange, placeholder, required, type = "text" }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-700">{label}</span>
      <input
        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

function Textarea({ label, name, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-700">{label}</span>
      <textarea
        className="mt-2 w-full min-h-[96px] rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

function Radio({ checked, onChange, title, desc }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full text-left rounded-xl border px-4 py-4 transition ${
        checked ? "border-black" : "border-gray-200 hover:border-gray-300"
      }`}
      aria-pressed={checked}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 h-4 w-4 rounded-full border flex items-center justify-center ${
            checked ? "border-black" : "border-gray-300"
          }`}
        >
          {checked && <div className="h-2 w-2 rounded-full bg-black" />}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          <div className="mt-1 text-xs text-gray-500">{desc}</div>
        </div>
      </div>
    </button>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
