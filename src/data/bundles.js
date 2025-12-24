// src/data/bundles.js
import bundling1 from "../assets/selfie/bundling/Bundling-1.png";
import bundling2 from "../assets/selfie/bundling/Bundling-2.png";
import bundling3 from "../assets/selfie/bundling/Bundling-3.png";
import bundling4 from "../assets/selfie/bundling/Bundling-4.png";

export const bundles = [
  {
    id: "bundle-1",
    slug: "clickclick-starter-bundle",
    title: "CLICK CLICK STARTER BUNDLE",
    discountLabel: "-53%",
    price: 1619000,
    originalPrice: 3440000,
    note: "Bundling M4 and T3B",
    image: bundling1,

    // optional untuk future (kalau nanti mau pecah jadi produk)
    items: ["click-click-m4-mirror-selfie", "click-click-t3b-mirror-selfie"],
  },
  {
    id: "bundle-2",
    slug: "clickclick-creator-pack",
    title: "CLICK CLICK CREATOR PACK",
    discountLabel: "-54%",
    price: 1709000,
    originalPrice: 3680000,
    note: "Bundling M4 and T8D",
    image: bundling2,
    items: ["click-click-m4-mirror-selfie", "click-click-t8d-mirror-selfie"],
  },
  {
    id: "bundle-3",
    slug: "clickclick-daily-content",
    title: "CLICK CLICK DAILY CONTENT",
    discountLabel: "-54%",
    price: 1569000,
    originalPrice: 3340000,
    note: "Bundling T1M and T8D",
    image: bundling3,
    items: ["click-click-t1m-mirror-selfie", "click-click-t8d-mirror-selfie"],
  },
  {
    id: "bundle-4",
    slug: "clickclick-mirror-selfie-kit",
    title: "CLICK CLICK MIRROR SELFIE KIT",
    discountLabel: "-53%",
    price: 1639000,
    originalPrice: 3480000,
    note: "Bundling T1M and M4",
    image: bundling4,
    items: ["click-click-t1m-mirror-selfie", "click-click-m4-mirror-selfie"],
  },
];
