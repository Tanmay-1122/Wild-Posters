import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl text-[#e0e0e0] mb-4">shopping_bag</span>
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#0a0a0a] mb-4">Your cart is empty</h1>
        <p className="text-[#9a9a9a] mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's find some masterpieces!</p>
        <Link to="/collections" className="bg-[#0a0a0a] text-white px-8 py-3 rounded font-bold uppercase tracking-widest hover:bg-black transition-colors">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:pb-16 flex flex-col lg:grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-8">
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[#0a0a0a] mb-10 border-b border-[#f8f7f6] pb-6 uppercase">BAG</h1>

        <div className="space-y-8">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${item.size}-${item.paper}`} className="flex gap-4 md:gap-6 border-b border-[#f8f7f6] pb-8">
              <div className="w-24 h-32 md:w-32 md:h-44 bg-[#f8f7f6] rounded overflow-hidden flex-shrink-0">
                <img src={item.primaryImage || item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm md:text-lg uppercase tracking-wide truncate max-w-[150px] md:max-w-none">{item.title}</h3>
                  <button onClick={() => removeFromCart(item.id, item.size, item.paper)} className="material-symbols-outlined text-[#80786b] hover:text-red-500 text-xl">close</button>
                </div>
                <p className="text-xs text-[#80786b] uppercase mb-1">{item.category}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] md:text-xs font-bold text-[#9a9a9a] uppercase mb-4">
                  <span>Size: <span className="text-[#161513]">{item.size}</span></span>
                  <span>Paper: <span className="text-[#161513]">{item.paper}</span></span>
                </div>
                <div className="mt-auto flex justify-between items-end">
                  <div className="flex items-center border border-[#f8f7f6] rounded">
                    <button onClick={() => updateQuantity(item.id, item.size, item.paper, -1)} className="px-3 py-1 hover:bg-[#f8f7f6] transition-colors">-</button>
                    <span className="px-3 py-1 text-sm font-bold min-w-[40px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.paper, 1)} className="px-3 py-1 hover:bg-[#f8f7f6] transition-colors">+</button>
                  </div>
                  <span className="font-black text-lg text-[#0a0a0a]">₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 mt-12 lg:mt-0">
        <div className="bg-[#fcfbf9] p-8 sticky top-28 rounded-lg">
          <h2 className="font-[family-name:var(--font-display)] text-3xl mb-8 uppercase">Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm text-[#80786b] font-bold uppercase tracking-wider">
              <span>Subtotal</span>
              <span className="text-[#0a0a0a]">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-[#80786b] font-bold uppercase tracking-wider">
              <span>Estimated Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="border-t border-[#f8f7f6] pt-4 flex justify-between">
              <span className="font-bold uppercase tracking-widest text-[#0a0a0a]">Total</span>
              <span className="font-black text-2xl text-[#0a0a0a]">₹{cartTotal}</span>
            </div>
          </div>
          <button className="w-full bg-[#0a0a0a] text-white py-4 rounded font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all transform hover:-translate-y-1">
            Checkout
          </button>
          <div className="mt-6 space-y-3">
            <p className="text-[10px] text-[#80786b] text-center uppercase tracking-widest">Secure Payments via Razorpay</p>
            <div className="flex justify-center gap-3 opacity-30 grayscale">
              <span className="material-symbols-outlined text-2xl">credit_card</span>
              <span className="material-symbols-outlined text-2xl">account_balance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
