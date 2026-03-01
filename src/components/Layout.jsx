import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import PageTransition from './PageTransition';
import SearchModal from './SearchModal';

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const mainEl = document.querySelector('.main-content');
      if (mainEl) {
        mainEl.style.backgroundPosition = `0px ${scrollY * 0.4}px`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-[#0a0a0a] min-h-screen flex flex-col overflow-x-hidden">
      {/* Announcement bar - explicit solid bg, no dots */}
      <div className="w-full bg-[#0a0a0a] text-white py-2.5 px-4 text-center" style={{ backgroundImage: 'none' }}>
        <p className="text-xs font-black uppercase tracking-[0.1em] font-[family-name:var(--font-body)]">Free shipping on orders above ₹499</p>
      </div>
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <main className="main-content flex-1 pb-[76px] md:pb-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <MobileNav onSearchClick={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
