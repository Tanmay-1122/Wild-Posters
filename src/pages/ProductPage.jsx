import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';
import { useProductBySlug, useProducts } from '../hooks/useProducts';

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useShop();
  const { showToast } = useToast();

  const { product, loading } = useProductBySlug(slug);
  const { products: allProducts } = useProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('A4');
  const [paper, setPaper] = useState('Matte (300gsm)');

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, size, paper);
    showToast('Added to bag');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-gray-300 font-[family-name:var(--font-display)] text-4xl">WILD POSTERS</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-4xl font-[family-name:var(--font-display)] mb-4">Product Not Found</h1>
      <Link to="/collections" className="text-black underline font-bold uppercase tracking-widest">Back to Gallery</Link>
    </div>
  );

  const images = [product.primaryImage, product.roomImage].filter(Boolean);
  const relatedProducts = (allProducts || [])
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-white text-[#161513] min-h-screen flex flex-col pb-20 md:pb-0">
      <main className="flex-grow w-full max-w-7xl mx-auto px-0 md:px-8 lg:px-12 py-0 md:py-12">
        <nav className="hidden md:flex items-center gap-2 text-xs font-medium text-[#80786b] mb-8 uppercase tracking-wide px-4 md:px-0 pt-4 md:pt-0">
          <Link className="hover:text-[#0a0a0a] transition-colors" to="/">Home</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <Link className="hover:text-[#0a0a0a] transition-colors" to="/collections">{product.category || 'Collection'}</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-[#161513]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col gap-4 relative md:px-0">
            {/* Main Image Container */}
            <div className="aspect-[4/5] w-full bg-[#f8f7f6] md:rounded-lg overflow-hidden relative group">
              <img
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={images[selectedImage]}
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Grid - Visible on all screens, scrolls horizontally on small ones if many */}
            <div className="grid grid-cols-4 gap-4 px-4 md:px-0 mb-4 md:mb-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i
                      ? 'border-[#161513] ring-1 ring-[#161513] opacity-100'
                      : 'border-transparent hover:border-[#80786b] opacity-60 hover:opacity-100'
                    }`}
                >
                  <img alt="" className="w-full h-full object-cover" src={img} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col px-4 md:px-0 pt-6 md:pt-0">
            <div className="border-b border-[#f8f7f6] pb-6 mb-6">
              <span className="text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{product.category}</span>
              <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-display)] text-[#161513] mb-4 leading-none tracking-wide">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-2xl font-black text-[#0a0a0a]">₹{product.price}</span>
                  <span className="text-lg text-[#80786b] line-through font-normal">₹{product.originalPrice}</span>
                </div>
                <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded">{product.discount}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4].map((i) => <span key={i} className="material-symbols-outlined text-[#0a0a0a] text-sm">star</span>)}
                <span className="material-symbols-outlined text-[#0a0a0a] text-sm">star_half</span>
                <span className="text-xs text-[#80786b] ml-2 font-medium">{product.rating} ({product.reviews} Reviews)</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-[#161513]">Size</label>
                  <button className="text-xs text-[#80786b] underline decoration-dotted hover:text-[#0a0a0a]">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['A4', 'A3', 'A2', '12x18"'].map((s) => (
                    <button key={s} onClick={() => setSize(s)} className={`h-[44px] min-w-[44px] px-4 border rounded text-sm font-bold flex items-center justify-center transition-colors ${size === s ? 'border-[#161513] bg-[#161513] text-white' : 'border-[#f8f7f6] bg-white text-[#161513] hover:border-[#80786b]'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-[#161513] mb-3 block">Paper Type</label>
                <div className="flex flex-wrap gap-3">
                  {['Matte (300gsm)', 'Glossy', 'Premium Texture'].map((p) => (
                    <button key={p} onClick={() => setPaper(p)} className={`h-[44px] px-4 border rounded text-sm font-medium flex items-center justify-center transition-colors relative ${paper === p ? 'border-[#161513] bg-[#161513] text-white' : 'border-[#f8f7f6] bg-white text-[#161513] hover:border-[#80786b]'}`}>
                      {p}
                      {p === 'Premium Texture' && <span className="absolute -top-2 -right-2 bg-[#0a0a0a] text-[9px] text-white px-1.5 py-0.5 rounded-full">New</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#161513] text-white h-14 rounded font-bold text-lg uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button className="w-full bg-white border border-[#161513] text-[#161513] h-12 rounded font-bold text-sm uppercase tracking-wide hover:bg-[#f8f7f6] transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">view_in_ar</span> Try in your room
              </button>
            </div>

            <div className="bg-[#f8f7f6] p-4 rounded-lg mb-8">
              <label className="text-xs font-bold uppercase text-[#80786b] mb-2 block">Check Delivery Date</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#80786b] text-lg">location_on</span>
                  <input className="w-full h-10 pl-10 pr-4 bg-white border border-transparent rounded text-sm focus:border-[#161513] focus:ring-0" placeholder="Enter Pincode" type="text" />
                </div>
                <button className="text-xs font-bold uppercase text-[#0a0a0a] px-4 hover:text-[#161513] transition-colors">Check</button>
              </div>
              <p className="text-[10px] text-[#80786b] mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-green-600">verified</span>
                Free Delivery on orders above ₹499
              </p>
            </div>

            <div className="divide-y divide-[#f8f7f6] border-t border-b border-[#f8f7f6]">
              <details className="group py-5 cursor-pointer" open>
                <summary className="flex items-center justify-between font-bold text-sm uppercase tracking-wide list-none select-none">
                  Description <span className="material-symbols-outlined text-[#80786b] transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 pb-2 text-sm text-[#80786b] leading-relaxed">{product.description}</div>
              </details>
            </div>
          </div>
        </div>

        <div className="mt-20 px-4 md:px-0">
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] tracking-wide mb-8">You May Also Like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[#f8f7f6] mb-4 relative">
                  <img alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={p.primaryImage || p.image} />
                  {p.badge && <div className="absolute top-3 left-3 bg-[#0a0a0a] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">{p.badge}</div>}
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-1 group-hover:text-[#0a0a0a] transition-colors">{p.title}</h4>
                <p className="text-xs text-[#80786b]">{p.category}</p>
                <p className="font-bold text-sm mt-2">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f8f7f6] p-3 z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex items-center gap-3">
        <div className="flex-grow">
          <div className="text-[10px] font-bold text-[#80786b] uppercase tracking-wider mb-0.5">{product.title}</div>
          <div className="text-lg font-bold text-[#0a0a0a]">₹{product.price}</div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-[#161513] text-white h-11 px-6 rounded font-bold text-sm uppercase tracking-wide shadow-md flex items-center gap-2"
        >
          Add <span className="material-symbols-outlined text-sm">shopping_cart</span>
        </button>
      </div>
    </div>
  );
}
