import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useProducts } from '../hooks/useProducts';

/* ─── inject global styles once ─────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800&display=swap');

  .wp-page * { box-sizing: border-box; }

  .wp-page {
    font-family: 'Barlow', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #f4f4f2;
    min-height: 100vh;
  }

  @keyframes wp-fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wp-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes wp-slide-right {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes wp-card-in {
    from { opacity: 0; transform: translateY(36px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes wp-shimmer {
    100% { transform: translateX(100%); }
  }
  @keyframes wp-toast-in {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes wp-modal-in {
    from { opacity: 0; transform: scale(.96) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes wp-drawer-in {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  @keyframes wp-count-pop {
    0%  { transform: scale(1); }
    50% { transform: scale(1.45); }
    100%{ transform: scale(1); }
  }

  .wp-anim-fade-up    { animation: wp-fade-up .55s cubic-bezier(.22,.68,0,1.2) both; }
  .wp-anim-fade-in    { animation: wp-fade-in .4s ease both; }
  .wp-anim-slide-r    { animation: wp-slide-right .45s cubic-bezier(.22,.68,0,1.2) both; }
  .wp-anim-card       { animation: wp-card-in .55s cubic-bezier(.22,.68,0,1.2) both; }
  .wp-anim-modal      { animation: wp-modal-in .3s cubic-bezier(.22,.68,0,1.2) both; }
  .wp-anim-drawer     { animation: wp-drawer-in .32s cubic-bezier(.22,.68,0,1.2) both; }
  .wp-anim-count-pop  { animation: wp-count-pop .3s ease; }

  .wp-skeleton {
    position: relative; overflow: hidden; background: #e2e2de;
  }
  .wp-skeleton::after {
    content: ''; position: absolute; inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent);
    animation: wp-shimmer 1.4s infinite;
  }

  .wp-card {
    background: #fff; border: 1px solid #e0e0dc;
    transition: border-color .2s, box-shadow .25s;
    position: relative; overflow: hidden;
  }
  .wp-card:hover { border-color: #aaa; box-shadow: 0 8px 32px rgba(0,0,0,.08); }
  .wp-card .wp-card-img { transition: transform .5s cubic-bezier(.25,.46,.45,.94); }
  .wp-card:hover .wp-card-img { transform: scale(1.06); }
  .wp-card .wp-card-overlay { opacity: 0; transition: opacity .22s; }
  .wp-card:hover .wp-card-overlay { opacity: 1; }

  .wp-wish-btn {
    background: rgba(255,255,255,.92); border: 1px solid rgba(0,0,0,.10);
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    transition: background .15s, transform .15s; cursor: pointer;
  }
  .wp-wish-btn:hover { background: #fff; transform: scale(1.08); }
  .wp-wish-btn.active svg path { fill: #e11d48; stroke: #e11d48; }

  .wp-btn {
    border: 1.5px solid #d0d0cc; background: transparent; color: #0a0a0a;
    font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 11px;
    letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
    transition: background .15s, border-color .15s, transform .1s;
  }
  .wp-btn:hover { border-color: #0a0a0a; background: #f0f0ec; }
  .wp-btn:active { transform: translateY(1px); }

  .wp-btn-primary {
    border: 1.5px solid #0a0a0a; background: #0a0a0a; color: #fff;
    font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 11px;
    letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
    transition: background .15s, transform .1s;
  }
  .wp-btn-primary:hover { background: #2a2a2a; }
  .wp-btn-primary:active { transform: translateY(1px); }
  .wp-btn-primary:disabled { background: #bbb; border-color: #bbb; cursor: not-allowed; }

  .wp-badge-in  { background:#e8f5ee; color:#1a7a45; border:1px solid rgba(26,122,69,.2); font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; padding:2px 7px; }
  .wp-badge-out { background:#fdf0ee; color:#b83c30; border:1px solid rgba(184,60,48,.2); font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; padding:2px 7px; }
  .wp-badge-off { background:#0a0a0a; color:#fff; font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; padding:2px 7px; }

  .wp-tag { border:1px solid #d0d0cc; color:#888; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:2px 7px; background:transparent; }

  .wp-select {
    border: 1.5px solid #d0d0cc;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") right 12px center no-repeat;
    color: #0a0a0a; font-family: 'Barlow', sans-serif; font-weight: 700;
    font-size: 12px; letter-spacing: .04em; text-transform: uppercase;
    padding: 9px 36px 9px 12px; appearance: none; cursor: pointer; outline: none;
    transition: border-color .15s;
  }
  .wp-select:focus { border-color: #0a0a0a; }

  .wp-modal-img-wrap { background: #f0f0ec; overflow: hidden; }
  .wp-modal-img-wrap img { transition: transform .4s cubic-bezier(.25,.46,.45,.94); }
  .wp-modal-img-wrap:hover img { transform: scale(1.04); }

  .wp-toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    z-index: 9999; background: #0a0a0a; color: #fff;
    font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 12px;
    letter-spacing: .05em; text-transform: uppercase;
    padding: 12px 20px; display: flex; align-items: center; gap: 10px;
    white-space: nowrap; animation: wp-toast-in .3s cubic-bezier(.22,.68,0,1.2) both;
    pointer-events: none; box-shadow: 0 4px 24px rgba(0,0,0,.25);
  }
  .wp-toast.ok    { background: #1a7a45; }
  .wp-toast.error { background: #b83c30; }

  .wp-grid { display: grid; gap: 1px; background: #e0e0dc; }

  .wp-qty-input {
    width: 40px; text-align: center; border: 1.5px solid #d0d0cc;
    background: #fff; color: #0a0a0a; font-family: 'Barlow', sans-serif;
    font-weight: 700; font-size: 13px; padding: 4px; outline: none;
  }
  .wp-qty-input:focus { border-color: #0a0a0a; }

  @media (prefers-reduced-motion: reduce) {
    .wp-page *, .wp-page *::before, .wp-page *::after {
      animation: none !important; transition: none !important;
    }
  }
`;

let stylesInjected = false;
function injectStyles() {
    if (stylesInjected || typeof document === 'undefined') return;
    const el = document.createElement('style');
    el.textContent = STYLES;
    document.head.appendChild(el);
    stylesInjected = true;
}

/* ─── helpers ────────────────────────────────────────────────── */
const money = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function Stars({ rating = 0 }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return (
        <svg width="68" height="12" viewBox="0 0 120 24" aria-hidden="true" style={{ flexShrink: 0 }}>
            {[...Array(full)].map((_, i) => (
                <path key={`f${i}`} d="M12 17.3 6.2 20.4l1.1-6.4-4.6-4.5 6.4-.9L12 2.8l2.9 5.8 6.4.9-4.6 4.5 1.1 6.4z"
                    fill="#0a0a0a" transform={`translate(${i * 24},0)`} />
            ))}
            {half === 1 && (
                <path d="M12 17.3 6.2 20.4l1.1-6.4-4.6-4.5 6.4-.9L12 2.8z"
                    fill="#0a0a0a" transform={`translate(${full * 24},0)`} />
            )}
            {[...Array(empty)].map((_, i) => (
                <path key={`e${i}`} d="M12 17.3 6.2 20.4l1.1-6.4-4.6-4.5 6.4-.9L12 2.8l2.9 5.8 6.4.9-4.6 4.5 1.1 6.4z"
                    fill="#d4d4d4" transform={`translate(${(full + half + i) * 24},0)`} />
            ))}
        </svg>
    );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────── */
function ProductCard({ product: p, idx, wishlisted, onAddToCart, onWishlist, onQuickView }) {
    const isOut = (p.stock ?? 1) <= 0;
    const hasDiscount = p.originalPrice && p.originalPrice > p.price;
    const discountPct = hasDiscount ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

    return (
        <article
            className="wp-card wp-anim-card"
            style={{ animationDelay: `${Math.min(idx * 60, 480)}ms` }}
        >
            <div style={{ position: 'relative', overflow: 'hidden', background: '#f0f0ec', aspectRatio: '4/5' }}>
                <Link to={`/product/${p.slug || p.id}`}>
                    <img
                        src={p.primaryImage || p.image}
                        alt={p.title}
                        className="wp-card-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                    />
                </Link>

                <div className="wp-card-overlay" style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,.38)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
                }}>
                    <button onClick={(e) => { e.preventDefault(); onQuickView(p); }} className="wp-btn-primary" style={{ padding: '10px 22px' }}>
                        Quick View
                    </button>
                </div>

                <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 3 }}>
                    {isOut
                        ? <span className="wp-badge-out">Out</span>
                        : <span className="wp-badge-in">In Stock</span>
                    }
                    {hasDiscount && <span className="wp-badge-off">−{discountPct}%</span>}
                    {p.badge === 'new' && !hasDiscount && <span className="wp-badge-off">NEW</span>}
                    {p.badge === 'hot' && !hasDiscount && <span className="wp-badge-off">HOT</span>}
                </div>

                <button
                    className={`wp-wish-btn${wishlisted ? ' active' : ''}`}
                    onClick={() => onWishlist(p)}
                    style={{ position: 'absolute', top: 10, right: 10, zIndex: 3 }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21s-7-4.6-9.3-9C1 8.7 3.2 6 6.3 6c1.8 0 3.2 1 3.7 1.7.5-.7 1.9-1.7 3.7-1.7C16.8 6 19 8.7 21.3 12c-2.3 4.4-9.3 9-9.3 9Z"
                            stroke={wishlisted ? '#e11d48' : '#666'} strokeWidth="1.8" strokeLinejoin="round"
                            fill={wishlisted ? 'rgba(225,29,72,.15)' : 'transparent'} />
                    </svg>
                </button>
            </div>

            <div style={{ padding: '14px 14px 16px', background: '#fff' }}>
                <Link to={`/product/${p.slug || p.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.2, color: '#0a0a0a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                            {p.title}
                        </h3>
                        <div style={{ flexShrink: 0, textAlign: 'right' }}>
                            <span style={{ fontSize: 15, fontWeight: 900, color: '#0a0a0a' }}>{money(p.price)}</span>
                            {hasDiscount && (
                                <div style={{ fontSize: 11, color: '#aaa', textDecoration: 'line-through', lineHeight: 1 }}>{money(p.originalPrice)}</div>
                            )}
                        </div>
                    </div>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <span className="wp-tag">{p.category || p.collection}</span>
                    <Stars rating={p.rating || 0} />
                    <span style={{ fontSize: 10, color: '#999', fontWeight: 700 }}>({p.reviews || 0})</span>
                </div>

                <button
                    className="wp-btn-primary"
                    disabled={isOut}
                    onClick={() => !isOut && onAddToCart(p)}
                    style={{ width: '100%', padding: '10px 0' }}
                >
                    {isOut ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </article>
    );
}

/* ─── SKELETON CARD ──────────────────────────────────────────── */
function SkeletonCard() {
    return (
        <div style={{ background: '#fff', border: '1px solid #e0e0dc' }}>
            <div className="wp-skeleton" style={{ aspectRatio: '4/5' }} />
            <div style={{ padding: '14px', background: '#fff' }}>
                <div className="wp-skeleton" style={{ height: 14, width: '70%', marginBottom: 8 }} />
                <div className="wp-skeleton" style={{ height: 11, width: '40%', marginBottom: 12 }} />
                <div className="wp-skeleton" style={{ height: 36, width: '100%' }} />
            </div>
        </div>
    );
}

/* ─── QUICK VIEW MODAL ───────────────────────────────────────── */
function QuickViewModal({ product: p, wishlisted, onClose, onAddToCart, onWishlist }) {
    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose]);

    if (!p) return null;
    const isOut = (p.stock ?? 1) <= 0;
    const hasDiscount = p.originalPrice && p.originalPrice > p.price;
    const discountPct = hasDiscount ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} className="wp-anim-fade-in">
            <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)', cursor: 'pointer' }} />
            <div className="wp-anim-modal" style={{
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
                width: 'min(94vw, 800px)', background: '#fff', border: '1px solid #d0d0cc',
                maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #e8e8e4' }}>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-.02em', textTransform: 'uppercase', color: '#0a0a0a' }}>{p.title}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#999', marginTop: 2 }}>
                            {p.category} · SKU {p.id}
                        </div>
                    </div>
                    <button onClick={onClose} className="wp-btn" style={{ padding: '8px 16px' }}>✕ Close</button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'auto', flex: 1 }}>
                    <div className="wp-modal-img-wrap" style={{ flex: '1 1 240px', minWidth: 0, aspectRatio: '4/5' }}>
                        <img src={p.primaryImage || p.image} alt={p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>

                    <div style={{ flex: '1 1 260px', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, background: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-.03em', color: '#0a0a0a' }}>
                                    {money(p.price)}
                                    {hasDiscount && (
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#aaa', textDecoration: 'line-through', marginLeft: 10 }}>
                                            {money(p.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                <div style={{ marginTop: 6 }}>
                                    {isOut ? <span className="wp-badge-out">Out of stock</span> : <span className="wp-badge-in">In stock</span>}
                                </div>
                            </div>
                            {hasDiscount && <span className="wp-badge-off">−{discountPct}%</span>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Stars rating={p.rating || 0} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>{(p.rating || 0).toFixed(1)} ({p.reviews || 0} reviews)</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div style={{ background: '#f4f4f2', border: '1px solid #e0e0dc', padding: '10px 12px' }}>
                                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>Category</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>{p.category}</div>
                            </div>
                            <div style={{ background: '#f4f4f2', border: '1px solid #e0e0dc', padding: '10px 12px' }}>
                                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>Sizes</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>A4, A3, A2</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {[p.category, 'Matte', 'A4', 'A3'].filter(Boolean).map((t, i) => (
                                <span key={i} className="wp-tag">{t}</span>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginTop: 'auto' }}>
                            <button className="wp-btn-primary" disabled={isOut}
                                onClick={() => { onAddToCart(p); onClose(); }} style={{ padding: '13px 0' }}>
                                {isOut ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                            <button className={`wp-btn${wishlisted ? ' active' : ''}`} onClick={() => onWishlist(p)}
                                style={{ padding: '13px 18px', minWidth: 44 }} title="Wishlist">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 21s-7-4.6-9.3-9C1 8.7 3.2 6 6.3 6c1.8 0 3.2 1 3.7 1.7.5-.7 1.9-1.7 3.7-1.7C16.8 6 19 8.7 21.3 12c-2.3 4.4-9.3 9-9.3 9Z"
                                        stroke={wishlisted ? '#e11d48' : '#0a0a0a'} strokeWidth="1.8" strokeLinejoin="round"
                                        fill={wishlisted ? 'rgba(225,29,72,.15)' : 'transparent'} />
                                </svg>
                            </button>
                        </div>

                        <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                            Secure checkout · Fast dispatch · Easy returns
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── CART DRAWER ────────────────────────────────────────────── */
function CartDrawer({ open, onClose, cart, onSetQty, onRemove }) {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 900 }} className="wp-anim-fade-in">
            <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)', cursor: 'pointer' }} />
            <aside className="wp-anim-drawer" style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: 'min(100vw, 400px)',
                background: '#fff', borderLeft: '1px solid #e0e0dc', display: 'flex', flexDirection: 'column',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #e8e8e4' }}>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-.02em', textTransform: 'uppercase' }}>Cart</div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#999', marginTop: 2 }}>
                            {cart.reduce((s, i) => s + (i.quantity || 1), 0)} items
                        </div>
                    </div>
                    <button onClick={onClose} className="wp-btn" style={{ padding: '8px 14px' }}>✕</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', paddingTop: 48 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#666', marginBottom: 8 }}>Your cart is empty</div>
                            <div style={{ fontSize: 12, color: '#aaa' }}>Add some posters to get started.</div>
                            <button onClick={onClose} className="wp-btn-primary" style={{ marginTop: 20, padding: '10px 28px' }}>Browse</button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0ec' }}>
                                <img src={item.primaryImage || item.image} alt={item.title}
                                    style={{ width: 56, height: 70, objectFit: 'cover', background: '#f0f0ec', border: '1px solid #e0e0dc', flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-.01em', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 8 }}>{item.size || 'A4'} · {item.paper || 'Matte'}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <button onClick={() => onRemove(item)} className="wp-btn" style={{ padding: '3px 9px', fontSize: 14, lineHeight: 1 }}>−</button>
                                            <input className="wp-qty-input" value={item.quantity || 1} readOnly style={{ width: 36 }} />
                                            <button onClick={() => onSetQty(item)} className="wp-btn" style={{ padding: '3px 9px', fontSize: 14, lineHeight: 1 }}>+</button>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 900, color: '#0a0a0a' }}>{money(item.price * (item.quantity || 1))}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div style={{ padding: '16px 20px', borderTop: '1px solid #e8e8e4' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#666' }}>Subtotal</span>
                            <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-.02em' }}>{money(subtotal)}</span>
                        </div>
                        <button className="wp-btn-primary" style={{ width: '100%', padding: '14px 0', marginBottom: 8 }}>Checkout</button>
                        <button onClick={onClose} className="wp-btn" style={{ width: '100%', padding: '11px 0' }}>Continue Shopping</button>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: '#bbb', textAlign: 'center', marginTop: 10 }}>
                            Free shipping on orders over ₹999
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}

/* ─── TOAST ──────────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, tone = 'default') {
    if (typeof document === 'undefined') return;
    const existing = document.getElementById('wp-toast-el');
    if (existing) existing.remove();
    clearTimeout(toastTimer);
    const el = document.createElement('div');
    el.id = 'wp-toast-el';
    el.className = `wp-toast${tone === 'ok' ? ' ok' : tone === 'error' ? ' error' : ''}`;
    el.innerHTML = `<span style="opacity:.6">●</span> ${msg}`;
    document.body.appendChild(el);
    toastTimer = setTimeout(() => el.remove(), 2800);
}

/* ─── SORT OPTIONS ───────────────────────────────────────────── */
const SORTS = [
    { value: 'featured', label: 'Featured' },
    { value: 'priceAsc', label: 'Price ↑' },
    { value: 'priceDesc', label: 'Price ↓' },
    { value: 'nameAsc', label: 'A → Z' },
];

/* ─── MAIN CATEGORY PAGE ────────────────────────────────────── */
export default function CategoryPage() {
    injectStyles();

    const { category } = useParams();
    const { cart, wishlist, addToCart, toggleWishlist, updateQuantity, removeFromCart } = useShop();

    // ── live data from Medusa ──
    const { products, loading } = useProducts();

    const [sort, setSort] = useState('featured');
    const [avail, setAvail] = useState('all');
    const [modal, setModal] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistSet, setWishlistSet] = useState(new Set());
    const [cartCountAnim, setCartCountAnim] = useState(false);
    const cartCountRef = useRef(null);

    /* Sync wishlist from context */
    useEffect(() => {
        if (Array.isArray(wishlist)) {
            setWishlistSet(new Set(wishlist.map(x => x.id ?? x)));
        }
    }, [wishlist]);

    /* Scroll to top on category change */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    const handleAddToCart = useCallback((product) => {
        addToCart(product, 'A4', 'Matte (300gsm)');
        showToast(`${product.title} added to cart`, 'ok');
        setCartCountAnim(true);
        setTimeout(() => setCartCountAnim(false), 400);
    }, [addToCart]);

    const handleSetQty = useCallback((item) => {
        updateQuantity(item.id, item.size, item.paper, 1);
    }, [updateQuantity]);

    const handleRemove = useCallback((item) => {
        removeFromCart(item.id, item.size, item.paper);
        showToast('Removed from cart', 'default');
    }, [removeFromCart]);

    const handleWishlist = useCallback((product) => {
        toggleWishlist(product);
        const isWished = wishlistSet.has(product.id);
        showToast(isWished ? 'Removed from wishlist' : `${product.title} wishlisted`, isWished ? 'default' : 'ok');
    }, [toggleWishlist, wishlistSet]);

    /* Filter products for this category from live Medusa data */
    const categoryProducts = products.filter(p =>
        (p.categorySlug || '').toLowerCase() === (category || '').toLowerCase()
    );

    const filtered = categoryProducts
        .filter(p => avail === 'all' || (avail === 'in' ? (p.stock ?? 1) > 0 : (p.stock ?? 1) <= 0))
        .sort((a, b) => {
            switch (sort) {
                case 'priceAsc': return a.price - b.price;
                case 'priceDesc': return b.price - a.price;
                case 'nameAsc': return (a.title || '').localeCompare(b.title || '');
                default: return 0;
            }
        });

    const cartCount = cart.reduce((s, i) => s + (i.quantity || 1), 0);

    const categoryName = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : 'Category';

    return (
        <div className="wp-page" style={{ paddingBottom: 80 }}>

            {/* ── HERO STRIP ─────────────────────────── */}
            <div style={{
                background: '#0a0a0a', color: '#fff',
                padding: '32px 24px 28px', overflow: 'hidden', position: 'relative',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, opacity: .04,
                    backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)',
                    pointerEvents: 'none',
                }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
                    <div className="wp-anim-fade-in" style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                        <Link to="/collections" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'color .15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.5)'}>
                            All Collections
                        </Link>
                        <span style={{ color: 'rgba(255,255,255,.25)' }}>→</span>
                        <span style={{ color: '#fff' }}>{categoryName}</span>
                    </div>

                    <div className="wp-anim-slide-r">
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 6 }}>
                            Wild Posters · {categoryName}
                        </div>
                        <h1 style={{ margin: 0, fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1, textTransform: 'uppercase', fontStyle: 'italic' }}>
                            {categoryName}<br />Posters
                        </h1>
                    </div>

                    <div className="wp-anim-fade-up" style={{ animationDelay: '120ms', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', fontWeight: 600 }}>
                            {loading ? '—' : filtered.length} prints available
                        </div>

                        <button
                            onClick={() => setCartOpen(true)}
                            className="wp-btn"
                            style={{ borderColor: 'rgba(255,255,255,.25)', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7h14l-1.6 8.2a2 2 0 0 1-2 1.6H9.3a2 2 0 0 1-2-1.6L5 3H2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
                            </svg>
                            Cart
                            <span
                                ref={cartCountRef}
                                className={cartCountAnim ? 'wp-anim-count-pop' : ''}
                                style={{
                                    background: '#fff', color: '#0a0a0a', fontSize: 10, fontWeight: 900,
                                    minWidth: 20, height: 20, display: 'inline-flex', alignItems: 'center',
                                    justifyContent: 'center', padding: '0 5px',
                                }}
                            >
                                {cartCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── SORT BAR ────────────────────────────── */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e0e0dc', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: '#0a0a0a' }}>
                        {categoryName}
                        <span style={{ fontWeight: 600, color: '#999', marginLeft: 8 }}>
                            ({loading ? '—' : filtered.length})
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <select value={avail} onChange={e => setAvail(e.target.value)} className="wp-select" style={{ fontSize: 10 }}>
                            <option value="all">All</option>
                            <option value="in">In Stock</option>
                            <option value="out">Out of Stock</option>
                        </select>
                        <select value={sort} onChange={e => setSort(e.target.value)} className="wp-select">
                            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* ── PRODUCT GRID ───────────────────────── */}
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px 0' }}>
                {loading ? (
                    <div className="wp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="wp-anim-fade-up" style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: '#bbb', marginBottom: 12 }}>
                            No {categoryName} posters found
                        </div>
                        <div style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
                            We're working on adding more designs to this collection.
                        </div>
                        <Link to="/collections" className="wp-btn-primary" style={{ padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>
                            Browse All Collections
                        </Link>
                    </div>
                ) : (
                    <div className="wp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 44vw), 1fr))' }}>
                        {filtered.map((p, i) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                idx={i}
                                wishlisted={wishlistSet.has(p.id)}
                                onAddToCart={handleAddToCart}
                                onWishlist={handleWishlist}
                                onQuickView={setModal}
                            />
                        ))}
                    </div>
                )}

                {!loading && filtered.length > 0 && (
                    <div className="wp-anim-fade-in" style={{ textAlign: 'center', padding: '32px 0 0', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#bbb' }}>
                        Showing {filtered.length} {categoryName} prints
                    </div>
                )}
            </div>

            {/* ── QUICK VIEW MODAL ───────────────────── */}
            {modal && (
                <QuickViewModal
                    product={modal}
                    wishlisted={wishlistSet.has(modal.id)}
                    onClose={() => setModal(null)}
                    onAddToCart={handleAddToCart}
                    onWishlist={handleWishlist}
                />
            )}

            {/* ── CART DRAWER ────────────────────────── */}
            <CartDrawer
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                cart={cart}
                onSetQty={handleSetQty}
                onRemove={handleRemove}
            />
        </div>
    );
}