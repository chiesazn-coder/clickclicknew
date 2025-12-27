import React from 'react';

// Data Ulasan Dummy
const reviews = [
    { id: 1, user: "Kayla D.", rating: 5, status: "Verified Buyer", text: "Desain metalnya mewah, cahaya soft banget di muka. Cocok buat yang suka look minimalis.", product: "CLICKCLICK M4" },
    { id: 2, user: "Maya K.", rating: 5, status: "Verified Buyer", text: "Bentuknya simpel & magnetnya kuat. Praktis banget dibawa buat ngonten harian.", product: "CLICKCLICK T8D" },
    { id: 3, user: "Fikri M.", rating: 4, status: "Verified Buyer", text: "Baterainya juara! Layarnya gede, sangat membantu buat live durasi lama.", product: "CLICKCLICK T3B" },
    // Tambahkan ulasan keempat untuk memastikan tampilan 3 kolom (satu tersembunyi/di-scroll)
    { id: 4, user: "Sarah L.", rating: 5, status: "Verified Buyer", text: "Kacanya jernih parah. Detail wajah kelihatan tajam tapi tetep natural.", product: "CLICKCLCIK T1M" },
];

// Komponen Rating Bintang
const StarRating = ({ count }) => {
    return (
        <div className="flex text-pink-500 mb-4">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < count ? 'opacity-100' : 'opacity-30'}`}>
                    &#9733; {/* Unicode star */}
                </span>
            ))}
        </div>
    );
};

// Komponen Kartu Ulasan
const ReviewCard = ({ review }) => {
    return (
        // flex-shrink-0 w-full md:w-1/3: Kunci agar elemen bisa di-scroll/geser
        <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm h-full flex flex-col justify-between">
                
                <StarRating count={review.rating} />
                
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <h4 className="font-bold text-gray-900 mr-2">{review.user}</h4>
                        <span className="text-xs text-green-600 font-semibold flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {review.status}
                        </span>
                    </div>
                    <h5 className="font-semibold text-gray-800 text-lg mb-2">{review.text.split('.')[0]}</h5> {/* Judul ulasan */}
                    <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 border-t pt-3">
                    Product: <span className="font-medium">{review.product}</span>
                </p>
            </div>
        </div>
    );
};


const CustomerReviewsSlider = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="mx-auto max-w-6xl px-4">
                
                {/* Header Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Community Speaks</h2>
                    <div className="flex items-center text-pink-500">
                        <StarRating count={5} /> 
                        <span className="ml-2 text-gray-600 font-medium">200 reviews</span>
                    </div>
                </div>

                {/* Slider/Carousel Area */}
                <div className="relative">
                    <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar">
                        {reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    
                    {/* Placeholder Tombol Navigasi */}
                    <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2 pointer-events-none px-4">
                        <button className="p-3 rounded-full bg-white shadow-md pointer-events-auto text-gray-700 opacity-70 hover:opacity-100">
                            &lt;
                        </button>
                        <button className="p-3 rounded-full bg-white shadow-md pointer-events-auto text-gray-700 opacity-70 hover:opacity-100">
                            &gt;
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default CustomerReviewsSlider;