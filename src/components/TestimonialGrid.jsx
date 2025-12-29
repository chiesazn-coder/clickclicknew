// src/components/TestimonialGrid.jsx

import React from 'react';
// ******* SOLUSI: IMPORT SEMUA GAMBAR *******
// PERHATIKAN EKSTENSI DAN HURUF BESAR/KECIL
import testi1 from "../assets/testimonials/testi-1-min.png"; 
import testi2 from "../assets/testimonials/testi-2-min.png"; 
import testi3 from "../assets/testimonials/testi-3-min.png"; // Contoh: .jpg
import testi4 from "../assets/testimonials/testi-4-min.png"; 
import testi5 from "../assets/testimonials/testi-5-min.png"; 
import testi6 from "../assets/testimonials/testi-6-min.png";



// Data Testimoni kini menggunakan variabel yang diimpor
const testimonials = [
    { id: 1, imageSrc: testi1, username: "@its_eelz" },
    { id: 2, imageSrc: testi2, username: "@badboysz" },
    { id: 3, imageSrc: testi3, username: "@beautys" },
    { id: 4, imageSrc: testi4, username: "@brittanyrig" },
    { id: 5, imageSrc: testi5, username: "@thegorgeus" },
    { id: 6, imageSrc: testi6, username: "@1felda" },
];


// ******* Pastikan TestimonialCard Dideklarasikan sebelum digunakan *******
const TestimonialCard = ({ imageSrc, username, onClick }) => {
    return (
        <div 
            className="group relative overflow-hidden aspect-square cursor-pointer"
            onClick={onClick}
        >
            <img 
                src={imageSrc} 
                alt={`Testimonial by ${username}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-semibold">{username}</p>
            </div>
        </div>
    );
}
// ***************************************************************


const TestimonialGrid = () => {
    const handleTestimonialClick = (username) => {
        alert(`Membuka testimoni dari ${username}.`);
    };

    return (
        <section className="py-16 bg-pink-100/50"> 
            <div className="text-center mb-12 px-4">
                <p className="text-sm font-medium text-pink-600 uppercase tracking-widest mb-1">
                    @CLICKCLICK
                </p>
                <h2 className="text-4xl font-extralight text-gray-900">
                    Loved by Thousands
                </h2>
            </div>

            {/* Kontainer Grid Gambar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0">
                {testimonials.map((testi) => (
                    <TestimonialCard 
                        key={testi.id}
                        imageSrc={testi.imageSrc} // Variabel yang diimpor
                        username={testi.username}
                        onClick={() => handleTestimonialClick(testi.username)}
                    />
                ))}
            </div>
        </section>
    );
};

export default TestimonialGrid;