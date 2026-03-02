import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const { showToast } = useToast();

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handlePlaceholderClick = (e) => {
    e.preventDefault();
    showToast('Coming Soon');
  };

  return (
    <footer className="bg-[#0a0a0a] text-white" style={{ backgroundImage: 'none' }}>
      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-8 border-b border-[#1f1f1f] mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-[32px] tracking-[0.1em]">
            WILD POSTERS
          </h2>
          <a href="#" className="flex items-center gap-2 font-[family-name:var(--font-body)] font-bold text-[13px] text-[#9a9a9a] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            Follow us @wildposters
          </a>
        </div>

        {/* 4-column grid - stack on mobile with accordion */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="font-[family-name:var(--font-body)] text-[13px] text-[#9a9a9a] leading-[1.8] max-w-[200px]">
              India&apos;s premium wall poster destination.
            </p>
            <p className="font-[family-name:var(--font-body)] font-bold text-[13px] text-white mt-5">
              Made in India 🇮🇳
            </p>
          </div>

          <div className="md:block">
            <button
              type="button"
              className="md:hidden w-full flex justify-between items-center font-[family-name:var(--font-body)] font-black text-[10px] text-[#444] tracking-[0.16em] uppercase mb-4"
              onClick={() => toggleSection('nav')}
            >
              Navigate
              <span className="transform transition-transform">{openSection === 'nav' ? '−' : '+'}</span>
            </button>
            <h4 className="hidden md:block font-[family-name:var(--font-body)] font-black text-[10px] text-[#444] tracking-[0.16em] uppercase mb-6">Navigate</h4>
            <div className={`${openSection === 'nav' ? 'block' : 'hidden'} md:block`}>
              <nav className="flex flex-col gap-2">
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">All Collections</Link>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/custom">Custom Poster</Link>
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>Bulk Orders</a>
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>Reviews</a>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/wishlist">Wishlist</Link>
              </nav>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="md:hidden w-full flex justify-between items-center font-[family-name:var(--font-body)] font-black text-[10px] text-[#444] tracking-[0.16em] uppercase mb-4"
              onClick={() => toggleSection('collections')}
            >
              Collections
              <span className="transform transition-transform">{openSection === 'collections' ? '−' : '+'}</span>
            </button>
            <h4 className="hidden md:block font-[family-name:var(--font-body)] font-black text-[10px] text-[#444] tracking-[0.16em] uppercase mb-6">Collections</h4>
            <div className={`${openSection === 'collections' ? 'block' : 'hidden'} md:block`}>
              <nav className="flex flex-col gap-2">
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">🎌 Anime</Link>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">🚗 Cars & Bikes</Link>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">🎮 Games</Link>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">✨ Aesthetic</Link>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">⚽ Sports</Link>
                <Link className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" to="/collections">💪 Motivation</Link>
              </nav>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="md:hidden w-full flex justify-between items-center font-[family-name:var(--font-body)] font-black text-[10px] text-[#444] tracking-[0.16em] uppercase mb-4"
              onClick={() => toggleSection('help')}
            >
              Help
              <span className="transform transition-transform">{openSection === 'help' ? '−' : '+'}</span>
            </button>
            <h4 className="hidden md:block font-[family-name:var(--font-body)] font-black text-[10px] text-[#444] tracking-[0.16em] uppercase mb-6">Help</h4>
            <div className={`${openSection === 'help' ? 'block' : 'hidden'} md:block`}>
              <nav className="flex flex-col gap-2">
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>Shipping Policy</a>
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>Return Policy</a>
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>FAQs</a>
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>Track Order</a>
                <a className="font-[family-name:var(--font-body)] font-semibold text-[14px] text-[#9a9a9a] hover:text-white transition-colors" href="#" onClick={handlePlaceholderClick}>Contact Us</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-[#1f1f1f]">
          <p className="font-[family-name:var(--font-body)] text-[12px] text-[#444]">
            © 2026 Wild Posters. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[12px] text-[#444]">
            UPI · Razorpay · Visa · Mastercard · COD
          </p>
        </div>
      </div>
    </footer>
  );
}
