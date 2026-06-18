import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './UserRegistrationPromo.css';
import { Star } from 'lucide-react';

const UserRegistrationPromo = () => {
    const navigate = useNavigate();

    return (
        <div className="registration-promo">
            <div className="promo-content">
                <h3 className="promo-title">Únete a la Familia Huggies</h3>
                <p className="promo-desc">
                    Crea tu cuenta gratuita para acceder a la Comunidad, guardar artículos, y empezar a acumular <Star size={16} color="#eab308" fill="#eab308" style={{display: 'inline', verticalAlign: 'text-bottom'}}/> Huggies Rewards con tus compras.
                </p>
                <div className="promo-actions">
                    <Button variant="primary" onClick={() => navigate('/login')}>
                        Crear Cuenta
                    </Button>
                    <button className="promo-login-link" onClick={() => navigate('/login')}>
                        Ya tengo cuenta
                    </button>
                </div>
            </div>
            <div className="promo-bg-icon">
                <Star size={120} color="#ffffff" fill="#ffffff" strokeWidth={1} />
            </div>
        </div>
    );
};

export default UserRegistrationPromo;
