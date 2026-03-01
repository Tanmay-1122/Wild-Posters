import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product, size, paper) => {
        setCart((prev) => {
            const existing = prev.find(
                (item) => item.id === product.id && item.size === size && item.paper === paper
            );
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id && item.size === size && item.paper === paper
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, size, paper, quantity: 1 }];
        });
    };

    const removeFromCart = (id, size, paper) => {
        setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.paper === paper)));
    };

    const updateQuantity = (id, size, paper, delta) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.size === size && item.paper === paper
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const isWishlisted = prev.find((item) => item.id === product.id);
            if (isWishlisted) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <ShopContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleWishlist,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}

export const useShop = () => useContext(ShopContext);
