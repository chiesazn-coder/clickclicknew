// src/pages/CatalogPage.jsx
import React, { useState } from "react";

// Hero
import catalogHero from "../assets/catalog/hero-catalog.png";

// Produk 1 (M4)
import showerCreamImage from "../assets/catalog/relatedimage/prod-t1m.png";
import visual1 from "../assets/catalog/t1m/t1m-1.png";
import visual2 from "../assets/catalog/t1m/t1m-3.png";

// Produk 2 (T8D)
import shampooImage from "../assets/catalog/relatedimage/prod-t8d.png";
import shampooVisual1 from "../assets/catalog/t8d/t8d-4.png";
import shampooVisual2 from "../assets/catalog/t8d/t8d-3.png";

// Produk 3 (M4)
import conditionerImage from "../assets/catalog/relatedimage/prod-m4.png";
import hairMaskImage from "../assets/catalog/m4/m4-1.png";
import hairMaskImage2 from "../assets/catalog/m4/m4-2.png";

import t3bcover from "../assets/catalog/relatedimage/prod-t3b.png";
import t3bslide1 from "../assets/catalog/t3b/t3b-1.png";
import t3bslide2 from "../assets/catalog/t3b/t3b-2.png";

import ProductDetailSection from "../components/ProductDetailSection";
import ProductCarouselSection from "../components/ProductCarouselSection";
import RelatedProductsGrid from "../components/RelatedProductsGrid";

// Info default untuk section carousel bawah (howToUse, ingredients, dll)
const defaultInfo = {
  howToUse: [
    {
      title: "Turn on the Mirror Screen",
      description: "Press the power button until the screen lights up."
    },
    {
      title: "Switch to Mirror Mode",
      description: "Open the Mirror or Screen Mirroring menu on the device."
    },
    {
      title: "Enable Screen Mirroring on Your Smartphone",
      description: [
        "On iPhone, open Control Center and tap Screen Mirroring.",
        "On Android, open Settings and select Cast, Smart View, or Screen Mirroring."
      ]
    },
    {
      title: "Select Click Click Mirror Screen",
      description: "Choose your Click Click Mirror Screen model from the available device list."
    },
    {
      title: "Wait Until Connected",
      description: "Within seconds, your phone screen will appear on the Mirror Screen in real time."
    }
  ],
  
  texture: "Medium-weight cream",
  aroma: "Clove buds, Nutmeg, Honey",
};


