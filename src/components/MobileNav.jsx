import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileNav({ onSearchClick }) {
  const location = useLocation();
  const { cartCount } = useShop();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[1.5px] border-[#0a0a0a] h-[60px] pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-full">
        <Link
          to="/"
          className={`bottom-nav-tab flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 ${isActive('/') ? 'bottom-nav-tab--active' : 'bottom-nav-tab--inactive'
            }`}
          style={{ minHeight: 44 }}
        >
          <Home
            size={20}
            strokeWidth={isActive('/') ? 2.5 : 1.5}
            className="tab-icon"
          />
          <span className="tab-label">Home</span>
        </Link>
        <Link
          to="/collections"
          className={`bottom-nav-tab flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 ${isActive('/collections') ? 'bottom-nav-tab--active' : 'bottom-nav-tab--inactive'
            }`}
          style={{ minHeight: 44 }}
        >
          <LayoutGrid
            size={20}
            strokeWidth={isActive('/collections') ? 2.5 : 1.5}
            className="tab-icon"
          />
          <span className="tab-label">Shop</span>
        </Link>
        <button
          type="button"
          className="bottom-nav-tab bottom-nav-tab--inactive flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 min-h-[44px]"
          onClick={onSearchClick}
          aria-label="Search"
        >
          <Search size={20} strokeWidth={1.5} className="tab-icon" />
          <span className="tab-label">Search</span>
        </button>
        <Link
          to="/wishlist"
          className={`bottom-nav-tab flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 ${isActive('/wishlist') ? 'bottom-nav-tab--active' : 'bottom-nav-tab--inactive'
            }`}
          style={{ minHeight: 44 }}
        >
          <Heart
            size={20}
            strokeWidth={isActive('/wishlist') ? 2.5 : 1.5}
            className="tab-icon"
          />
          <span className="tab-label">Wishlist</span>
        </Link>
        <Link
          to="/cart"
          className={`bottom-nav-tab flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 relative ${isActive('/cart') ? 'bottom-nav-tab--active' : 'bottom-nav-tab--inactive'
            }`}
          style={{ minHeight: 44 }}
        >
          <ShoppingBag
            size={20}
            strokeWidth={isActive('/cart') ? 2.5 : 1.5}
            className="tab-icon"
          />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1/4 flex h-4 w-4 items-center justify-center rounded-full bg-[#0a0a0a] text-[9px] font-bold text-white">
              {cartCount}
            </span>
          )}
          <span className="tab-label">Cart</span>
        </Link>
      </div>
    </nav>
  );
}
