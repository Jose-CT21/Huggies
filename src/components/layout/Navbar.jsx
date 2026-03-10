import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <div className="navbar__logo">
                    <span className="logo-text">Huggies</span>
                </div>

                <div className="navbar__links">
                    <a href="#productos">Productos</a>
                    <a href="#beneficios">Beneficios</a>
                    <a href="#recompensas">Recompensas</a>
                    <a href="#articulos">Artículos</a>
                </div>

                <div className="navbar__actions">
                    <Button variant="outline" size="small">Ingresar</Button>
                    <Button variant="primary" size="small">Comprar</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