// Data produk lengkap
const ALL_PRODUCTS = [
  {
    id: 0,
    name: "CLICK CLICK T1M",
    rawPrice: 1990000,
    imageSrc: showerCreamImage,
    description:
      "T1M hadir untuk kamu yang berani tampil jujur. Dengan refleksi kaca yang jernih dan cahaya natural, produk ini menonjolkan detail asli wajah secara tegas. Bukan soal sempurna, tapi soal tampil real dan percaya diri.",
    sizeOptions: ["3.97 inci"],
    defaultSize: "3.97 inci",
    functionsText: [
      "For the ones who keep it real.",
      "T1M nggak dirancang buat semua orang. Dia buat kamu yang pengen tampil apa adanya.",
      "Tanpa takut diliat dari dekat. Refleksinya jernih banget, setiap detail di wajah lo nggak disembunyiin. Dan justru di situ keindahannya: real, simple, confident.",
      "Bingkai kaca yang solid bikin pantulannya terasa tegas. Cahaya naturalnya ngasih tone warna yang pas di kamera. T1M itu statement. Nggak perlu perfect, yang penting real."
    ],
    dosageText: [
      "Type: T1M",
      "Screen Size: 3,97 IPS",
      "Resolution: 480×800P",
      "Longevity: 3 HoursDistance: 10-15 meters"
    ],
    productImages: [visual1, visual2],
    ...defaultInfo,
  },
  {
    id: 1,
    name: "CLICK CLICK T8D",
    rawPrice: 1850000,
    imageSrc: shampooImage,
    description:
      "T8D itu buat kamu yang pengin tampil chill tapi tetep standout. Desainnya bulat, ringan, dan pantulannya jernih kayak pagi yang baru mulai. Cahayanya auto-nyesuain, jadi muka tetep enak dilihat di semua angle.",
    sizeOptions: ["2.1 inci"],
    defaultSize: "2.1 inci",
    functionsText: [
      "For the ones who live in color.",
      "Ambil napas bentar. Bayangin pagi yang rame, tapi kamu tetep punya waktu buat senyum di depan kamera. T8D nyalain mood kamu, nggak cuma pantulanmu.",
      "Desain bulatnya ngasih vibe hangat, cahayanya nyatu sama kulit, dan semua terlihat effortless tanpa filter berlebih.",
      "T8D cocok buat yang pengin tampil real tapi fun, buat kamu yang percaya glow up terbaik itu yang datang dari rasa nyaman.",
      "Keep your glow up real."
    ],
    dosageText: [
      "Type: T8D",
      "Screen Size: 2,1 IPS",
      "Resolution: 480×480P",
      "Longevity: 4 HoursDistance: 10-15 meters"
    ],
    productImages: [shampooVisual1,shampooVisual2],
    ...defaultInfo,
  },
  {
    id: 2,
    name: "CLICK CLICK M4",
    rawPrice: 1990000,
    imageSrc: conditionerImage,
    description:
      "M4 nggak butuh banyak gaya. Dia nunjukin versi paling chill dari kamu. Metal bodynya halus, pantulannya jernih, dan cahaya nyebar rata. Buat kamu yang suka vibe minimal tapi tetep classy.",
    sizeOptions: ["4.0 inci"],
    defaultSize: "4,0 inci",
    functionsText: [
      "For the ones who live in color.",
      "Kadang yang paling kuat itu bukan yang paling rame. M4 hadir buat kamu yang kerja diam-diam, tapi hasilnya tetap on point.",
      "Finishing metal-nya ngasih kesan cool dan tenang. Cahayanya soft, pantulannya stabil bikin kamu lebih fokus ke vibe, bukan alatnya.Nggak perlu tampil rame. M4 tuh bukti kalau calm juga power.",
      "Do less. Look better."
    ],
    dosageText: [
      "Type: M4",
      "Screen Size: 4,0 IPS",
      "Resolution: 720×1280P",
      "Longevity: 3 Hours",
      "Distance: 10-15 meters"
    ],
    productImages: [hairMaskImage,hairMaskImage2],
    ...defaultInfo,
  },
  {
    id: 3,
    name: "CLICK CLICK T3B",
    rawPrice: 1650000,
    imageSrc: t3bcover,
    description:
      "Kadang kerjaan, konten, dan cerita nggak bisa berhenti. Dan T3B dibuat buat momen itu. Baterainya kuat banget (2500 mAh), layarnya lega (4.7 IPS) dan cahayanya tetap soft walau lighting berubah.Buat kamu yang nggak mau ribet ganti-ganti posisi atau nyari angle tiap jam, T3B selalu siap, stabil, tenang, dan real.",
    sizeOptions: ["4.7 inci"],
    defaultSize: "4.7 inci",
    functionsText: [
      "For days that never stop.",
      "Kadang kerjaan, konten, dan cerita nggak bisa berhenti. Dan T3B dibuat buat momen itu.",
      "Baterainya kuat banget (2500 mAh), layarnya lega (4.7 inch), dan cahayanya tetap soft walau lighting berubah.",
      "Buat kamu yang nggak mau ribet ganti-ganti posisi atau nyari angle tiap jam, T3B selalu siap — stabil, tenang, dan real.Bukan soal power aja, tapi soal rasa tenang saat tau alat kamu selalu siap nemenin.",
      "Never off. Just like you."
    ],
    dosageText: [
      "Type: T3B",
      "Screen Size: 4,7 IPS",
      "Resolution: 720×1080P",
      "Longevity: 5 HoursDistance: 10-15 meters",
    ],
    productImages: [t3bslide1, t3bslide2],
    ...defaultInfo,
  },
];

export default function CatalogPage() {
  const [currentProduct, setCurrentProduct] = useState(ALL_PRODUCTS[0]);

  const handleProductClick = (productId) => {
    const newProduct = ALL_PRODUCTS.find((p) => p.id === productId);
    if (newProduct) {
      setCurrentProduct(newProduct);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const productsToShowInGrid = ALL_PRODUCTS.filter(
    (product) => product.id !== currentProduct.id
  );

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-screen">
        <img
          src={catalogHero}
          alt="ClickClick Hero Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Detail Produk */}
      <ProductDetailSection
        productId={currentProduct.id}
        productImage={currentProduct.imageSrc}
        productName={currentProduct.name}
        rawPrice={currentProduct.rawPrice}
        description={currentProduct.description}
        sizeOptions={currentProduct.sizeOptions}
        defaultSize={currentProduct.defaultSize}
        functionsText={currentProduct.functionsText}
        dosageText={currentProduct.dosageText}
      />

      {/* Carousel + Info tambahan */}
      <ProductCarouselSection
        productImages={currentProduct.productImages}
        howToUse={currentProduct.howToUse}
        ingredients={currentProduct.ingredients}
      />

      {/* Produk terkait */}
      <RelatedProductsGrid
        products={productsToShowInGrid}
        onProductClick={handleProductClick}
      />
    </main>
  );
}
