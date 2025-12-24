// src/pages/HomePage.jsx

import React from "react";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import BundleSection from "../components/BundleSection";
import VideoShowcaseSection from "../components/VideoShowcaseSection";
import TestimonialGrid from "../components/TestimonialGrid"; // Import komponen baru
import CustomerReviewsSlider from "../components/CustomerReviewsSlider"; // Import komponen BARU

const HomePage = () => {
  return (
    // HAPUS TAG <main className="bg-white">
    <>
      <Hero />
      <ProductsSection /> 
      <VideoShowcaseSection /> 
      <BundleSection />  
      <CustomerReviewsSlider />
      <TestimonialGrid />            
    </>
    // HAPUS TAG PENUTUP </main>
  );
};

export default HomePage;