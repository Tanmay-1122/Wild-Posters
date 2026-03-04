import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useShop } from '../context/ShopContext';

export default function Header({ onSearchClick }) {
  const { cartCount, wishlist } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:border-gray-800 transition-all duration-300" style={{ backgroundImage: 'none' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <nav className="hidden md:flex gap-8 items-center flex-1 justify-start">
            <Link className="nav-link text-[12px] text-[#0a0a0a] hover:text-[#0a0a0a]/70 transition-colors" to="/">Shop</Link>
            <Link className="nav-link text-[12px] text-[#0a0a0a] hover:text-[#0a0a0a]/70 transition-colors" to="/collections">Collections</Link>
            <Link className="nav-link text-[12px] text-[#0a0a0a] hover:text-[#0a0a0a]/70 transition-colors" to="/custom">Custom</Link>
            <button className="nav-link text-[12px] text-[#0a0a0a] hover:text-[#0a0a0a]/70 transition-colors uppercase tracking-widest font-bold" onClick={onSearchClick}>Search</button>
          </nav>
          <div className="flex-shrink-0 flex justify-center flex-1">
            <Link className="flex items-center gap-2 group" to="/">
              <img alt="Wild Posters Logo" className="h-14 w-auto object-contain" src={logo} loading="lazy" />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-5 flex-1">
            <button
              className="p-2.5 hover:text-[#0a0a0a]/70 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={onSearchClick}
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <Link
              to="/wishlist"
              className="p-2.5 hover:text-[#0a0a0a]/70 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined">favorite</span>
              {wishlist.length > 0 && <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500"></span>}
            </Link>
            <Link
              to="/cart"
              className="p-2.5 hover:text-[#0a0a0a]/70 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#0a0a0a] text-[10px] font-bold text-white">{cartCount}</span>}
            </Link>
            <button
              className="p-2.5 hover:text-[#0a0a0a]/70 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => console.log('User profile clicked')}
              aria-label="User Profile"
            >
              <span className="material-symbols-outlined">person</span>
            </button>
            <button
              className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Toggle Mobile Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[110] bg-[#050505] transition-all duration-700 md:hidden flex flex-col ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        style={{ clipPath: isMenuOpen ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      >
        <div className="noise-overlay opacity-20" />

        <div className="w-full p-6 flex justify-between items-center z-20">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Wild Posters" className="h-10 w-auto filter invert brightness-0" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-white hover:text-gray-400 rotate-90 hover:rotate-180 transition-all duration-500">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
        </div>

        <nav className="relative z-20 flex-grow w-full flex flex-col justify-center px-8 gap-4">
          {['Shop', 'Collections', 'Custom', 'Bulk'].map((link, index) => (
            <div key={link} className="overflow-hidden">
              <Link
                to={link === 'Shop' ? '/' : `/${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block font-[family-name:var(--font-display)] text-[12vw] leading-none uppercase tracking-wide text-stroke hover:text-white transition-all duration-300 transform"
                style={{
                  animation: isMenuOpen ? `textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both` : 'none',
                }}
              >
                {link}
              </Link>
            </div>
          ))}
          <div className="overflow-hidden mt-4">
            <button
              onClick={() => { setIsMenuOpen(false); onSearchClick(); }}
              className="block font-[family-name:var(--font-display)] text-[12vw] leading-none uppercase tracking-wide text-stroke hover:text-white transition-all duration-300 text-left"
              style={{
                animation: isMenuOpen ? `textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + 4 * 0.1}s both` : 'none',
              }}
            >
              SEARCH
            </button>
          </div>
        </nav>

        <div className="p-8 z-20 flex justify-between items-end border-t border-white/10 mt-auto">
          <div className="flex flex-col gap-4 uppercase text-xs font-bold tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">X</a>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest text-right max-w-[120px]">
            Premium Wall Posters<br /><span className="text-white mt-1 block">India</span>
          </p>
        </div>
      </div>
    </header>
  );
}
