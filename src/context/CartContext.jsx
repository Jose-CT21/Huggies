import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('huggies_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [pointsBalance, setPointsBalance] = useState(() => {
        const savedPoints = localStorage.getItem('huggies_points');
        return savedPoints ? parseInt(savedPoints, 10) : 150;
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Simple persistence (in a real app this would be in a DB)
    useEffect(() => {
        localStorage.setItem('huggies_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('huggies_points', pointsBalance.toString());
    }, [pointsBalance]);

    const cartItemsCount = useMemo(
        () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
        [cartItems]
    );

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const price = item.discountPrice || item.price;
            return total + (price * item.quantity);
        }, 0);
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const getCartTotal = () => cartTotal;

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const checkout = (pointsToRedeem = 0) => {
        const total = cartTotal;
        
        // Calculate point discount (10 points = $1)
        const discountAmount = pointsToRedeem / 10;
        
        // Final total after discount
        const finalTotal = Math.max(0, total - discountAmount);
        
        let pointsEarned = 0;
        
        if (isAuthenticated) {
            // Calculate points earned from the final total (1 point per $10 spent)
            pointsEarned = Math.floor(finalTotal / 10);
            
            // Update points
            setPointsBalance(prev => prev - pointsToRedeem + pointsEarned);
        }
        
        // Clear cart
        setCartItems([]);
        setIsCartOpen(false);
        
        return { 
            success: true, 
            pointsEarned, 
            pointsRedeemed: pointsToRedeem,
            totalPaid: finalTotal 
        };
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartItemsCount,
            cartTotal,
            pointsBalance,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            clearCart,
            updateQuantity,
            getCartTotal,
            toggleCart,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    );
};
