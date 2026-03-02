import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { trendingProducts } from '../data/products';
import './CollectionsPage.css'; // ← make sure to create this CSS file too

// ✅ All unique import names
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
  { title: 'Anime', image: animeImg, slug: 'anime', cols: 'col-span-2 row-span-2' },
  { title: 'Cars', image: carsImg, slug: 'cars', cols: 'col-span-1' },
  { title: 'Music', image: musicImg, slug: 'music', cols: 'col-span-1' },
  { title: 'Games', image: gamesImg, slug: 'games', cols: 'col-span-1' },
  { title: 'Aesthetic', image: aestheticImg, slug: 'aesthetic', cols: 'col-span-1' },
  { title: 'Basketball', image: sportsImg, slug: 'Basketball', cols: 'col-span-1' },
  { title: 'Movies', image: moviesImg, slug: 'movies', cols: 'col-span-1' },
  { title: 'Street', image: streetImg, slug: 'street', cols: 'col-span-1' },
  { title: 'F1', image: f1Img, slug: 'F1', cols: 'col-span-1' },
  { title: 'Cricket', image: cricketImg, slug: 'cricket', cols: 'col-span-1' },
  { title: 'Football', image: footballImg, slug: 'football', cols: 'col-span-1' },
  { title: 'MCU', image: MCUImg, slug: 'MCU', cols: 'col-span-1' },
  { title: 'DC', image: DCImg, slug: 'DC', cols: 'col-span-1' },
  { title: 'GYM', image: GYMImg, slug: 'GYM', cols: 'col-span-1' },
];

export default function CollectionsPage() {
  const [productsLoading, setProductsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProductsLoading(false), 500);
    // Trigger staggered entrance after mount
    const v = setTimeout(() => setVisible(true), 50);
    return () => { clearTimeout(t); clearTimeout(v); };
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">

      {/* Header */}
      <div className="flex flex-col gap-2 mb-10 border-b border-gray-200 dark:border-gray-800 pb-8">
        <h1 className="text-[var(--color-accent-black)] dark:text-white text-[56px] font-[family-name:var(--font-display)] leading-none">
          COLLECTIONS
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
          Browse 500+ designs across 8 curated categories. From modern anime aesthetics to vintage automotive classics.
        </p>
      </div>

      {/* Collection Grid */}
      {/*
        "collections-grid" class enables the CSS :has() hover trick:
        when ANY card is hovered, all OTHER cards shrink.
      */}
      <div className="collections-grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px] mb-20">
        {collections.map((c, i) => (
          <Link
            key={c.title}
            to={`/collections/${c.slug}`}
            className={`
              ${c.cols}
              collection-card
              group relative overflow-hidden rounded-lg
              ${visible ? 'card-visible' : 'card-hidden'}
            `}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url("${c.image}")` }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-white text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                {c.title}
              </h3>
              {/* "Shop Now" slides up on hover */}
              <span className="mt-3 text-white/90 text-xs font-bold tracking-widest uppercase border border-white/50 px-4 py-1.5 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                SHOP NOW →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}