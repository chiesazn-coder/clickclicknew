import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white text-black pt-16 pb-6">
            <div className="mx-auto max-w-6xl px-6">
                
                {/* Bagian Atas Footer: Form Subscription & Tautan Utama */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-12">
                    
                    {/* Kolom 1: Email Subscription */}
                    <div className="col-span-2 md:col-span-2 pr-8">
                        <h3 className="text-xl font-bold mb-4">
                            Enjoy CLICKCLICK exclusive offers
                        </h3>
                        <p className="text-sm text-black mb-4">
                            Stay up-to-date with our latest news, updates and promotions
                        </p>
                        <form className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-grow p-3 bg-white text-black border border-gray-700 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500 rounded-lg text-sm"
                            />
                            <button
                                type="submit"
                                className="px-5 py-3 bg-white text-black border border-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-200 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Kolom 2: Explore */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Explore</h4>
                        <ul className="space-y-2 text-sm text-black">
                            <li>
                                <a href="#all-products" className="hover:text-pink-500 transition">
                                    Discover
                                </a>
                            </li>
                            <li>
                                <Link to="/catalog" className="hover:text-pink-500 transition">
                                    Catalog
                                </Link>
                            </li>
                            <li><a href="#" className="hover:text-pink-500 transition">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-pink-500 transition">Best Sellers</a></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Marketplace/Company */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Company</h4>
                        <ul className="space-y-2 text-sm text-black">
                            <Link to="/about" className="hover:text-pink-500 transition">About Us</Link>
                            <li>
                                <Link to="/contact" className="hover:text-pink-500 transition">
                                    Contact
                                </Link>
                            </li>
                            <Link to="/blog" className="hover:text-pink-500 transition">Blog</Link>
                            <li>
                                <Link to="/careers" className="hover:text-pink-500 transition">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 4: Connect with us */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Connect with us</h4>
                        <ul className="space-y-2 text-sm text-black">
                            <li><a href="https://www.instagram.com/clickclickofficial.id/" className="hover:text-pink-500 transition">Instagram</a></li>
                            <li><a href="https://www.tiktok.com/@clickclickmall?_r=1&_t=ZS-92Txsmk9ROj" className="hover:text-pink-500 transition">Tiktok</a></li>
                            <li><a href="https://shopee.co.id/shop/1556220986" className="hover:text-pink-500 transition">Shopee</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bagian Bawah Footer: Logo & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8">
                    {/* Placeholder Logo atau Nama Brand */}
                    <div className="mb-4 md:mb-0">
                        <span className="text-2xl font-extrabold tracking-widest">CLICKCLICK</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-6 text-xs text-gray-500">
                        <p className="mb-2 md:mb-0">
                            Copyright © {new Date().getFullYear()}. CLICKCLICK All Rights Reserved.
                        </p>
                        <Link to="/terms" className="hover:text-pink-500 transition">
                            Terms of Use
                        </Link>
                        <Link to="/privacy-policy" className="hover:text-pink-500 transition">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;