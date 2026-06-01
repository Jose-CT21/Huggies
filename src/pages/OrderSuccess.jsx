import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const tickRef = useRef(null);

    useEffect(() => {
        if (tickRef.current) {
            tickRef.current.style.strokeDashoffset = '0';
        }
    }, []);

    const orderNumber = `HUG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return (
        <div className="order-success-page">
            <div className="success-card">
                <div className="success-icon-wrap">
                    <svg className="success-circle-svg" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" className="circle-bg" />
                        <circle cx="40" cy="40" r="36" className="circle-fill" />
                        <polyline
                            ref={tickRef}
                            points="24,42 35,54 56,30"
                            className="checkmark"
                        />
                    </svg>
                </div>

                <h1 className="success-title">¡Pedido Confirmado!</h1>
                <p className="success-subtitle">
                    Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.
                </p>

                <div className="success-order-info">
                    <div className="order-info-item">
                        <span className="order-info-label">Número de pedido</span>
                        <span className="order-info-value">{orderNumber}</span>
                    </div>
                    <div className="order-info-item">
                        <span className="order-info-label">Tiempo estimado de entrega</span>
                        <span className="order-info-value">3 – 5 días hábiles</span>
                    </div>
                    <div className="order-info-item">
                        <span className="order-info-label">Puntos Huggies ganados</span>
                        <span className="order-info-value points">+85 puntos ✦</span>
                    </div>
                </div>

                <div className="success-actions">
                    <Button variant="primary" as={Link} onClick={() => {}}>
                        <Link to="/products" className="success-btn-link">Seguir Comprando</Link>
                    </Button>
                    <Button variant="outline" onClick={() => {}}>
                        <Link to="/recompensas" className="success-btn-link">Ver mis Recompensas</Link>
                    </Button>
                </div>

                <p className="success-footer-note">
                    Recibirás un correo de confirmación con los detalles de tu pedido.
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;
