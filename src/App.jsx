import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartDrawer from "./components/cart/CartDrawer"; // ✅ tambah
import QuickViewDrawer from "./components/quickview/QuickViewDrawer";
import CheckoutPage from "./pages/CheckoutPage";
import PromoPage from "./pages/PromoPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ScrollToHash from "./components/ScrollToHash";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogComingSoon from "./pages/BlogComingSoon";
import CareersPage from "./pages/CareersPage";
import WishlistPage from "./pages/WishlistPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import WellnessPage from "./pages/WellnessPage";


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <QuickViewDrawer />
      <CartDrawer /> {/* ✅ tambah ini */}
      <ScrollToHash />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogComingSoon />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
