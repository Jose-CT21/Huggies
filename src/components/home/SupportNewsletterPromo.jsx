import React from 'react';
import './SupportNewsletterPromo.css';

const SupportNewsletterPromo = () => {
    return (
        <div className="support-newsletter">
            <div className="support-section">
                <div className="support-icon">
                    <span>H</span>
                </div>
                <h2>Apoyo para cada etapa</h2>
                <p>
                    Desde el embarazo hasta que tu bebé deja los pañales, estamos aquí para ayudarte a enfrentar cada etapa
                    con confianza. Descubre semana a semana cómo avanza tu embarazo y aprovecha nuestras herramientas útiles: 
                    elige el nombre perfecto, predice el sexo de tu bebé, calcula tu fecha probable de parto o averigua 
                    cuántos pañales vas a necesitar.
                </p>
            </div>
            <div className="newsletter-section">
                <div className="newsletter-content">
                    <h2 className="huggies-brand">HUGGIES</h2>
                    <p>Regístrate y recibe descuentos y contenidos en tu correo electrónico.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Ingresa tu correo electrónico" required />
                        <button type="submit">Suscribirme &rarr;</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SupportNewsletterPromo;
