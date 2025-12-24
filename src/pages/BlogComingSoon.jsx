import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlogComingSoon = () => {
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Blog
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Coming soon.
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            Stories, tips, and creator notes are being prepared. Drop your email if you
            want a heads up when the first post goes live.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Open catalog
            </Link>
            <Link
              to="/#all-products"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left card */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold">What to expect</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                The blog will cover quick guides, product notes, and creator workflows.
                Everything stays clean, practical, and easy to read.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Creator tips</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Simple setups, better results.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Behind the product</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Design choices and details.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">New drops</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Announcements and updates.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Community stories</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Real creators, real workflow.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: notify form */}
            <div className="rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold">Get notified</h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Leave your email and we will notify you when the blog launches.
              </p>

              {done ? (
                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-semibold">You’re on the list.</p>
                  <p className="mt-1 text-sm text-gray-600">
                    We will email you when the first post is live.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDone(false)}
                    className="mt-4 inline-flex px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                  >
                    Add another email
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-black text-white py-3 text-sm font-semibold hover:bg-gray-800 transition"
                  >
                    Notify me
                  </button>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    No spam. Only launch updates.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl bg-black text-white p-10">
            <h3 className="text-2xl md:text-3xl font-semibold">
              Meanwhile, explore the lineup.
            </h3>
            <p className="mt-3 text-white/80 max-w-2xl">
              Pick the model that matches your vibe and workflow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="px-5 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
              >
                Open catalog
              </Link>
              <Link
                to="/"
                className="px-5 py-3 rounded-lg border border-white/30 text-sm font-semibold hover:border-white/60 transition"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogComingSoon;
