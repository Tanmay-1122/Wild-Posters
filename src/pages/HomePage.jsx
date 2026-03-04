import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { useProducts } from '../hooks/useProducts';
import HERO_IMG from '../assets/ImagesOfSite/lily.jpg';

// ✅ Direct local image imports — no dependency on products.js for categories
import animeImg from '../assets/ImagesOfSite/collectionimages/anime.jpg';
import carsImg from '../assets/ImagesOfSite/collectionimages/cars.jpg';
import gamesImg from '../assets/ImagesOfSite/collectionimages/games.jpg';
import aestheticImg from '../assets/ImagesOfSite/collectionimages/aesthetic.jpg';
import musicImg from '../assets/ImagesOfSite/collectionimages/music.jpg';
import sportsImg from '../assets/ImagesOfSite/collectionimages/sports.jpg';
import moviesImg from '../assets/ImagesOfSite/collectionimages/movies.jpg';
import streetImg from '../assets/ImagesOfSite/collectionimages/street.jpg';
import f1Img from '../assets/ImagesOfSite/collectionimages/f1.jpg';
import cricketImg from '../assets/ImagesOfSite/collectionimages/cricket.jpg';
import footballImg from '../assets/ImagesOfSite/collectionimages/football.jpg';
import MCUImg from '../assets/ImagesOfSite/collectionimages/MCU.jpg';
import DCImg from '../assets/ImagesOfSite/collectionimages/DC.jpg';
import GYMImg from '../assets/ImagesOfSite/collectionimages/GYM.jpg';

const CUSTOM_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBFxt8dhqhAAcZajvPK7Pb6piAUA2A5jAc3s_fVMDx0c4W5zM88zsPPiwiIWp9XSK3AMISIBJFBq2AJiEgoMMMHHiPw6iZPsJy8vpgbo5ObDWxCwMnpCcbRZA0FV77jhR8L1w8CUJts0f98IVYbwQiZQsOiBjUb2ilG49-fj7etQzw5xSvjzm4SQpHW7AxtcY4eJnDT6BcHJag_Bm8y54idabw2dU292S4mTXyCrnyXDNBUx5C769fHFgkByCYpkmCPkpXvb7Ebt7hA';

// ✅ Categories defined directly here with real local images
const categories = [
  { title: 'Anime', image: animeImg, subtitle: 'The Classics & New Gen', slug: 'anime' },
  { title: 'Cars', image: carsImg, subtitle: 'Speed & Style', slug: 'cars' },
  { title: 'Games', image: gamesImg, subtitle: 'Level Up Your Walls', slug: 'games' },
  { title: 'Aesthetic', image: aestheticImg, subtitle: 'Minimal & Moody', slug: 'aesthetic' },
  { title: 'Music', image: musicImg, subtitle: 'Legends & Icons', slug: 'music' },
  { title: 'Sports', image: sportsImg, subtitle: 'Champions Only', slug: 'sports' },
  { title: 'Movies', image: moviesImg, subtitle: 'Cinema Classics', slug: 'movies' },
  { title: 'Street', image: streetImg, subtitle: 'Urban Vibes', slug: 'street' },
  { title: 'F1', image: f1Img, subtitle: 'Full Throttle', slug: 'f1' },
  { title: 'Cricket', image: cricketImg, subtitle: 'Play Hard', slug: 'cricket' },
  { title: 'Football', image: footballImg, subtitle: 'The Beautiful Game', slug: 'football' },
  { title: 'MCU', image: MCUImg, subtitle: 'Marvel Universe', slug: 'mcu' },
  { title: 'DC', image: DCImg, subtitle: 'DC Universe', slug: 'dc' },
  { title: 'GYM', image: GYMImg, subtitle: 'Beast Mode On', slug: 'gym' },
];

