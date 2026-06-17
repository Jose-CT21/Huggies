import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import './Footer.css';

const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const InstagramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const YoutubeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);

const Footer = () => {
    const [openSections, setOpenSections] = useState({
        products: false,
        about: false,
        help: false,
        legal: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <footer className="footer-accordion">
            <div className="footer-header">
                <h2 className="footer-logo">HUGGIES</h2>
            </div>
            
            <div className="accordion-container">
                {/* Productos */}
                <div className="accordion-item">
                    <button className="accordion-title" onClick={() => toggleSection('products')}>
                        Todos los Productos
                        {openSections.products ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                    {openSections.products && (
                        <div className="accordion-content">
                            <Link to="/products">Pañales</Link>
                            <Link to="/products">Toallitas Húmedas</Link>
                            <Link to="/products">Pants</Link>
                        </div>
                    )}
                </div>

                {/* Sobre Huggies */}
                <div className="accordion-item">
                    <button className="accordion-title" onClick={() => toggleSection('about')}>
                        Sobre Huggies
                        {openSections.about ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                    {openSections.about && (
                        <div className="accordion-content">
                            <a href="#">Nuestra Historia</a>
                            <a href="#">Compromiso</a>
                        </div>
                    )}
                </div>

                {/* Necesito ayuda */}
                <div className="accordion-item">
                    <button className="accordion-title" onClick={() => toggleSection('help')}>
                        Necesito ayuda
                        {openSections.help ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                    {openSections.help && (
                        <div className="accordion-content">
                            <a href="#">Preguntas Frecuentes</a>
                            <a href="#">Contáctanos</a>
                        </div>
                    )}
                </div>

                {/* Legal */}
                <div className="accordion-item">
                    <button className="accordion-title" onClick={() => toggleSection('legal')}>
                        Legal
                        {openSections.legal ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                    {openSections.legal && (
                        <div className="accordion-content">
                            <a href="#">Términos y Condiciones</a>
                            <a href="#">Política de Privacidad</a>
                        </div>
                    )}
                </div>
            </div>

            <div className="footer-social">
                <h4>Redes Sociales</h4>
                <div className="social-icons">
                    <a href="https://www.facebook.com/huggiescentroamerica/" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                    <a href="https://www.instagram.com/_huggiescr_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                    <a href="https://youtube.com/@huggies?si=pApVc7Y35ToNqk3h" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
