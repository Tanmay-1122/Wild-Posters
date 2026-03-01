import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';

const productData = {
  'gojo-satoru': {
    id: 1,
    title: 'GOJO SATORU',
    category: 'Anime · 3 Piece Split Set',
    price: 349,
    originalPrice: 699,
    discount: '-50% OFF',
    rating: 4.8,
    reviews: 124,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmPbn94wbLDu7KStclkrQBep2hLV95eMNnXMYzgiRw2x7emn9ZxYj-ckE9k7CCezURkGBdjVTKgTYMWuins_Rz-7ghB_l_F1fyhDGaubmlrZ__nuYzu5Fm3jmt8TtdNJqjJmBBkoNakG166CBfaYe5ApHv7cAyYq5jxj1Tj7cB_ZHtaRO2z3fmWgdLcL3gHuu6Cd4iESBVxzLX4qX_u_RDjcJX38KpcwlYkAUouQSqejL6gwxIXKuD0guGolT9Gp6EqR4q37miveW0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBw8Ha-EankmBf9aA_pVwJ1eT8x6CBgo7WojoGna6A6UMoGkzjrCXbJxqKmV8NKrH2fVaksEIquGaKtJuBSaq7GsdeT1T5Fp7EicpFQqc-4U7wAjqy_OwdIrme_tMdLMq60T9_Eq-hMbtGrgahQ2MLvVUC9d2RJYnCHU6anrIv1eylQW7xqa0FjXHqdHjNF0zDl6SGYg_CF8V86FA76u9eeI498_gJ_Uuvk7isTCc8GOcB0fzZuf6tUytqXRtMztdczgS7u9W-hzlIp',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlNfNpPKLcA_sBMNL2yHKK_7VUZrBhvgJ56ffdIpOGz10vb2qzS7Pi2LS_gKl_sDA5Df0hrNaBL5UaagLBdDP-3M7mx4vKK9DQXA246r_ftNaAedntXOHCBjrh_kMd-ZqhzeOPelI_EvLUI2eIB30nwYT7AYNJGkyBdPaHPqRCznmqdLdTOgWGylvN5yhBV8DXaPX4h1aBMcXNyDDGjwbCcI7ubwFf2p7zRUVgt590Zq3-gp2GKFQYI6GYu77UvP5tLk_57T95ery',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZqHizWpVeiNV9vBajnc4w2tYuMfQWUazE5uIpQ1KCzgJMqiTe3d07RNZqXH0zrbeiKcVFgzvQWhbcRGK2ZjO1kusSECXwuK4Hnxv2Trche19-RJMooJHZZVaL3zJjejHcZ_6YejXS_3277Pq5Zb7jpEkKLrr6z3hFeUrE1v7Owm_kbns4Z4DmVz_yl65a4bmMIrbEEcQML1rOmRywEtyWDONF4zw-DYb133oyzY2lw3-FXQB2f78VBuCbFLTEOGcOpquZTe-R_qfy',
    ],
    description: 'Bring the infinite void to your space with this premium Gojo Satoru artwork. Features high-definition printing that captures every detail of the Jujutsu Kaisen sorcerer. Perfect for minimalist and modern setups.',
    badge: 'Best Seller',
  },
};

