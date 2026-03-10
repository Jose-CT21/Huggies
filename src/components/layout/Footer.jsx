import React from 'react';
import './Footer.css';

const Footer = () => {
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
                        <a href="#">Pañales Recién Nacido</a>
                        <a href="#">Pañales Activos</a>
                        <a href="#">Toallitas Húmedas</a>
                        <a href="#">Pantalones Entrenadores</a>
                    </div>
                    <div className="footer__column">
                        <h3>Descubre</h3>
                        <a href="#">Acerca de Huggies</a>
                        <a href="#">Recompensas</a>
                        <a href="#">Calculadora de Pañales</a>
                        <a href="#">Promociones</a>
                    </div>
                    <div className="footer__column">
                        <h3>Soporte</h3>
                        <a href="#">Contáctanos</a>
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
