import React from 'react';
import Button from '../ui/Button';
import './RewardsPromo.css';

const RewardsPromo = () => {
    return (
        <section id="recompensas" className="rewards">
            <div className="container">
                <div className="rewards__inner">
                    <div className="rewards__content">
                        <h2 className="rewards__title">Huggies Rewards+</h2>
                        <p className="rewards__description">
                            Gana puntos con cada compra y canjéalos por productos gratis, tarjetas de regalo y experiencias exclusivas para ti y tu bebé.
                        </p>
                        <ul className="rewards__list">
                            <li>✓ Escanea tus recibos</li>
                            <li>✓ Acumula puntos rápidamente</li>
                            <li>✓ Disfruta recompensas exclusivas</li>
                        </ul>
                        <div className="rewards__actions">
                            <Button variant="primary" size="large">Unirse Gratis</Button>
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
