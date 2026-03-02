import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { trendingProducts } from '../data/products';
import './CollectionsPage.css';

import animeImg from '../assets/ImagesOfSite/collectionimages/anime.jpg';
import carsImg from '../assets/ImagesOfSite/collectionimages/cars.jpg';
import musicImg from '../assets/ImagesOfSite/collectionimages/music.jpg';
import gamesImg from '../assets/ImagesOfSite/collectionimages/games.jpg';
import aestheticImg from '../assets/ImagesOfSite/collectionimages/aesthetic.jpg';
import sportsImg from '../assets/ImagesOfSite/collectionimages/sports.jpg';
import moviesImg from '../assets/ImagesOfSite/collectionimages/movies.jpg';
import streetImg from '../assets/ImagesOfSite/collectionimages/street.jpg';
import f1Img from '../assets/ImagesOfSite/collectionimages/f1.jpg';
import cricketImg from '../assets/ImagesOfSite/collectionimages/cricket.jpg';
import footballImg from '../assets/ImagesOfSite/collectionimages/football.jpg';
import MCUImg from '../assets/ImagesOfSite/collectionimages/MCU.jpg';
import DCImg from '../assets/ImagesOfSite/collectionimages/DC.jpg';
import GYMImg from '../assets/ImagesOfSite/collectionimages/GYM.jpg';

const collections = [
  { title: 'Anime', image: animeImg, slug: 'anime' },
  { title: 'Cars', image: carsImg, slug: 'cars' },
  { title: 'Music', image: musicImg, slug: 'music' },
  { title: 'Games', image: gamesImg, slug: 'games' },
  { title: 'Aesthetic', image: aestheticImg, slug: 'aesthetic' },
  { title: 'Basketball', image: sportsImg, slug: 'Basketball' },
  { title: 'Movies', image: moviesImg, slug: 'movies' },
  { title: 'Street', image: streetImg, slug: 'street' },
  { title: 'F1', image: f1Img, slug: 'F1' },
  { title: 'Cricket', image: cricketImg, slug: 'cricket' },
  { title: 'Football', image: footballImg, slug: 'football' },
  { title: 'MCU', image: MCUImg, slug: 'MCU' },
  { title: 'DC', image: DCImg, slug: 'DC' },
  { title: 'GYM', image: GYMImg, slug: 'GYM' },
];

const masonryStyles = `
  .masonry-grid {
    columns: 4;
    column-gap: 1rem;
  }
  @media (max-width: 1023px) {
    .masonry-grid { columns: 3; }
  }
  @media (max-width: 640px) {
    .masonry-grid { columns: 2; }
  }

  .masonry-card {
    break-inside: avoid;
    display: block;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
  }
  .masonry-card.card-visible {
    animation: masonryIn 0.5s ease forwards;
  }
  @keyframes masonryIn {
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function CollectionsPage() {
  const [productsLoading, setProductsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProductsLoading(false), 500);
    const v = setTimeout(() => setVisible(true), 50);
    return () => { clearTimeout(t); clearTimeout(v); };
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
      <style>{masonryStyles}</style>

      {/* Header */}
      <div className="flex flex-col gap-2 mb-10 border-b border-gray-200 dark:border-gray-800 pb-8">
        <h1 className="text-[var(--color-accent-black)] dark:text-white text-[56px] font-[family-name:var(--font-display)] leading-none">
          COLLECTIONS
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
          Browse 500+ designs across 8 curated categories. From modern anime aesthetics to vintage automotive classics.
        </p>
      </div>

      {/* Masonry Collection Grid — images render at their natural aspect ratio, zero cropping */}
      <div className="masonry-grid mb-20">
        {collections.map((c, i) => (
          <Link
            key={c.title}
            to={`/collections/${c.slug}`}
            className={`masonry-card collection-card group relative overflow-hidden rounded-lg ${visible ? 'card-visible' : ''}`}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {/* Image at 100% width, auto height — fully preserves aspect ratio */}
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

            {/* Title + Shop Now CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
              <h3 className="text-white text-2xl md:text-4xl font-[family-name:var(--font-display)] tracking-wide drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                {c.title}
              </h3>
              <span className="mt-2 text-white/90 text-[10px] font-bold tracking-widest uppercase border border-white/50 px-3 py-1 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                SHOP NOW →
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}