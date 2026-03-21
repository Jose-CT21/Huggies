import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import './Account.css';

const Account = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="account-page">
            <div className="container">
                <header className="account-header animate-slide-up">
                    <div className="account-avatar">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h1 className="account-title">Hola, {user?.name}</h1>
                        <p className="account-subtitle">{user?.email}</p>
                    </div>
                </header>

                <div className="account-sections">
                    <section className="account-card delay-100 animate-slide-up">
                        <h2 className="account-card__title">Información del Bebé</h2>
                        <div className="account-card__content">
                            <div className="info-row">
                                <span>Nombre</span>
                                <strong>Martín</strong>
                            </div>
                            <div className="info-row">
                                <span>Fecha de nacimiento</span>
                                <strong>15 Nov 2025</strong>
                            </div>
                            <div className="info-row">
                                <span>Talla actual</span>
                                <strong>Etapa 2 (M)</strong>
                            </div>
                            <Button variant="outline" size="small" className="mt-md">Editar Información</Button>
                        </div>
                    </section>

                    <section className="account-card delay-200 animate-slide-up">
                        <h2 className="account-card__title">Historial de Pedidos</h2>
                        <div className="account-card__content">
                            <div className="order-item">
                                <div className="order-item__header">
                                    <span className="order-item__date">14 Mar 2026</span>
                                    <span className="order-item__status delivered">Entregado</span>
                                </div>
                                <p className="order-item__desc">2x Paquete Huggies Supreme Etapa 2</p>
                                <p className="order-item__price">$850.00</p>
                            </div>
                            <div className="order-item">
                                <div className="order-item__header">
                                    <span className="order-item__date">28 Feb 2026</span>
                                    <span className="order-item__status delivered">Entregado</span>
                                </div>
                                <p className="order-item__desc">1x Toallitas Húmedas Cuidado Puro (4 paq)</p>
                                <p className="order-item__price">$220.00</p>
                            </div>
                            <Button variant="outline" size="small" className="mt-md">Ver todos los pedidos</Button>
                        </div>
                    </section>

                    <section className="account-card delay-300 animate-slide-up">
                        <h2 className="account-card__title">Preferencias</h2>
                        <div className="account-card__content">
                            <label className="pref-toggle">
                                <span>Recibir correos promocionales</span>
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                            <label className="pref-toggle">
                                <span>Notificaciones de envío por SMS</span>
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                            <label className="pref-toggle">
                                <span>Recordatorio de compra de pañales</span>
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </section>
                </div>

                <div className="account-actions delay-400 animate-slide-up">
                    <Button variant="outline" onClick={handleLogout} className="logout-btn">
                        Cerrar Sesión
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Account;
