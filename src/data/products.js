// src/data/products.js
import m4_1 from "../assets/selfie/product/m4/m4-1.png";
import m4_2 from "../assets/selfie/product/m4/m4-2.png";
import m4_3 from "../assets/selfie/product/m4/m4-3.png";

import t8d_1 from "../assets/selfie/product/t8d/t8d-5.png";
import t8d_2 from "../assets/selfie/product/t8d/t8d-2.png";
import t8d_3 from "../assets/selfie/product/t8d/t8d-3.png";

import t1m_1 from "../assets/selfie/product/t1m/t1m-5.png";
import t1m_2 from "../assets/selfie/product/t1m/t1m-2.png";
import t1m_3 from "../assets/selfie/product/t1m/t1m-3.png";

import t3b_1 from "../assets/selfie/product/t3b/t3b-5.png";
import t3b_2 from "../assets/selfie/product/t3b/t3b-2.png";
import t3b_3 from "../assets/selfie/product/t3b/t3b-3.png";

export const products = [
  {
    id: 1,
    slug: "click-click-m4-mirror-selfie",
    title: "CLICK CLICK M4 MIRROR SELFIE",
    price: 995000,
    originalPrice: 1990000,       // optional, utk diskon / detail
    isNew: true,
    colors: ["#5C7EAB", "#E8DAC6", "#F4E98E"],
    images: [m4_3, m4_2, m4_1],
    alt: "Click Click M4 Mirror Selfie",
    shortDescription:
      "Mirror selfie stand minimalis untuk daily content dan live yang stabil.",
  },
  {
    id: 2,
    slug: "click-click-t8d-mirror-selfie",
    title: "CLICK CLICK T8D MIRROR SELFIE",
    price: 925000,
    originalPrice: 1850000,
    isNew: true,
    colors: ["#E9E0D4", "#5C7EAB", "#6C846E"],
    images: [t8d_1, t8d_2, t8d_3],
    alt: "Click Click T8D Mirror Selfie",
    shortDescription:
      "Tripod mirror selfie yang fleksibel untuk konten di meja maupun lantai.",
  },
  {
    id: 3,
    slug: "click-click-t3b-mirror-selfie",
    title: "CLICK CLICK T3B MIRROR SELFIE",
    price: 825000,
    originalPrice: 1690000,
    isNew: true,
    colors: ["#6C846E", "#5C7EAB", "#E9E0D4"],
    images: [t3b_1, t3b_2, t3b_3],
    alt: "Click Click T3B Mirror Selfie",
    shortDescription:
      "Mirror selfie dengan body ramping untuk ruangan kecil dan setup minimal.",
  },
  {
    id: 4,
    slug: "click-click-t1m-mirror-selfie",
    title: "CLICK CLICK T1M MIRROR SELFIE",
    price: 825000,
    originalPrice: 1690000,
    isNew: true,
    colors: ["#6C846E", "#5C7EAB", "#E9E0D4"],
    images: [t1m_1, t1m_2, t1m_3],
    alt: "Click Click T1M Mirror Selfie",
    shortDescription:
      "Mirror selfie tinggi yang cocok untuk full body angle dan outfit check.",
  },
];
