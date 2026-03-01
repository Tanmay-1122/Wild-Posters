import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart } = useShop();
  const {
    title,
    category,
    collection,
    price,
    originalPrice,
    primaryImage,
    roomImage,
    badge,
    discount,
    slug,
    id,
  } = product;

  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const image = primaryImage || product.image;
  const room = roomImage || image;

  const getBadgeStyle = () => {
    if (badge === 'new') return { background: '#0a0a0a' };
    if (badge === 'sale') return { background: '#d72b2b' };
    return { background: '#e05c00' }; // hot
  };

  const getBadgeText = () => {
    if (badge === 'new') return 'NEW';
    if (badge === 'sale' && discount) return `${discount}% OFF`;
    return 'HOT';
  };

  return (
    <div
      className="product-card cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${slug || id}`} className="block">
        <div className="product-card__image-wrap relative overflow-hidden bg-[#f0f0f0] mb-3" style={{ aspectRatio: '2/3' }}>
          <img
            src={image}
            alt={title}
            className="product-card__image block w-full h-full object-cover"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: hovered ? 0 : 1,
              transition: 'opacity 0.38s ease, transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            loading="lazy"
          />
          <img
            src={room}
            alt={`${title} in room`}
            className="product-card__image block w-full h-full object-cover"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.38s ease, transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            loading="lazy"
          />

          {badge && (
            <span
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 3,
                fontFamily: 'Barlow',
                fontWeight: 900,
                fontSize: 9,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                color: '#ffffff',
                ...getBadgeStyle(),
              }}
            >
              {getBadgeText()}
            </span>
          )}

          {/* Quick Add - slides up from bottom on hover */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 3,
              padding: 10,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setAdded(true);
                addToCart(product, 'A4', 'Matte (300gsm)');
                setTimeout(() => setAdded(false), 1500);
              }}
              style={{
                width: '100%',
                padding: '11px 0',
                border: 'none',
                background: added ? '#1a8a3d' : '#ffffff',
                color: added ? '#ffffff' : '#0a0a0a',
                fontFamily: 'Barlow',
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              {added ? '✓ ADDED' : 'QUICK ADD'}
            </button>
          </div>
        </div>

        <div style={{ paddingTop: 0 }}>
          <p
            className="category-tag"
            style={{
              color: '#b0b0b0',
              marginBottom: 5,
            }}
          >
            {collection || category}
          </p>
          <p
            style={{
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: 14,
              color: '#0a0a0a',
              lineHeight: 1.4,
              marginBottom: 8,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="price">₹{price}</span>
            {originalPrice && (
              <span
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: 13,
                  color: '#b0b0b0',
                  textDecoration: 'line-through',
                }}
              >
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
