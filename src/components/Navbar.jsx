import { NavLink } from "react-router-dom";
import "../styles/main.css";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { openCart, totalQty } = useCart();

  const baseClass = "text-gray-700 transition hover:text-black";
  const activeClass = "text-pink-500 font-medium";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* Left spacer (biar logo tetap center walau ada cart di kanan) */}
        <div className="w-10" />

        {/* Logo */}
        <div className="logo">CLICKCLICK</div>

        {/* Cart */}
        <button
          type="button"
          onClick={openCart}
          aria-label="Open cart"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-black/5"
        >
          <span className="text-sm">🛒</span>

          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
            {totalQty}
          </span>
        </button>
      </div>

      {/* Menu nav */}
      <nav className="border-t border-gray-200">
        <ul className="mx-auto flex max-w-6xl items-center justify-center gap-10 px-6 py-3 text-sm">
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
