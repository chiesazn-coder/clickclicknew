import React from "react";

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(number || 0));

const ProductCard = ({ imageSrc, name, size, price, onClick }) => {
  return (
    <div
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white"
      onClick={onClick}
    >
      <div className="flex justify-center items-center bg-gray-50 mb-4 h-64">
        <img
          src={imageSrc}
          alt={name}
          className="max-h-full object-contain p-4"
        />
      </div>

      <h4 className="text-base font-medium text-gray-800 mb-1 leading-tight">
        {name}
      </h4>

      {size && <p className="text-sm text-gray-500 mb-2">{size}</p>}

      <p className="text-base font-semibold text-gray-900">
        {formatRupiah(price)}
      </p>
    </div>
  );
};

const RelatedProductsGrid = ({ products, onProductClick }) => {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-light text-gray-900 mb-10">See also</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imageSrc}
              name={product.name}
              price={product.rawPrice}
              onClick={() => onProductClick(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProductsGrid;
