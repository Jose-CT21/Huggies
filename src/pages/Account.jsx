import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import './Account.css';
import { formatPrice } from '../utils/formatPrice';
import { calculateAgeInMonths } from '../utils/calculateAge';
import { getSkinTypeLabel } from '../utils/labels';

const Account = () => {
    const { isAuthenticated, user, logout, childData, updateChildData } = useAuth();
    const { cartItemsCount, cartTotal, toggleCart, pointsBalance } = useCart();
    const navigate = useNavigate();

    // Determine rewards level
    let level = 'Bronce';
    if (pointsBalance > 500) level = 'Plata';
    if (pointsBalance > 1000) level = 'Oro';
    if (pointsBalance > 2000) level = 'Platino';
    
    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(() => childData && !childData.skipped ? (childData.name || '') : '');
    const [editBirthDate, setEditBirthDate] = useState(() => childData && !childData.skipped ? (childData.birthDate || '') : '');
    const [editDiaperSize, setEditDiaperSize] = useState(() => childData && !childData.skipped ? (childData.diaperSize || 'M') : 'M');
    const [editSkinType, setEditSkinType] = useState(() => childData && !childData.skipped ? (childData.skinType || 'normal') : 'normal');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleStartEditing = () => {
        if (childData && !childData.skipped) {
            setEditName(childData.name || '');
            setEditBirthDate(childData.birthDate || '');
            setEditDiaperSize(childData.diaperSize || 'M');
            setEditSkinType(childData.skinType || 'normal');
        }
        setIsEditing(true);
    };

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        const ageInMonths = calculateAgeInMonths(editBirthDate);

        updateChildData({
            name: editName.trim() || 'mi bebé',
            birthDate: editBirthDate,
            ageInMonths,
            diaperSize: editDiaperSize,
            skinType: editSkinType,
            skipped: false, // ensure skipped is false now that we filled it
            lastUpdated: new Date().toISOString()
        });

        setIsEditing(false);
    };

    const handleStartOnboarding = () => {
        // Trigger onboarding modal
        updateChildData(null);
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
                    
                    {/* Child Profile Section */}
                    <section className="account-card delay-100 animate-slide-up">
                        <h2 className="account-card__title">Información del Bebé</h2>
                        <div className="account-card__content">
                            {isEditing ? (
                                <form onSubmit={handleSave} className="account-edit-form">
                                    <div className="form-group-account">
                                        <label htmlFor="edit-name">Nombre del Bebé</label>
                                        <input 
                                            type="text" 
                                            id="edit-name"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            placeholder="Ej. Mateo"
                                            required
                                        />
                                    </div>
                                    <div className="form-group-account">
                                        <label htmlFor="edit-birthdate">Fecha de Nacimiento</label>
                                        <input 
                                            type="date" 
                                            id="edit-birthdate"
                                            value={editBirthDate}
                                            onChange={(e) => setEditBirthDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-account">
                                        <label htmlFor="edit-diaper">Talla de Pañal</label>
                                        <select 
                                            id="edit-diaper" 
                                            value={editDiaperSize}
                                            onChange={(e) => setEditDiaperSize(e.target.value)}
                                        >
                                            <option value="RN">RN (Recién Nacido - hasta 4 kg)</option>
                                            <option value="P">P (Pequeño - 3 a 6 kg)</option>
                                            <option value="M">M (Mediano - 5 a 9 kg)</option>
                                            <option value="G">G (Grande - 9 a 13 kg)</option>
                                            <option value="XG">XG (Extra Grande - 12 a 15 kg)</option>
                                            <option value="XXG">XXG (Jumbo - más de 14 kg)</option>
                                        </select>
                                    </div>
                                    <div className="form-group-account">
                                        <label htmlFor="edit-skin">Tipo de Piel</label>
                                        <select 
                                            id="edit-skin" 
                                            value={editSkinType}
                                            onChange={(e) => setEditSkinType(e.target.value)}
                                        >
                                            <option value="normal">Normal</option>
                                            <option value="sensitive">Sensible</option>
                                            <option value="atopic">Muy Sensible / Atópica</option>
                                        </select>
                                    </div>
                                    <div className="edit-form-buttons">
                                        <Button variant="primary" size="small" type="submit">Guardar</Button>
                                        <Button variant="outline" size="small" type="button" onClick={() => setIsEditing(false)}>Cancelar</Button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    {(!childData || childData.skipped) ? (
                                        <div className="no-child-data">
                                            <p>No tienes información registrada del bebé para personalizar tus recomendaciones.</p>
                                            <Button variant="primary" size="small" onClick={handleStartOnboarding} className="mt-md">
                                                Registrar Bebé
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="info-row">
                                                <span>Nombre</span>
                                                <strong>{childData.name}</strong>
                                            </div>
                                            <div className="info-row">
                                                <span>Fecha de nacimiento</span>
                                                <strong>{childData.birthDate}</strong>
                                            </div>
                                            <div className="info-row">
                                                <span>Edad</span>
                                                <strong>
                                                    {childData.ageInMonths !== null && (
                                                        childData.ageInMonths < 0 
                                                            ? 'En camino (Gestación)' 
                                                            : `${childData.ageInMonths} ${childData.ageInMonths === 1 ? 'mes' : 'meses'}`
                                                    )}
                                                </strong>
                                            </div>
                                            <div className="info-row">
                                                <span>Talla actual</span>
                                                <strong>Etapa {childData.diaperSize}</strong>
                                            </div>
                                            <div className="info-row">
                                                <span>Sensibilidad de Piel</span>
                                                <strong>{getSkinTypeLabel(childData.skinType)}</strong>
                                            </div>
                                            <Button variant="outline" size="small" className="mt-md" onClick={handleStartEditing}>
                                                Editar Información
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </section>

                    {/* Mi Carrito Section */}
                    <section className="account-card delay-150 animate-slide-up">
                        <h2 className="account-card__title">Mi Carrito</h2>
                        <div className="account-card__content">
                            <div className="account-cart-summary">
                                <div className="account-cart-stats">
                                    <div className="stat-box">
                                        <span className="stat-label">Artículos</span>
                                        <span className="stat-value">{cartItemsCount}</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="stat-label">Subtotal</span>
                                        <span className="stat-value">{formatPrice(cartTotal)}</span>
                                    </div>
                                </div>
                                <Button variant="primary" size="small" onClick={toggleCart} className="w-full mt-md">
                                    {cartItemsCount > 0 ? 'Ver Carrito y Pagar' : 'Ver Carrito'}
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Huggies Rewards Section */}
                    <section className="account-card delay-150 animate-slide-up">
                        <h2 className="account-card__title">Huggies Rewards</h2>
                        <div className="account-card__content">
                            <div className="account-rewards-summary">
                                <div className="rewards-badge-large">⭐</div>
                                <div className="rewards-info">
                                    <h3 className="rewards-points">{pointsBalance} pts</h3>
                                    <p className="rewards-level">Nivel {level}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="small" onClick={() => navigate('/recompensas')} className="w-full mt-md">
                                Ver Recompensas
                            </Button>
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
                                <p className="order-item__price">{formatPrice(8500)}</p>
                            </div>
                            <div className="order-item">
                                <div className="order-item__header">
                                    <span className="order-item__date">28 Feb 2026</span>
                                    <span className="order-item__status delivered">Entregado</span>
                                </div>
                                <p className="order-item__desc">1x Toallitas Húmedas Cuidado Puro (4 paq)</p>
                                <p className="order-item__price">{formatPrice(2200)}</p>
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
