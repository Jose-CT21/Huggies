import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import './AppTutorial.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Play, Users, User, Heart, ArrowRight } from 'lucide-react';

const TUTORIAL_STEPS = [
    {
        title: "El Inicio",
        icon: <Home size={22} color="#0ea5e9" />,
        desc: "Aquí verás las Ofertas, Los Más Comprados y la información de la etapa de tu bebé. ¡Desliza los productos con tu dedo!",
        route: "/"
    },
    {
        title: "Productos y Carrito",
        icon: <ShoppingBag size={22} color="#f59e0b" />,
        desc: "Encuentra fácilmente los pañales ideales. Aquí tienes acceso rápido a tu carrito de compras flotante.",
        route: "/products"
    },
    {
        title: "Descubre 'Hugs'",
        icon: <Play size={22} color="#ef4444" />,
        desc: "Nuestra nueva sección de videos cortos. Desliza hacia arriba para ver tips rápidos. Toca 2 veces para dejar tu me gusta.",
        route: "/hugs"
    },
    {
        title: "Comunidad",
        icon: <Users size={22} color="#10b981" />,
        desc: "Conecta con otros padres, lee artículos detallados escritos por especialistas y comparte experiencias.",
        route: "/comunidad"
    },
    {
        title: "Tu Cuenta y Rewards",
        icon: <User size={22} color="#8b5cf6" />,
        desc: "Aquí administras tu perfil, tus compras y ves tus puntos acumulados en Huggies Rewards. ¡Todo en un solo lugar!",
        route: "/cuenta"
    }
];

const AppTutorial = () => {
    const { childData, hasSeenTutorial, completeTutorial } = useAuth();
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Show tutorial only if they completed onboarding but haven't seen tutorial
        if (childData && !hasSeenTutorial) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [childData, hasSeenTutorial]);

    // Force navigation if they try to leave the tutorial path while it's active
    useEffect(() => {
        if (isVisible) {
            const currentExpectedRoute = TUTORIAL_STEPS[step].route;
            if (location.pathname !== currentExpectedRoute) {
                navigate(currentExpectedRoute);
            }
        }
    }, [isVisible, step, navigate, location.pathname]);

    if (!isVisible) return null;

    const handleNext = () => {
        if (step < TUTORIAL_STEPS.length - 1) {
            const nextStep = step + 1;
            setStep(nextStep);
            navigate(TUTORIAL_STEPS[nextStep].route);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        setIsVisible(false);
        completeTutorial();
        navigate('/'); // Ensure they are on Home after tutorial
    };

    const currentSlide = TUTORIAL_STEPS[step];

    return (
        <div className="tutorial-floating-box">
            <div className="tutorial-floating-content">
                <h3 className="tutorial-float-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {currentSlide.icon}
                    {currentSlide.title}
                </h3>
                <p className="tutorial-float-desc">{currentSlide.desc}</p>
                
                <div className="tutorial-float-footer">
                    <div className="tutorial-float-dots">
                        {TUTORIAL_STEPS.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`tutorial-float-dot ${idx === step ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    <div className="tutorial-float-actions">
                        <button className="tutorial-float-skip" onClick={handleFinish}>
                            Saltar Tour
                        </button>
                        <Button variant="primary" onClick={handleNext} className="tutorial-float-next" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {step === TUTORIAL_STEPS.length - 1 ? '¡Finalizar!' : <>Siguiente <ArrowRight size={16} /></>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppTutorial;
