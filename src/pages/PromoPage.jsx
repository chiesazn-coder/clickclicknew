// src/pages/PromoPage.jsx
import React from "react";

// HERO: beda file untuk mobile vs desktop
import heroDesktop from "../assets/promo/hero-promo.png";
import heroMobile from "../assets/promo/hero-promo-mobile.png";

// Desktop only promos
import promoT1M from "../assets/promo/promo-1.png";
import promo2 from "../assets/promo/promo-2.png";

export default function PromoPage() {
  return (
    <main className="bg-white min-h-screen pb-10">
      {/* =========================
          HERO (MOBILE ONLY)
          ========================= */}
      <section className="w-full md:hidden">
        <img
          src={heroMobile}
          alt="ClickClick Special Promo (Mobile)"
          className="w-full h-auto align-top"
          loading="eager"
        />
      </section>

      {/* =========================
          HERO (DESKTOP ONLY)
          ========================= */}
      <section className="w-full hidden md:block">
        <img
          src={heroDesktop}
          alt="ClickClick Special Promo (Desktop)"
          className="w-full h-auto align-top"
          loading="eager"
        />
      </section>

      {/* =========================
          DESKTOP ONLY CONTENT
          ========================= */}
      <div className="hidden md:block">
        {/* Promo T1M */}
        <section className="container mx-auto px-4 mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={promoT1M}
                alt="Promo Click Click T1M - Extra Diskon"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Promo 2 */}
        <section className="w-full py-12">
          <img
            src={promo2}
            alt="ClickClick Special Promo - Section 2"
            className="w-full h-auto align-top"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
}
