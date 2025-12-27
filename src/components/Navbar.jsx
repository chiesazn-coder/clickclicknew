import { NavLink, Link } from "react-router-dom";
import "../styles/main.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { openCart, totalQty } = useCart();
  const { items } = useWishlist();

  const wishlistCount = Array.isArray(items)
    ? items.length
    : Object.keys(items || {}).length;

  const baseClass = "text-gray-700 transition hover:text-black";
  const activeClass = "text-pink-500 font-medium";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      {/* TOP BAR */}
      <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-4 md:px-6">
        
        {/* Left spacer */}
        <div className="w-10 md:w-16" />

        {/* Logo */}
        <Link
          to="/"
          className="logo text-lg md:text-xl tracking-widest"
        >
          CLICKCLICK
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-black/5 transition"
          >
            <span className="text-base md:text-sm">❤️</span>

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-black/5 transition"
          >
            <span className="text-base md:text-sm">🛒</span>

            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MENU NAV */}
      <nav className="border-t border-gray-200">
        <ul className="mx-auto flex max-w-6xl items-center justify-center gap-6 md:gap-10 px-4 md:px-6 py-3 text-sm">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
            >
              Catalog
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/promo"
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
            >
              Promo
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
            >
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
