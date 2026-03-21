import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import './Rewards.css';

const Rewards = () => {
    const { isAuthenticated } = useAuth();
    const { pointsBalance } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    // Determine level
    let level = 'Bronce';
    if (pointsBalance > 500) level = 'Plata';
    if (pointsBalance > 1000) level = 'Oro';
    if (pointsBalance > 2000) level = 'Platino';

    return (
        <div className="rewards-page">
            <div className="rewards-header-bg">
                <div className="container">
                    <div className="rewards-hero animate-slide-up">
                        <div className="rewards-hero__content">
                            <span className="rewards-hero__level">Nivel {level}</span>
                            <h1 className="rewards-hero__balance">{pointsBalance}</h1>
                            <span className="rewards-hero__label">Puntos Disponibles</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container rewards-content">
                <section className="rewards-section delay-100 animate-slide-up">
                    <h2 className="section-title">Canjea tus puntos</h2>
                    <p className="section-subtitle">Usa tus puntos en tu próxima compra o canjéalos por premios exclusivos.</p>
                    
                    <div className="catalog-grid">
                        <div className="catalog-item">
                            <div className="catalog-item__image bg-red">🎁</div>
                            <h3 className="catalog-item__title">Cupón de $50</h3>
                            <p className="catalog-item__desc">Descuento en pañales Etapa 1 a 3</p>
                            <Button variant="primary" size="small" className="w-full">Canjear (500 pts)</Button>
                        </div>
                        <div className="catalog-item">
                            <div className="catalog-item__image bg-blue">🧸</div>
                            <h3 className="catalog-item__title">Osito Huggies</h3>
                            <p className="catalog-item__desc">Osito de peluche edición especial</p>
                            <Button variant="primary" size="small" className="w-full">Canjear (1200 pts)</Button>
                        </div>
                        <div className="catalog-item">
                            <div className="catalog-item__image bg-yellow">🧴</div>
                            <h3 className="catalog-item__title">Kit Cuidado</h3>
                            <p className="catalog-item__desc">Toallitas y crema anti-rozaduras</p>
                            <Button variant="primary" size="small" className="w-full">Canjear (800 pts)</Button>
                        </div>
                        <div className="catalog-item">
                            <div className="catalog-item__image bg-green">🎟️</div>
                            <h3 className="catalog-item__title">Sorteo Mensual</h3>
                            <p className="catalog-item__desc">Participa por 1 año de pañales gratis</p>
                            <Button variant="primary" size="small" className="w-full">Participar (100 pts)</Button>
                        </div>
                    </div>
                </section>

                <section className="rewards-section delay-200 animate-slide-up">
                    <div className="rewards-card">
                        <h2 className="rewards-card__title">Últimas Recompensas Obtenidas</h2>
                        <div className="history-list">
                            <div className="history-item">
                                <div className="history-item__icon gain">↑</div>
                                <div className="history-item__details">
                                    <p className="history-item__title">Compra en línea</p>
                                    <p className="history-item__date">14 Mar 2026</p>
                                </div>
                                <div className="history-item__points gain">+85 pts</div>
                            </div>
                            <div className="history-item">
                                <div className="history-item__icon gain">↑</div>
                                <div className="history-item__details">
                                    <p className="history-item__title">Bono de cumpleaños Bebé</p>
                                    <p className="history-item__date">15 Nov 2025</p>
                                </div>
                                <div className="history-item__points gain">+200 pts</div>
                            </div>
                            <div className="history-item">
                                <div className="history-item__icon spend">↓</div>
                                <div className="history-item__details">
                                    <p className="history-item__title">Canje: Cupón de Descuento</p>
                                    <p className="history-item__date">10 Oct 2025</p>
                                </div>
                                <div className="history-item__points spend">-500 pts</div>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-md">Ver historial completo</Button>
                    </div>
                </section>

                <section className="rewards-section delay-300 animate-slide-up pb-xl">
                    <div className="rewards-info-banner">
                        <div className="rewards-info-banner__content">
                            <h3>¿Cómo ganar más puntos?</h3>
                            <ul>
                                <li>✨ 1 punto por cada $10 de compra</li>
                                <li>✨ Escanea códigos de barras físicos en la app</li>
                                <li>✨ Completa tu perfil al 100%</li>
                                <li>✨ Invita a otros papás (+100 pts)</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Rewards;
