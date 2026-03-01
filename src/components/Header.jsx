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

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[120] transition-transform duration-500 md:hidden shadow-2xl flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Wild Posters" className="h-10 w-auto" />
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <nav className="flex-grow p-8 flex flex-col gap-8">
          {['Shop', 'Collections', 'Custom', 'Bulk'].map((link) => (
            <Link
              key={link}
              to={link === 'Shop' ? '/' : `/${link.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="font-[family-name:var(--font-display)] text-5xl uppercase tracking-tighter hover:text-gray-500 transition-colors"
            >
              {link}
            </Link>
          ))}
          <button
            onClick={() => { setIsMenuOpen(false); onSearchClick(); }}
            className="font-[family-name:var(--font-display)] text-5xl uppercase tracking-tighter text-left hover:text-gray-500 transition-colors"
          >
            Search
          </button>
        </nav>

        <div className="p-10 border-t border-gray-100 mt-auto bg-gray-50">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Connect with us</p>
          <div className="flex gap-6 mb-8 uppercase text-xs font-bold tracking-widest">
            <a href="#" className="hover:text-gray-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-gray-500 transition-colors">X</a>
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Premium Wall Posters · India</p>
        </div>
      </aside>
    </header>
  );
}
