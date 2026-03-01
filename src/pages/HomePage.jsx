import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { trendingProducts, categories } from '../data/products';
import HERO_IMG from '../assets/ImagesOfSite/lily.jpg';

const CUSTOM_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBFxt8dhqhAAcZajvPK7Pb6piAUA2A5jAc3s_fVMDx0c4W5zM88zsPPiwiIWp9XSK3AMISIBJFBq2AJiEgoMMMHHiPw6iZPsJy8vpgbo5ObDWxCwMnpCcbRZA0FV77jhR8L1w8CUJts0f98IVYbwQiZQsOiBjUb2ilG49-fj7etQzw5xSvjzm4SQpHW7AxtcY4eJnDT6BcHJag_Bm8y54idabw2dU292S4mTXyCrnyXDNBUx5C769fHFgkByCYpkmCPkpXvb7Ebt7hA';

export default function HomePage() {
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setProductsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] w-full flex items-end overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Hero image — black bg blends away, cube floats at full quality */}
        <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none">
          <img
            src={HERO_IMG}
            alt="hero"
            style={{
              height: '100%',
              width: 'auto',
              maxWidth: '70%',
              objectFit: 'contain',
              mixBlendMode: 'lighten',
            }}
          />
        </div>

        {/* ── Hero content (single div — duplicate removed) ── */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-20 md:pb-28 max-w-4xl">
          <p
            className="mb-4 font-[family-name:var(--font-body)] font-black text-[11px] tracking-[0.22em] text-[#888888] uppercase"
            style={{ animation: 'fadeUp 0.6s ease-out both', animationDelay: '0.1s' }}
          >
            Premium wall posters · India
          </p>

          {/* "YOUR" */}
          <h1
            className="font-[family-name:var(--font-display)] text-white leading-[0.85] tracking-tight uppercase mb-0"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.2s',
            }}
          >
            Your
          </h1>

          {/* "WALLS." */}
          <h2
            className="font-[family-name:var(--font-display)] text-white leading-[0.85] tracking-tight uppercase mb-0"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.35s',
            }}
          >
            Walls.
          </h2>

          {/* "YOUR" (rose) */}
          <h2
            className="font-[family-name:var(--font-display)] bg-gradient-to-r from-[#aa8187] via-[#caa5a9] to-[#aa8187] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(170,129,135,0.8)] leading-[0.85] tracking-tight uppercase mb-0"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.5s',
            }}
          >
            Your
          </h2>

          {/* "STORY." (rose) */}
          <h2
            className="font-[family-name:var(--font-display)] bg-gradient-to-r from-[#aa8187] via-[#caa5a9] to-[#aa8187] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(170,129,135,0.8)] leading-[0.85] tracking-tight uppercase mb-10"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.6s',
            }}
          >
            Story.
          </h2>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-3 mb-16"
            style={{ animation: 'fadeUp 0.6s ease-out both', animationDelay: '0.75s' }}
          >
            <Link
              className="inline-flex items-center justify-center h-12 px-8 bg-white text-[#0a0a0a] font-[family-name:var(--font-body)] font-black text-[13px] tracking-[0.1em] uppercase transition-colors hover:bg-gray-100"
              to="/collections"
            >
              Shop Now →
            </Link>
            <Link
              className="inline-flex items-center justify-center h-12 px-8 border-2 border-white text-white font-[family-name:var(--font-body)] font-black text-[13px] tracking-[0.1em] uppercase transition-colors hover:bg-white/10"
              to="/custom"
            >
              Custom Poster
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8"
            style={{ animation: 'fadeUp 0.6s ease-out both', animationDelay: '0.9s' }}
          >
            {[
              { value: '10K+', label: 'Customers' },
              { value: '4.8★', label: 'Rating' },
              { value: '500+', label: 'Designs' },
            ].map(({ value, label }) => (
              <div key={label}>
                <span className="font-[family-name:var(--font-display)] text-white text-[36px] leading-none block">
                  {value}
                </span>
                <span className="font-[family-name:var(--font-body)] font-black text-[11px] text-[#666666] uppercase tracking-[0.1em]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ animation: 'fadeUp 0.6s ease-out both', animationDelay: '1.1s' }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#555',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 48,
              background: 'linear-gradient(to bottom, #555, transparent)',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ─── MARQUEE ─────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-5 border-y border-[#1a1a1a] z-20 relative"
        style={{ background: '#0a0a0a' }}
      >
        <div className="whitespace-nowrap flex gap-8 animate-marquee">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="text-white font-[family-name:var(--font-display)] text-2xl tracking-widest font-bold"
            >
              ANIME · CARS &amp; BIKES · GAMES · AESTHETIC · MUSIC · SPORTS · MOVIES ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── CATEGORIES ──────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <h3 className="font-[family-name:var(--font-display)] text-[var(--font-size-section)] text-[#0a0a0a] tracking-wide">
            Curated Categories
          </h3>
          <Link
            className="hidden md:flex items-center gap-2 font-black text-[12px] uppercase tracking-[0.1em] text-[#0a0a0a] hover:opacity-70 transition-opacity group"
            to="/collections"
          >
            View All{' '}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[600px]">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to="/collections"
              className={`${cat.cols} ${cat.rows} relative group overflow-hidden cursor-pointer shadow-md`}
            >
              <img
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={cat.image}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-white tracking-wide drop-shadow-lg">
                  {cat.title}
                </h4>
                {cat.subtitle && (
                  <>
                    <span className="inline-block h-[3px] w-12 bg-white mb-2 shadow-sm" />
                    <p className="text-gray-200 text-xs md:text-sm font-black uppercase tracking-wider">
                      {cat.subtitle}
                    </p>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── TRENDING ────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 border-t border-gray-100"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-[family-name:var(--font-display)] text-[var(--font-size-section)] text-center text-[#0a0a0a] tracking-wide mb-16">
            Trending Now
          </h3>

          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8 transition-opacity duration-500 ${productsLoading ? 'opacity-60' : 'opacity-100'
              }`}
          >
            {productsLoading
              ? Array(8)
                .fill(0)
                .map((_, i) => <ProductCardSkeleton key={i} />)
              : trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="text-center mt-20">
            <Link
              className="inline-block border-b-2 border-[#0a0a0a] text-[#0a0a0a] font-black uppercase tracking-widest text-sm pb-2 hover:opacity-70 transition-opacity"
              to="/collections"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CUSTOM ──────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <img
          alt="Person holding a poster frame"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          src={CUSTOM_IMG}
          loading="lazy"
        />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="flex-1 text-center md:text-left">
              <span className="text-white font-black uppercase tracking-widest text-sm mb-4 block">
                Custom Orders
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl text-white leading-[0.9] mb-8">
                Upload.<br />Print.<br />Wall.
              </h2>
              <p className="text-[#9a9a9a] text-lg max-w-md mb-10 mx-auto md:mx-0">
                Got a favourite memory or a design of your own? Turn your digital files into premium
                wall art. High quality matte finish guaranteed.
              </p>
              <Link
                className="inline-flex items-center justify-center h-14 px-10 bg-white text-[#0a0a0a] font-black text-lg uppercase tracking-wider transition-all hover:bg-gray-100"
                to="/custom"
              >
                Create Custom Poster
              </Link>
            </div>

            <div className="flex-1 w-full max-w-lg">
              <div className="bg-white/5 backdrop-blur-md p-8 border border-white/10">
                <Link
                  to="/custom"
                  className="border-2 border-dashed border-gray-600 hover:border-white aspect-[4/3] flex flex-col items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer group relative"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                    <span className="material-symbols-outlined text-4xl text-gray-300 group-hover:text-white transition-colors">
                      cloud_upload
                    </span>
                  </div>
                  <span className="font-black uppercase tracking-wide text-sm mb-1 group-hover:text-white transition-colors">
                    Drop your image here
                  </span>
                  <span className="text-xs text-gray-500">or click to browse</span>
                  <div className="absolute bottom-4 text-[10px] text-gray-600 uppercase tracking-widest">
                    High Res JPG / PNG
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ───────────────────────────────────────────── */}
      <section className="py-20 border-b border-gray-200 bg-[#f6f6f6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: 'local_shipping', title: 'Fast Dispatch', sub: 'Within 24 hours' },
              { icon: 'verified', title: 'Premium Print', sub: '300 GSM Matte Paper' },
              { icon: 'payment', title: 'Secure Payment', sub: 'UPI, Cards & Netbanking' },
              { icon: 'package_2', title: 'Safe Packaging', sub: 'Damage-proof tubes' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0a0a0a]/10 flex items-center justify-center text-[#0a0a0a] mb-2">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <div>
                  <h4 className="font-black uppercase text-base tracking-wider text-[#0a0a0a] mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}