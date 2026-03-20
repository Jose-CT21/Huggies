import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import CartIcon from '../ui/icons/CartIcon';
import StarIcon from '../ui/icons/StarIcon';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const { cartItems, pointsBalance, toggleCart } = useCart();

    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
                        {isAuthenticated ? (
                            <div className="rewards-badge" title="Tus puntos Huggies Rewards" onClick={() => navigate('/#recompensas')}>
                                <StarIcon size={18} /> {pointsBalance} pts
                            </div>
                        ) : (
                            <div className="rewards-badge" title="Inicia sesión para ver tus puntos" onClick={() => navigate('/login')}>
                                <StarIcon size={18} /> ¡Únete y Gana!
                            </div>
                        )}
                        
                        <button className="cart-btn" onClick={toggleCart} title="Ver carrito">
                            <CartIcon size={26} />
                            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
                        </button>
                        
                        {isAuthenticated ? (
                            <Button variant="outline" size="small" onClick={() => { logout(); closeMobileMenu(); }}>Salir</Button>
                        ) : (
                            <Button variant="outline" size="small" onClick={() => { navigate('/login'); closeMobileMenu(); }}>Ingresar</Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
