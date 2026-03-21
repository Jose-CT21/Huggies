import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './BottomNav.css';

const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const BoxIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const CommunityIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const CartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { cartItems, toggleCart, isCartOpen, setIsCartOpen } = useCart();

    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const closeCart = () => {
        if (isCartOpen) setIsCartOpen(false);
    };

    const isActive = (path) => {
        if (isCartOpen) return false;
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const isRewardsActive = !isCartOpen && location.pathname.startsWith('/recompensas');

    return (
        <nav className="bottom-nav">
            <Link to="/" onClick={closeCart} className={`bottom-nav__item ${isActive('/') && !isRewardsActive ? 'active' : ''}`}>
                <span className="bottom-nav__icon"><HomeIcon /></span>
                <span className="bottom-nav__label">Inicio</span>
            </Link>

            <Link to="/products" onClick={closeCart} className={`bottom-nav__item ${isActive('/products') ? 'active' : ''}`}>
                <span className="bottom-nav__icon"><BoxIcon /></span>
                <span className="bottom-nav__label">Productos</span>
            </Link>

            <button className={`bottom-nav__item bottom-nav__cart-btn ${isCartOpen ? 'active' : ''}`} onClick={toggleCart}>
                <span className="bottom-nav__icon bottom-nav__cart-icon-wrap">
                    <CartIcon />
                    {cartItemsCount > 0 && (
                        <span className="bottom-nav__cart-badge">{cartItemsCount}</span>
                    )}
                </span>
                <span className="bottom-nav__label">Carrito</span>
            </button>

            <Link to="/recompensas" onClick={closeCart} className={`bottom-nav__item ${isRewardsActive ? 'active' : ''}`}>
                <span className="bottom-nav__icon"><StarIcon /></span>
                <span className="bottom-nav__label">Rewards</span>
            </Link>

            <Link to="/comunidad" onClick={closeCart} className={`bottom-nav__item ${isActive('/comunidad') ? 'active' : ''}`}>
                <span className="bottom-nav__icon"><CommunityIcon /></span>
                <span className="bottom-nav__label">Comunidad</span>
            </Link>

            <Link
                to={isAuthenticated ? '/cuenta' : '/login'}
                onClick={closeCart}
                className={`bottom-nav__item ${isActive('/cuenta') || isActive('/login') ? 'active' : ''}`}
            >
                <span className="bottom-nav__icon"><UserIcon /></span>
                <span className="bottom-nav__label">{isAuthenticated ? 'Cuenta' : 'Ingresar'}</span>
            </Link>
        </nav>
    );
};

export default BottomNav;
