import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl text-[#e0e0e0] mb-4">favorite</span>
        <h1 className="font-[family-name:var(--font-display)] text-5xl text-[#0a0a0a] mb-4 uppercase">STAY INSPIRED</h1>
        <p className="text-[#9a9a9a] mb-8 max-w-sm">Your wishlist is currently empty. Every masterpiece starts with an idea.</p>
        <Link to="/collections" className="bg-[#0a0a0a] text-white px-8 py-4 rounded font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-xl">Explore Collections</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 pb-24 md:pb-16">
      <div className="flex flex-col gap-2 mb-10 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h1 className="text-[var(--color-accent-black)] dark:text-white text-[56px] font-[family-name:var(--font-display)] leading-none uppercase">WISHLIST</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl uppercase tracking-widest bg-white inline-block">
          {wishlist.length} {wishlist.length === 1 ? 'Poster' : 'Posters'} Saved
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
        {wishlist.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10"
            >
              <span className="material-symbols-outlined text-red-500 text-xl font-bold">favorite</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
