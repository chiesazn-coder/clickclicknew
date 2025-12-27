// src/components/WellnessSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import massageDevice from "../assets/wellness/massage-device.png";


const WellnessSection = () => {
  return (
    <section className="bg-white py-20 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT SIDE */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Wellness by CLICK CLICK
            </h2>

            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Peralatan sehari-hari yang dirancang untuk membantu tubuh lebih
              rileks, pulih, dan merasa lebih nyaman.
            </p>

            <div className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                ClickClick kini melangkah lebih jauh dari sekadar layar. Kami
                memperkenalkan lini produk wellness yang dirancang untuk
                mendukung tubuh setelah jam kerja panjang, aktivitas kreatif,
                dan rutinitas harian.
              </p>
            </div>

            <Link
                to="/wellness"
                className="inline-block mt-8 px-6 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                Jelajahi Wellness →
            </Link>
          </div>

          {/* PRODUCT TEASER */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <div className="aspect-square bg-white rounded-xl border border-gray-200 flex items-center justify-center p-4">
                <img
                    src={massageDevice}
                    alt="ClickClick Wellness Device"
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-gray-900">
              Everyday Comfort Device
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Alat wellness pertama dari ClickClick, dirancang untuk area leher
              dan bahu agar tubuh lebih rileks setelah beraktivitas.
            </p>

            <p className="mt-3 text-xs text-gray-500 uppercase tracking-widest">
              Coming soon
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WellnessSection;
