import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <div className="navbar__logo">
                    <Link to="/" className="logo-text" style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>Huggies</Link>
                </div>

                <button className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar__menu-container ${mobileMenuOpen ? 'active' : ''}`}>
                    <div className="navbar__links">
                        <Link to="/products" onClick={closeMobileMenu}>Productos</Link>
                        <a href="/#beneficios" onClick={closeMobileMenu}>Beneficios</a>
                        <a href="/#recompensas" onClick={closeMobileMenu}>Recompensas</a>
                        <Link to="/comunidad" onClick={closeMobileMenu}>Comunidad</Link>
                    </div>

                    <div className="navbar__actions">
                        <Button variant="outline" size="small" onClick={() => { navigate('/login'); closeMobileMenu(); }}>Ingresar</Button>
                        <Button variant="primary" size="small" onClick={() => { navigate('/products'); closeMobileMenu(); }}>Comprar</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