const relatedProducts = [
  { slug: '911-gt3-rs', title: '911 GT3 RS', category: 'Cars · Matte Finish', price: 399, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooTBK6fl1s_JrIDyoj5DlMsniuWQRxvXrbvFOGpPv8OAenW7JY8-zsJy05pRDEULwlkQOTFJCNZ5IkmhA3h1NbpABboajwIpzPvqVxhMDSMWjvacb-YWkncUPg_KQ2fXIm3fII_PSGV-TF6vOTdfQxGO1_8O2lDcTkfai64o9yFydJeX7aQjFIZtTL0PI18ooJ0Lk8YLBF5TItaIg-uIfb0R0FeabLl02V2PllJrnlepFuy11lmjD-5oVPZ0nT9QV4g3UOLX_OHBE' },
  { slug: 'night-city-vibe', title: 'Night City Vibe', category: 'Aesthetic · Glossy', price: 349, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc9xTTYVXdUMh6_YJHoZ-h4-CpQeN9ciP5KKUfoXokEjjH04U4dwojT6n_YTYIWjr7CCNOyzOlD4FTJ-MGXoc8xYITwQ23qFLxlMgLn7etJKR2kQ1Irc0q6bOGQH4jt9THSirCHQEmX92z3-RS52CyWammllrYwOectguV_OQgLYxPWwSOD0brpOXAHhUQg1V1QCIVShwMjuZyILoXpmdoeIkXnwdVqYmNv4ApKCZtMbDIxKg532J1QRzJm1X8ff08TJCKAt1nWlvl' },
  { slug: 'air-jordan-flight', title: 'Air Jordan Flight', category: 'Sports · A3', price: 449, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0KRuFuJeKXpnZ_v3x6xdBXW3bqPTo0G4Aj-6k9hhJJMyQonHkIn5PihGecaV_P9sohpvb2ju9jHNHqkYhveXkSqy6cNTS5K10kZVhlrlV0as7PwfBFUTCWYMkEeICX9jq3F0zG7NjJQZSmpjBtExe7SQvaGYw8p4MfVaeJ5DOVRQ5MJMGehsKPFTZhMy8XwNEEKP_sRF_Eq0gr9R27sdMDTEfWjRAl9qOZg42LyZzGDW7LMRK6Cya8SPXMNuifCZEV3rxyMNf8Wj' },
  { slug: 'abstract-forms', title: 'Abstract Forms', category: 'Abstract · Matte', price: 299, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvivg2ic8wYbdwJZqcCqSF2tUSdWY6HNX6SZPxqWQhlyUacFpIK8NH3qel5zRJf713ryzLICCUyx-G0dNRrXh206r_J24VAdUv5fhiAZq1OZqCkzWyIXBVtE_6ZSTo7XypNDYrScqge6oSFr_dpQgY-kna0rVmMfPkYm6r0rw_TXbWvdjoDJIbzwszSXcEdUyYLBs_Aps0lzDoGilw_1avraGfF_2cyzYNlVi9D1PF7tG5VikXAt3AndOKXybBkdrtR12plUnUTrdj', badge: 'New' },
];

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useShop();
  const { showToast } = useToast();
  const product = productData[slug] || productData['gojo-satoru'];
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('A4');
  const [paper, setPaper] = useState('Matte (300gsm)');

  const handleAddToCart = () => {
    addToCart(product, size, paper);
    showToast('Added to bag');
  };

  return (
    <div className="bg-white text-[#161513] min-h-screen flex flex-col pb-20 md:pb-0">
      <main className="flex-grow w-full max-w-7xl mx-auto px-0 md:px-8 lg:px-12 py-0 md:py-12">
        <nav className="hidden md:flex items-center gap-2 text-xs font-medium text-[#80786b] mb-8 uppercase tracking-wide px-4 md:px-0 pt-4 md:pt-0">
          <Link className="hover:text-[#0a0a0a] transition-colors" to="/">Home</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <Link className="hover:text-[#0a0a0a] transition-colors" to="/collections">Anime Collection</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-[#161513]">Gojo Satoru</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col gap-4 relative px-4 md:px-0">
            <div className="hidden md:block aspect-[4/5] w-full bg-[#f8f7f6] rounded-lg overflow-hidden relative group">
              <img alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.images[selectedImage]} />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">{product.badge}</div>
              )}
            </div>
            <div className="hidden md:grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-[#161513] ring-1 ring-[#161513] opacity-100' : 'border-transparent hover:border-[#80786b] opacity-60 hover:opacity-100'}`}>
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
              <Link key={p.slug} to={`/product/${p.slug}`} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[#f8f7f6] mb-4 relative">
                  <img alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={p.image} />
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
          <div className="text-[10px] font-bold text-[#80786b] uppercase tracking-wider mb-0.5">Gojo Satoru</div>
          <div className="text-lg font-bold text-[#0a0a0a]">₹349</div>
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
