import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // sementara: simulate submit (nanti bisa diganti ke API / Email service)
    setTimeout(() => setStatus("sent"), 700);
  };

  return (
    <main className="bg-white text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Contact
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Let’s talk.
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            Need help choosing a model, tracking an order, or partnering with ClickClick?
            Send a message and we will get back to you.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Open catalog
            </Link>
            <Link
              to="/#all-products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 font-semibold hover:border-black transition"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Info card */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold">Contact information</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Prefer a faster reply? Reach out via email or social. Business inquiries are welcome.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Email
                  </p>
                  <a
                    href="mailto:officialclickclick@gmail.com"
                    className="mt-2 block text-sm font-semibold text-gray-900 hover:underline"
                  >
                    officialclickclick@gmail.com
                  </a>
                  <p className="mt-1 text-sm text-gray-600">
                    Support and general questions
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/6281138000729"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm font-semibold text-gray-900 hover:underline"
                  >
                    +62 811-3800-0729
                  </a>
                  <p className="mt-1 text-sm text-gray-600">
                    Quick questions and order support
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Social
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href="https://www.instagram.com/clickclickofficial.id/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.tiktok.com/@clickclickmall?_r=1&_t=ZS-92Txsmk9ROj"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
                    >
                      TikTok
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Response time
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Typical reply within 24 to 48 hours on business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold">Send a message</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Fill the form below. Keep it short, clear, and we will handle the rest.
              </p>

              {status === "sent" ? (
                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-semibold text-gray-900">
                    Message sent.
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Thanks. We will get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                        placeholder="Azizi"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                        placeholder="(optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Topic
                    </label>
                    <select
                      className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black bg-white"
                      defaultValue="general"
                    >
                      <option value="general">General question</option>
                      <option value="order">Order support</option>
                      <option value="product">Product recommendation</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black resize-none"
                      placeholder="Tell us what you need help with..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-lg bg-black text-white py-3 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    By submitting, you agree to our{" "}
                    <a className="underline" href="#">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
