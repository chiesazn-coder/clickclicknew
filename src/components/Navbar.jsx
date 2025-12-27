import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/main.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { openCart, totalQty } = useCart();
  const { items } = useWishlist();
  const [open, setOpen] = useState(false);

  const wishlistCount = Array.isArray(items)
    ? items.length
    : Object.keys(items || {}).length;

  const baseClass = "text-gray-700 transition hover:text-black";
  const activeClass = "text-pink-500 font-semibold";

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      
      {/* TOP BAR */}
      <div className="mx-auto h-16 max-w-6xl px-4 md:px-6">
        {/* 
          Mobile  : flex
          Desktop : grid 3 kolom (logo benar2 center)
        */}
        <div className="flex items-center justify-between h-full md:grid md:grid-cols-3">

          {/* LEFT */}
          <div className="flex items-center">
            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-pink-500"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>

          {/* CENTER LOGO */}
          <div className="flex justify-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="logo text-lg md:text-xl tracking-widest"
            >
              CLICKCLICK
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center justify-end gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-black/5"
            >
              ❤️
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
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-black/5"
            >
              🛒
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <nav className="hidden md:block border-t border-gray-200">
        <ul className="mx-auto flex max-w-6xl items-center justify-center gap-10 px-6 py-3 text-sm">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : baseClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={({ isActive }) => isActive ? activeClass : baseClass}>
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/promo" className={({ isActive }) => isActive ? activeClass : baseClass}>
              Promo
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => isActive ? activeClass : baseClass}>
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={closeMenu}>
          <div
            className="absolute top-0 left-0 w-full bg-white rounded-b-2xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="text-sm font-semibold tracking-widest">MENU</span>
              <button onClick={closeMenu} className="text-xl">✕</button>
            </div>

            <ul className="flex flex-col px-6 py-6 space-y-4 text-base">
              <li><NavLink to="/" onClick={closeMenu} className={baseClass}>Home</NavLink></li>
              <li><NavLink to="/catalog" onClick={closeMenu} className={baseClass}>Catalog</NavLink></li>
              <li><NavLink to="/promo" onClick={closeMenu} className={baseClass}>Promo</NavLink></li>
              <li><NavLink to="/blog" onClick={closeMenu} className={baseClass}>Blog</NavLink></li>
            </ul>

            <div className="px-6 pb-6">
              <Link
                to="/catalog"
                onClick={closeMenu}
                className="block w-full rounded-lg bg-black py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Explore products
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
