import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import StarIcon from './icons/StarIcon';
import './CartModal.css';

const CartModal = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, getCartTotal, checkout, pointsBalance, setIsCartOpen } = useCart();
    const { isAuthenticated } = useAuth();
    const [usePoints, setUsePoints] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (isCartOpen) {
            setIsCartOpen(false);
        }
    }, [location.pathname, setIsCartOpen]);

    if (!isCartOpen) return null;

    const total = getCartTotal();
    const maxPointsToUse = isAuthenticated ? Math.min(pointsBalance, Math.floor(total * 10)) : 0; // 10 points = $1 discount

    const handleCheckout = () => {
        const result = checkout(usePoints);
        if (isAuthenticated) {
            alert(`¡Compra realizada con éxito!\n\nHas pagado: $${result.totalPaid.toFixed(2)}\nGanaste: ${result.pointsEarned} puntos⭐\n${result.pointsRedeemed > 0 ? `Canjeaste: ${result.pointsRedeemed} puntos` : ''}`);
        } else {
            alert(`¡Compra realizada con éxito!\n\nHas pagado: $${result.totalPaid.toFixed(2)}`);
        }
        setUsePoints(0);
    };

    const handleTogglePoints = (e) => {
        setUsePoints(e.target.checked ? maxPointsToUse : 0);
    };

    return (
        <div className="cart-modal-overlay" onClick={toggleCart}>
            <div className="cart-modal" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Tu Carrito</h2>
                    <button className="close-btn" onClick={toggleCart}>&times;</button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <p>Tu carrito está vacío.</p>
                            <Button variant="primary" onClick={toggleCart}>Continuar Comprando</Button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>{item.size && item.size !== 'Única' ? `Talla: ${item.size}` : item.type}</p>
                                            <div className="item-actions">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                        <div className="item-price">
                                            <p>${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                
                                {isAuthenticated && pointsBalance > 0 && (
                                    <div className="points-redemption">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                checked={usePoints > 0} 
                                                onChange={handleTogglePoints} 
                                            />
                                            Canjear {maxPointsToUse} pts por un descuento de ${(maxPointsToUse / 10).toFixed(2)}
                                        </label>
                                        <small>Tienes {pointsBalance} puntos disponibles.</small>
                                    </div>
                                )}
                                
                                {!isAuthenticated && (
                                    <div className="points-redemption" style={{ background: '#F8F9FA', borderColor: '#E9ECEF' }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#6C757D', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <StarIcon size={16} /> <span>Inicia sesión para acumular y canjear puntos.</span>
                                        </p>
                                    </div>
                                )}

                                {usePoints > 0 && (
                                    <div className="summary-row discount">
                                        <span>Descuento (Puntos):</span>
                                        <span>-${(usePoints / 10).toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="summary-row total">
                                    <span>Total Final:</span>
                                    <span>${Math.max(0, total - (usePoints / 10)).toFixed(2)}</span>
                                </div>
                                
                                {isAuthenticated && (
                                    <div className="points-earned-preview">
                                        <StarIcon size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '5px'}}/> 
                                        Ganarás {Math.floor(Math.max(0, total - (usePoints / 10)) / 10)} puntos
                                    </div>
                                )}

                                <Button variant="primary" className="checkout-btn" onClick={handleCheckout}>
                                    Completar Pago Seguro
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;
