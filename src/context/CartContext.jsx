import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [pointsBalance, setPointsBalance] = useState(150); // Provide some initial points for demo purposes
    
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Simple persistence (in a real app this would be in a DB)
    useEffect(() => {
        const savedCart = localStorage.getItem('huggies_cart');
        const savedPoints = localStorage.getItem('huggies_points');
        if (savedCart) setCartItems(JSON.parse(savedCart));
        if (savedPoints) setPointsBalance(parseInt(savedPoints, 10));
    }, []);

    useEffect(() => {
        localStorage.setItem('huggies_cart', JSON.stringify(cartItems));
        localStorage.setItem('huggies_points', pointsBalance.toString());
    }, [cartItems, pointsBalance]);

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

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.discountPrice || item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const checkout = (pointsToRedeem = 0) => {
        const total = getCartTotal();
        
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
            pointsBalance,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            toggleCart,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    );
};