export default function HomePage() {
  // ── live data from Medusa ──
  const { products, loading } = useProducts();

  useEffect(() => {
    // If you still want the scroll visibility effect
  }, []);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] w-full flex items-end overflow-hidden parallax-bg"
        style={{ background: '#0a0a0a', backgroundImage: `url(${HERO_IMG})`, backgroundPosition: 'center 40%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/10 z-0" />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-0" />
        <div className="noise-overlay" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-20 md:pb-28 max-w-7xl">
          <p
            className="mb-8 font-[family-name:var(--font-body)] font-black text-[11px] tracking-[0.3em] text-[#aaaaaa] uppercase flex items-center gap-4"
            style={{ animation: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '0.2s' }}
          >
            <span className="w-12 h-[1px] bg-[#aaaaaa] block" /> Premium wall posters <span className="text-white">· India</span>
          </p>

          <div className="flex flex-col mb-12">
            <div className="overflow-hidden mb-[-0.05em]">
              <h1
                className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase m-0 origin-bottom"
                style={{
                  fontSize: 'clamp(80px, 16vw, 220px)',
                  background: 'linear-gradient(105deg, #ffffff 30%, #e0e0e0 45%, #ffffff 50%, #e8e8e8 55%, #ffffff 70%)',
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both, shimmer 6s ease-in-out 2s infinite',
                  animationDelay: '0.3s, 2s',
                }}
              >
                YOUR
              </h1>
            </div>

            <div className="overflow-hidden mb-[-0.05em]">
              <h2
                className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase m-0 origin-bottom"
                style={{
                  fontSize: 'clamp(80px, 16vw, 220px)',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)',
                  color: 'transparent',
                  animation: 'textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.45s',
                }}
              >
                WALLS.
              </h2>
            </div>

            <div className="overflow-hidden mb-[-0.05em]">
              <h2
                className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight uppercase m-0 origin-bottom"
                style={{
                  fontSize: 'clamp(80px, 16vw, 220px)',
                  background: 'linear-gradient(105deg, #aa8187 30%, #d4aaaf 45%, #caa5a9 50%, #c09aa0 55%, #aa8187 70%)',
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both, shimmer 6s ease-in-out 3s infinite',
                  animationDelay: '0.6s, 3s',
                }}
              >
                YOUR
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className="font-[family-name:var(--font-display)] leading-[0.8] tracking-tight uppercase m-0 origin-bottom text-stroke hover:text-[#aa8187] hover:[-webkit-text-stroke:2px_#aa8187] transition-all duration-500"
                style={{
                  fontSize: 'clamp(80px, 16vw, 220px)',
                  animation: 'textReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.75s',
                }}
              >
                STORY.
              </h2>
            </div>
          </div>

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
          {categories.slice(0, 6).map((cat, i) => (
            <Link
              key={cat.title}
              to={`/collections/${cat.slug}`}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <h4
                  className="font-[family-name:var(--font-display)] text-white tracking-wide leading-none mb-2"
                  style={{ fontSize: i === 0 ? '3rem' : '1.5rem' }}
                >
                  {cat.title}
                </h4>
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
              to={`/collections/${cat.slug}`}
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
                <h4
                  className="font-[family-name:var(--font-display)] text-white tracking-wide drop-shadow-lg"
                  style={{ fontSize: i === 0 ? '2rem' : '1.4rem' }}
                >
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {loading
              ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : (products || []).slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

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
      <section
        className="py-40 md:py-52 relative overflow-hidden parallax-bg"
        style={{
          backgroundColor: '#050505',
          backgroundImage: `url(${CUSTOM_IMG})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/70 mix-blend-multiply z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-0" />
        <div className="noise-overlay" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="flex-1 text-center md:text-left">
              <span className="text-white font-black uppercase tracking-widest text-sm mb-4 block">
                Custom Orders
              </span>

              <h2 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl text-white leading-[0.9] mb-8">
                Upload.<br />Print.
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
              { icon: 'local_shipping', title: 'Fast Dispatch', sub: 'Within 4-7 days' },
              { icon: 'verified', title: 'Premium Print', sub: '300 GSM Matte Paper' },
              { icon: 'payment', title: 'Secure Payment', sub: 'UPI, Cards & Netbanking' },
              { icon: 'package_2', title: 'Safe Packaging', sub: 'Damage-proof tubes' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0a0a0a]/10 flex items-center justify-center text-[#0a0a0a] mb-2">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <div>
                  <h4 className="font-black uppercase text-base tracking-wider text-[#0a0a0a] mb-1">{title}</h4>
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