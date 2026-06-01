import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const handleContactClick = (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-huggies-chat'));
    };

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <h2 className="footer__logo">Huggies</h2>
                    <p>Acompañando cada paso del desarrollo de tu bebé con cuidado, suavidad y protección.</p>
                </div>

                <div className="footer__links">
                    <div className="footer__column">
                        <h3>Productos</h3>
                        <Link to="/products">Pañales Recién Nacido</Link>
                        <Link to="/products">Pañales Activos</Link>
                        <Link to="/products">Toallitas Húmedas</Link>
                        <Link to="/products">Pantalones Entrenadores</Link>
                    </div>
                    <div className="footer__column">
                        <h3>Descubre</h3>
                        <a href="#">Acerca de Huggies</a>
                        <Link to="/recompensas">Recompensas</Link>
                        <Link to="/donde-comprar">Puntos de Venta</Link>
                        <a href="#">Promociones</a>
                    </div>
                    <div className="footer__column">
                        <h3>Soporte</h3>
                        <a href="#contact" onClick={handleContactClick}>Contáctanos (Chat)</a>
                        <a href="#">Preguntas Frecuentes</a>
                        <a href="#">Privacidad</a>
                        <a href="#">Términos y Condiciones</a>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; {new Date().getFullYear()} Huggies. Todos los derechos reservados. Rediseño Conceptual.</p>
            </div>
        </footer>
    );
};

export default Footer;
