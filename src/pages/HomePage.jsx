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
        {/* Pure background image — no effects */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="hero"
            className="w-full h-full object-cover"
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
            className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase mb-0"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both, shimmer 6s ease-in-out 2s infinite',
              background: 'linear-gradient(105deg, #ffffff 30%, #e0e0e0 45%, #ffffff 50%, #e8e8e8 55%, #ffffff 70%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animationDelay: '0.2s, 2s',
            }}
          >
            Your
          </h1>

          {/* "WALLS." */}
          <h2
            className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase mb-0"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both, shimmer 6s ease-in-out 2s infinite',
              background: 'linear-gradient(105deg, #ffffff 30%, #e0e0e0 45%, #ffffff 50%, #e8e8e8 55%, #ffffff 70%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animationDelay: '0.35s, 2.4s',
            }}
          >
            Walls.
          </h2>

          {/* "YOUR" (rose shimmer) */}
          <h2
            className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase mb-0"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both, shimmer 6s ease-in-out 2s infinite',
              background: 'linear-gradient(105deg, #aa8187 30%, #d4aaaf 45%, #caa5a9 50%, #c09aa0 55%, #aa8187 70%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animationDelay: '0.5s, 2.8s',
            }}
          >
            Your
          </h2>

          {/* "STORY." (rose shimmer) */}
          <h2
            className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase mb-10"
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both, shimmer 6s ease-in-out 2s infinite',
              background: 'linear-gradient(105deg, #aa8187 30%, #d4aaaf 45%, #caa5a9 50%, #c09aa0 55%, #aa8187 70%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animationDelay: '0.6s, 3.2s',
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

        {/* Section header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="font-[family-name:var(--font-body)] font-black text-[11px] tracking-[0.22em] text-[#999] uppercase mb-2">
              Browse by style
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-[var(--font-size-section)] text-[#0a0a0a] tracking-wide leading-none">
              Curated Categories
            </h3>
          </div>
          <Link
            className="hidden md:inline-flex items-center gap-2 h-10 px-5 border border-[#0a0a0a] text-[#0a0a0a] font-[family-name:var(--font-body)] font-black text-[11px] tracking-[0.12em] uppercase transition-all hover:bg-[#0a0a0a] hover:text-white group"
            to="/collections"
          >
            View All
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Desktop bento — tall hero card left, 2×3 right */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: 'repeat(2, 320px)',
            gap: '10px',
          }}
        >
          {categories.slice(0, 7).map((cat, i) => (
            <Link
              key={cat.title}
              to="/collections"
              className="relative group overflow-hidden cursor-pointer"
              style={{
                gridColumn: i === 0 ? '1' : 'auto',
                gridRow: i === 0 ? 'span 2' : 'span 1',
              }}
            >
              <img
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                src={cat.image}
                loading="lazy"
              />
              {/* Gradient — stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500" />
              {/* Hover tint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <h4
                  className="font-[family-name:var(--font-display)] text-white tracking-wide leading-none mb-2"
                  style={{ fontSize: i === 0 ? '3rem' : '1.5rem' }}
                >
                  {cat.title}
                </h4>
                {/* Animated underline on hover */}
                <div className="h-[2px] bg-white w-0 group-hover:w-8 transition-all duration-500 ease-out mb-2" />
                {i === 0 && cat.subtitle && (
                  <p className="text-gray-300 text-[11px] font-black uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {cat.subtitle}
                  </p>
                )}
                {i !== 0 && (
                  <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    Shop now →
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: 2-col portrait grid */}
        <div className="grid grid-cols-2 gap-2.5 md:hidden">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              to="/collections"
              className="relative group overflow-hidden cursor-pointer"
              style={{ aspectRatio: i === 0 ? '1/1' : '3/4', gridColumn: i === 0 ? 'span 2' : 'span 1' }}
            >
              <img
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={cat.image}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="font-[family-name:var(--font-display)] text-white tracking-wide drop-shadow-lg"
                  style={{ fontSize: i === 0 ? '2rem' : '1.4rem' }}>
                  {cat.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Link
            className="inline-flex items-center gap-2 h-11 px-6 border border-[#0a0a0a] text-[#0a0a0a] font-black text-[11px] uppercase tracking-widest hover:bg-[#0a0a0a] hover:text-white transition-all"
            to="/collections"
          >
            View All Categories
          </Link>
        </div>
      </section>

      {/* ─── TRENDING ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#f8f8f8' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-gray-200">
            <div>
              <p className="font-[family-name:var(--font-body)] font-black text-[11px] tracking-[0.22em] text-[#999] uppercase mb-2">
                Most popular
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[var(--font-size-section)] text-[#0a0a0a] tracking-wide leading-none">
                Trending Now
              </h3>
            </div>
            <Link
              className="hidden md:inline-flex items-center gap-2 h-10 px-5 border border-[#0a0a0a] text-[#0a0a0a] font-[family-name:var(--font-body)] font-black text-[11px] tracking-[0.12em] uppercase transition-all hover:bg-[#0a0a0a] hover:text-white group self-end"
              to="/collections"
            >
              View All
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 transition-opacity duration-500 ${productsLoading ? 'opacity-50' : 'opacity-100'
              }`}
          >
            {productsLoading
              ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {/* Mobile CTA */}
          <div className="flex justify-center mt-12 md:hidden">
            <Link
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#0a0a0a] text-white font-black text-[11px] uppercase tracking-widest hover:bg-[#222] transition-colors"
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