import React from 'react';

// Ganti path ini dengan path gambar detail krim/produk yang lebih kecil
import productInfoImage from "../assets/catalog/t1m/t1m-1.png"; 

const ProductInfoSection = ({ howToUse, ingredients, texture, aroma }) => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Kontainer Utama Dua Kolom */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          
          {/* Kolom Kiri: Gambar Produk */}
          <div className="lg:w-1/2 flex justify-center p-4">
            <img
              src={productInfoImage} 
              alt="Product Information Visual"
              // PERUBAHAN DI SINI: max-w-md diganti menjadi max-w-xs (atau max-w-sm)
              className="w-full max-w-sm h-auto object-contain" 
            />
          </div>
          
          {/* Kolom Kanan: Daftar Informasi Tambahan (Tidak Berubah) */}
          <div className="lg:w-1/2 text-gray-800 space-y-6">
            
            {/* HOW TO USE */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2">HOW TO USE</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">{howToUse}</p>
            </div>

            {/* ACTIVE INGREDIENTS */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2">ACTIVE INGREDIENTS</h3>
              {/* Menggunakan list untuk bahan aktif */}
              <ul className="text-sm leading-relaxed space-y-1">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* TEXTURE */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2">TEXTURE</h3>
              <p className="text-sm leading-relaxed">{texture}</p>
            </div>
            
            {/* AROMA */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2">AROMA</h3>
              <p className="text-sm leading-relaxed">{aroma}</p>
            </div>

          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default ProductInfoSection;