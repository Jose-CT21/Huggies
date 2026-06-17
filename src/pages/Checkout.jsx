import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import './Checkout.css';

import { formatPrice } from '../utils/formatPrice';

const Checkout = () => {
    const { cartItems: cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = shipping, 2 = payment
    const [shipping, setShipping] = useState({
        name: '', lastName: '', email: '', phone: '',
        address: '', city: '', state: '', zip: ''
    });
    const [payment, setPayment] = useState({
        cardNumber: '', cardName: '', expiry: '', cvv: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!cart || cart.length === 0) {
        return (
            <div className="checkout-empty">
                <div className="container">
                    <div className="checkout-empty-content">
                        <div className="empty-icon">🛒</div>
                        <h1>Tu carrito está vacío</h1>
                        <p>Agrega productos antes de continuar al pago.</p>
                        <Button variant="primary" onClick={() => navigate('/products')}>
                            Ver productos
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const validateShipping = () => {
        const newErrors = {};
        if (!shipping.name.trim()) newErrors.name = 'Nombre requerido';
        if (!shipping.lastName.trim()) newErrors.lastName = 'Apellido requerido';
        if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) newErrors.email = 'Email válido requerido';
        if (!shipping.phone.trim()) newErrors.phone = 'Teléfono requerido';
        if (!shipping.address.trim()) newErrors.address = 'Dirección requerida';
        if (!shipping.city.trim()) newErrors.city = 'Ciudad requerida';
        if (!shipping.state.trim()) newErrors.state = 'Estado requerido';
        if (!shipping.zip.trim()) newErrors.zip = 'Código postal requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleShippingNext = (e) => {
        e.preventDefault();
        if (validateShipping()) setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            navigate('/success');
        }, 1800);
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };
    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPayment(prev => ({ ...prev, [name]: value }));
    };

    const shipping_cost = 2500;
    const total = cartTotal + shipping_cost;

    return (
        <div className="checkout-page">
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Inicio</Link>
                    <span>›</span>
                    <Link to="/products">Productos</Link>
                    <span>›</span>
                    <span>Checkout</span>
                </nav>

                <h1 className="checkout-title">Finalizar Compra</h1>

                {/* Steps indicator */}
                <div className="checkout-steps">
                    <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                        <div className="step-circle">1</div>
                        <span>Envío</span>
                    </div>
                    <div className="step-line" />
                    <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-circle">2</div>
                        <span>Pago</span>
                    </div>
                </div>

                <div className="checkout-layout">
                    {/* Form */}
                    <div className="checkout-form-section">
                        {step === 1 && (
                            <form className="checkout-form" onSubmit={handleShippingNext} noValidate>
                                <h2>Datos de Envío</h2>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nombre*</label>
                                        <input name="name" value={shipping.name} onChange={handleShippingChange} placeholder="Juan" />
                                        {errors.name && <span className="field-error">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido*</label>
                                        <input name="lastName" value={shipping.lastName} onChange={handleShippingChange} placeholder="Pérez" />
                                        {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email*</label>
                                        <input type="email" name="email" value={shipping.email} onChange={handleShippingChange} placeholder="juan@correo.com" />
                                        {errors.email && <span className="field-error">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Teléfono*</label>
                                        <input type="tel" name="phone" value={shipping.phone} onChange={handleShippingChange} placeholder="55 1234 5678" />
                                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                                    </div>
                                </div>
                                <div className="form-group full">
                                    <label>Dirección*</label>
                                    <input name="address" value={shipping.address} onChange={handleShippingChange} placeholder="Calle, número, colonia" />
                                    {errors.address && <span className="field-error">{errors.address}</span>}
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Ciudad*</label>
                                        <input name="city" value={shipping.city} onChange={handleShippingChange} placeholder="Ciudad de México" />
                                        {errors.city && <span className="field-error">{errors.city}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Estado*</label>
                                        <input name="state" value={shipping.state} onChange={handleShippingChange} placeholder="CDMX" />
                                        {errors.state && <span className="field-error">{errors.state}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>C.P.*</label>
                                        <input name="zip" value={shipping.zip} onChange={handleShippingChange} placeholder="06600" maxLength={5} />
                                        {errors.zip && <span className="field-error">{errors.zip}</span>}
                                    </div>
                                </div>
                                <Button variant="primary" type="submit" className="next-btn">
                                    Continuar al Pago →
                                </Button>
                            </form>
                        )}

                        {step === 2 && (
                            <form className="checkout-form" onSubmit={handlePaymentSubmit}>
                                <div className="payment-header">
                                    <h2>Datos de Pago</h2>
                                    <button type="button" className="back-link" onClick={() => setStep(1)}>‹ Editar envío</button>
                                </div>
                                <div className="shipping-summary-box">
                                    <p><strong>Envío a:</strong> {shipping.name} {shipping.lastName}</p>
                                    <p>{shipping.address}, {shipping.city}, {shipping.state}, {shipping.zip}</p>
                                </div>
                                <div className="form-group full">
                                    <label>Número de Tarjeta*</label>
                                    <input
                                        name="cardNumber"
                                        value={payment.cardNumber}
                                        onChange={handlePaymentChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        required
                                    />
                                </div>
                                <div className="form-group full">
                                    <label>Nombre en la Tarjeta*</label>
                                    <input name="cardName" value={payment.cardName} onChange={handlePaymentChange} placeholder="JUAN PEREZ" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiración*</label>
                                        <input name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="MM/AA" maxLength={5} required />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV*</label>
                                        <input name="cvv" value={payment.cvv} onChange={handlePaymentChange} placeholder="123" maxLength={4} required type="password" />
                                    </div>
                                </div>
                                <div className="secure-badge">🔒 Pago 100% seguro y encriptado</div>
                                <Button variant="primary" type="submit" className="next-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Procesando...' : `Pagar ${formatPrice(total)}`}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Order summary */}
                    <aside className="checkout-summary">
                        <h2>Resumen del Pedido</h2>
                        <div className="summary-items">
                            {cart.map(item => (
                                <div key={item.id} className="summary-item">
                                    <img src={item.image} alt={item.name} className="summary-item-img" />
                                    <div className="summary-item-info">
                                        <p className="summary-item-name">{item.name}</p>
                                        <p className="summary-item-size">{item.size ? `Talla ${item.size}` : item.type} × {item.quantity}</p>
                                    </div>
                                    <span className="summary-item-price">
                                        {formatPrice((item.discountPrice ?? item.price) * item.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-totals">
                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="summary-line">
                                <span>Envío</span>
                                <span>{formatPrice(shipping_cost)}</span>
                            </div>
                            <div className="summary-line total">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
