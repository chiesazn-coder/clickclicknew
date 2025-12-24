import React, { useEffect, useState } from "react";

const ProductCarouselSection = ({
  productImages = [],
  howToUse = [],
  ingredients = [],
  texture,
  aroma,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // reset index kalau ganti produk & jumlah gambar berubah
  useEffect(() => {
    setCurrentIndex(0);
  }, [productImages?.length]);

  const hasImages = Array.isArray(productImages) && productImages.length > 0;

  const goToNext = () => {
    if (!hasImages) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    if (!hasImages) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* Kiri: Carousel */}
          <div className="lg:w-1/2 flex justify-center p-4 relative">
            {hasImages ? (
              <>
                <div className="w-full max-w-sm overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {productImages.map((imgSrc, index) => (
                      <div key={index} className="flex-shrink-0 w-full">
                        <img
                          src={imgSrc}
                          alt={`Product Visual ${index + 1}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nav */}
                <button
                  onClick={goToPrev}
                  className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 hidden lg:block"
                >
                  &lt;
                </button>
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-20 hidden lg:block"
                >
                  &gt;
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 flex space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentIndex === index ? "bg-black" : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                No images available.
              </div>
            )}
          </div>

          {/* Kanan: Info */}
          <div className="lg:w-1/2 text-gray-800 space-y-6">

            {/* HOW TO USE */}
            {Array.isArray(howToUse) && howToUse.length > 0 && (
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4">
                  HOW TO USE
                </h3>

                <div className="space-y-4">
                  {howToUse.map((step, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-semibold text-gray-900">
                        {step.title}
                      </p>

                      {Array.isArray(step.description) ? (
                        step.description.map((desc, i) => (
                          <p key={i} className="text-sm text-gray-600 leading-relaxed">
                            {desc}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVE INGREDIENTS */}
            {Array.isArray(ingredients) && ingredients.length > 0 && (
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase mb-2">
                  ACTIVE INGREDIENTS
                </h3>
                <ul className="text-sm leading-relaxed space-y-1">
                  {ingredients.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TEXTURE */}
            {texture && (
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase mb-2">
                  TEXTURE
                </h3>
                <p className="text-sm leading-relaxed">{texture}</p>
              </div>
            )}

            {/* AROMA */}
            {aroma && (
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase mb-2">
                  AROMA
                </h3>
                <p className="text-sm leading-relaxed">{aroma}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarouselSection;
