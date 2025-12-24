import React from "react";

const AboutPage = () => {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            About ClickClick
          </p>

          <h1 className="mt-3 text-4xl md:text-6xl font-semibold leading-tight">
            Built for creators who keep it real.
          </h1>

          <p className="mt-5 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
            ClickClick is designed to make content creation feel simpler, more
            natural, and more confident. Clean visuals, honest reflection, and a
            product experience that stays effortless.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#our-story"
              className="px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Our story
            </a>
            <a
              href="#values"
              className="px-5 py-3 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
            >
              What we believe
            </a>
          </div>

          {/* Small highlight card (tanpa gambar) */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <p className="text-sm text-gray-600">
              A clean setup matters. The vibe stays minimal, the result stays sharp.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="our-story" className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Our story</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                ClickClick started with a simple idea: creators deserve tools
                that feel intuitive and look premium, without adding complexity.
                Every detail is shaped to support real moments and clean results.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The goal is not to change who you are. The goal is to help you
                show up with clarity, comfort, and confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                The promise
              </p>
              <p className="mt-3 text-lg font-semibold">
                Minimal setup. Honest visuals. A smoother workflow.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Designed for comfort</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Simple to use, easy to carry, ready anytime.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Clean aesthetic</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Looks good on your desk and in your content.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Creator-first</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Built around real workflows and real needs.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold">Confidence boost</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Keep it real, show up better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                What we believe
              </h2>
              <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">
                A modern product should be useful, beautiful, and easy to live with.
                That is the standard we build on.
              </p>
            </div>

            <a
              href="/catalog"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Explore products
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-semibold">Honest by design</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Visuals should feel natural. Products should feel transparent and straightforward.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-semibold">Less noise, more focus</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Your tools should disappear into the background, so your ideas can stand out.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-semibold">Made to last</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Solid build, clean finishing, and a feel that stays premium over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl bg-black text-white p-10 md:p-12">
            <h3 className="text-2xl md:text-3xl font-semibold">
              Ready to keep it real?
            </h3>
            <p className="mt-3 text-white/80 max-w-2xl leading-relaxed">
              Browse the ClickClick lineup and find the model that matches your style and workflow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/catalog"
                className="px-5 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
              >
                Open catalog
              </a>
              <a
                href="/#all-products"
                className="px-5 py-3 rounded-lg border border-white/30 text-sm font-semibold hover:border-white/60 transition"
              >
                View all products
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
