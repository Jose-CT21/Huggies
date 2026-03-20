import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import './RewardsPromo.css';

const RewardsPromo = () => {
    const navigate = useNavigate();
    const { pointsBalance } = useCart();
    return (
        <section id="recompensas" className="rewards">
            <div className="container">
                <div className="rewards__inner">
                    <div className="rewards__content">
                        <h2 className="rewards__title">Huggies Rewards+</h2>
                        <div className="rewards__balance-badge">
                            Tienes <strong>{pointsBalance} puntos</strong> disponibles
                        </div>
                        <p className="rewards__description">
                            Gana puntos con cada compra y canjéalos por productos gratis, tarjetas de regalo y experiencias exclusivas para ti y tu bebé.
                        </p>
                        <ul className="rewards__list">
                            <li>✓ Escanea tus recibos</li>
                            <li>✓ Acumula puntos rápidamente</li>
                            <li>✓ Disfruta recompensas exclusivas</li>
                        </ul>
                        <div className="rewards__actions">
                            <Button variant="primary" size="large" onClick={() => navigate('/products')}>Comprar y Ganar Puntos</Button>
                            <Button variant="outline" size="large" className="border-white text-white">Saber Más</Button>
                        </div>
                    </div>
                    <div className="rewards__image-container">
                        <img
                            src="/rewards_app.png"
                            alt="Huggies Rewards App"
                            className="rewards__image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RewardsPromo;
