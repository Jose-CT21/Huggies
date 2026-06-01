import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { huggiesCatalog } from '../../data/huggiesCatalog';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './PersonalizedRecommendations.css';

const MySwal = withReactContent(Swal);

/** Formatea un precio en colones costarricenses */
const formatPrice = (amount) => `₡${amount.toLocaleString('es-CR')}`;

// Stages definition
const getDevelopmentalStage = (months) => {
    if (months === null || months === undefined) return null;
    if (months < 0) {
        return {
            id: 'prenatal',
            title: '¡Bebé en camino! 🤰',
            subtitle: 'Preparándote para la llegada',
            desc: 'Estás en una hermosa etapa de preparación. Tu cuerpo y tu bebé se están alistando para conocerse.',
            milestones: [
                'Preparar el bolso de la pañalera con prendas básicas',
                'Elegir pañales especiales para recién nacidos (RN)',
                'Organizar el cuarto y espacio de sueño seguro',
                'Leer sobre posiciones y técnicas de lactancia materna'
            ],
            tips: 'Aprovecha este tiempo para descansar y cuidar tu piel. Las estrías y la resequedad son comunes, mantente muy hidratada.',
            diaperSize: 'RN'
        };
    }
    if (months === 0) {
        return {
            id: 'newborn',
            title: 'Bienvenido al Mundo 👶',
            subtitle: 'Recién Nacido (0 meses)',
            desc: 'Tu bebé se está adaptando al ambiente exterior. Su piel es extremadamente delgada y sensible.',
            milestones: [
                'Mantiene las manos cerradas en puño la mayor parte del tiempo',
                'Reacciona a sonidos fuertes parpadeando o asustándose',
                'Sigue objetos en movimiento lento con la mirada por lapsos cortos',
                'Duerme entre 16 y 18 horas divididas en periodos cortos'
            ],
            tips: 'La piel del recién nacido es 5 veces más fina que la de un adulto. Te recomendamos usar toallitas húmedas con fibras naturales libres de alcohol y fragancias.',
            diaperSize: 'RN'
        };
    }
    if (months >= 1 && months <= 3) {
        return {
            id: '1-3m',
            title: 'Sonrisas y Descubrimiento ✨',
            subtitle: 'Bebé de 1 a 3 meses',
            desc: '¡Comienzan las interacciones! Tu bebé está más alerta y empieza a regalarte sus primeras sonrisas sociales.',
            milestones: [
                'Sonríe de forma social cuando le hablas o juegas',
                'Sostiene la cabeza por unos segundos al estar acostado boca abajo (tummy time)',
                'Empieza a balbucear y a hacer sonidos de arrullo ("uuh", "aah")',
                'Abre las manos y trata de llevarse los dedos a la boca'
            ],
            tips: 'Dedica unos minutos al día a ponerlo boca abajo sobre una manta suave. Esto fortalecerá los músculos de su cuello y espalda.',
            diaperSize: 'P'
        };
    }
    if (months >= 4 && months <= 6) {
        return {
            id: '4-6m',
            title: 'Exploración y Movimiento 🧩',
            subtitle: 'Bebé de 4 a 6 meses',
            desc: 'Tu bebé está descubriendo la fuerza de sus extremidades y podría prepararse para los primeros sólidos.',
            milestones: [
                'Se da la vuelta por sí mismo (rueda boca abajo y boca arriba)',
                'Intenta agarrar objetos que están a su alcance y se los lleva a la boca',
                'Se sostiene sentado con ayuda o apoyo de almohadas',
                'Responde activamente a su propio nombre emitiendo sonidos'
            ],
            tips: 'Al iniciar la alimentación complementaria (alrededor de los 6 meses), las deposiciones del bebé cambiarán de consistencia. Elige pañales con barreras reforzadas.',
            diaperSize: 'M'
        };
    }
    if (months >= 7 && months <= 9) {
        return {
            id: '7-9m',
            title: 'Independencia y Curiosidad 🏃',
            subtitle: 'Bebé de 7 a 9 meses',
            desc: '¡Tu bebé ya se sienta solo! Su visión mejora notablemente y empieza a explorar su espacio de forma más activa.',
            milestones: [
                'Se mantiene sentado sin apoyo de forma estable',
                'Pasa objetos de una mano a la otra y los golpea entre sí',
                'Comienza a arrastrarse o a hacer intentos de gateo',
                'Reconoce rostros familiares y muestra timidez ante extraños'
            ],
            tips: 'Haz de tu hogar un espacio seguro. Asegura esquinas, cables y enchufes, ya que en cualquier momento tu bebé comenzará a desplazarse solo.',
            diaperSize: 'G'
        };
    }
    if (months >= 10 && months <= 12) {
        return {
            id: '10-12m',
            title: 'Primeros Pasos y Palabras 🌟',
            subtitle: 'Bebé de 10 a 12 meses',
            desc: '¡Está por cumplir su primer año! Se pone de pie sosteniéndose de muebles e intenta comunicarse más.',
            milestones: [
                'Se pone de pie por sí solo apoyándose de superficies',
                'Usa el agarre de "pinza" (dedo índice y pulgar) para tomar comida pequeña',
                'Dice "mamá" o "papá" de forma intencional para llamar tu atención',
                'Entiende instrucciones simples de una sola palabra como "dame" o "no"'
            ],
            tips: 'Promueve su autonomía dejándole comer alimentos blandos en trozos pequeños con sus propias manitas. Esto ejercita su motricidad fina.',
            diaperSize: 'G'
        };
    }
    // 12+ months
    return {
        id: '12m+',
        title: 'Pequeño Gran Explorador 👣',
        subtitle: 'Bebé de 12+ meses',
        desc: '¡Tu bebé ya camina solo o está por lograrlo! Su energía es inagotable y explora todo a su paso.',
        milestones: [
            'Camina de forma independiente o sosteniéndose de una mano',
            'Imita gestos y tareas cotidianas simples que te ve hacer',
            'Puede apilar de 2 a 3 bloques de construcción',
            'Dice entre 3 y 6 palabras con significado claro'
        ],
        tips: 'Con tanta actividad, cambiar pañales con cintas adhesivas puede ser difícil. Te recomendamos cambiar a pañales tipo Pants auto-ajustables que se suben como ropa interior.',
        diaperSize: 'XG'
    };
};

const PersonalizedRecommendations = () => {
    const { childData, updateChildData } = useAuth();
    const { addToCart } = useCart();
    const [checkedMilestones, setCheckedMilestones] = useState({});
    const [feedback, setFeedback] = useState(null);

    // Load feedback on mount or when child changes
    useEffect(() => {
        if (childData && childData.name) {
            const stored = localStorage.getItem(`huggies_feedback_landing_${childData.name}`);
            if (stored) setFeedback(stored);
            else setFeedback(null);
        }
    }, [childData]);

    const handleFeedback = (val) => {
        if (!childData) return;
        setFeedback(val);
        localStorage.setItem(`huggies_feedback_landing_${childData.name}`, val);
    };

    // Load checked milestones on mount or when child changes
    useEffect(() => {
        if (childData && childData.name) {
            const savedMilestones = localStorage.getItem(`huggies_milestones_${childData.name}`);
            if (savedMilestones) {
                try {
                    setCheckedMilestones(JSON.parse(savedMilestones));
                } catch (e) {
                    console.error('Error parsing milestones', e);
                }
            } else {
                setCheckedMilestones({});
            }
        }
    }, [childData]);

    const handleMilestoneChange = (milestoneText) => {
        if (!childData) return;
        const updated = {
            ...checkedMilestones,
            [milestoneText]: !checkedMilestones[milestoneText]
        };
        setCheckedMilestones(updated);
        localStorage.setItem(`huggies_milestones_${childData.name}`, JSON.stringify(updated));
    };

    const handleRestartOnboarding = () => {
        // Clear child data to trigger the onboarding wizard again
        updateChildData(null);
    };

    const handleProductClick = (product) => {
        MySwal.fire({
            title: `<h3 style="margin:0; font-size: 1.5rem; color: #1F2937;">${product.name}</h3>`,
            html: `
                <div style="text-align: left; padding: 10px 0;">
                    <div style="text-align: center; margin-bottom: 20px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E5E7EB;">
                        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 200px; object-fit: contain;" />
                    </div>
                    <div style="display: flex; gap: 8px; margin-bottom: 15px; flex-wrap: wrap;">
                        <span style="background: rgba(2, 136, 209, 0.1); color: #0288D1; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${product.type}</span>
                        ${product.size ? `<span style="background: rgba(107, 114, 128, 0.1); color: #4B5563; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">Talla ${product.size}</span>` : ''}
                        ${product.weightRange ? `<span style="background: rgba(107, 114, 128, 0.1); color: #4B5563; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${product.weightRange}</span>` : ''}
                    </div>
                    <p style="color: #4B5563; font-size: 0.95rem; line-height: 1.5; margin-bottom: 15px;">${product.longDescription || product.description}</p>
                    ${product.features ? `<ul style="margin-top: 10px; padding-left: 20px; color: #4B5563; font-size: 0.9rem;">${product.features.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}</ul>` : ''}
                    <div style="font-size: 1.4rem; font-weight: 800; color: #1F2937; display: flex; align-items: center; gap: 10px; margin-top: 15px;">
                        ${product.discountPrice ? 
                            `<span style="color: #D32F2F;">₡${product.discountPrice.toLocaleString('es-CR')}</span>
                             <span style="text-decoration: line-through; color: #9CA3AF; font-size: 1rem; font-weight: 500;">₡${product.price.toLocaleString('es-CR')}</span>` 
                            : `<span>₡${product.price.toLocaleString('es-CR')}</span>`}
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Agregar al Carrito',
            cancelButtonText: 'Cerrar',
            confirmButtonColor: '#D32F2F',
            cancelButtonColor: '#9CA3AF',
            customClass: {
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
                popup: 'swal-custom-popup'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                addToCart(product);
                MySwal.fire({
                    title: '¡Agregado!',
                    text: 'El producto se ha añadido a tu carrito.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // If no onboarding data exists OR if onboarding was skipped, show invitation
    if (!childData || childData.skipped) {
        return (
            <section className="recommendations-promo container animate-slide-up">
                <div className="promo-card">
                    <div className="promo-illustration">👶</div>
                    <div className="promo-content">
                        <span className="promo-badge">EXCLUSIVO HUGGIES</span>
                        <h2>Obtén recomendaciones personalizadas para tu bebé</h2>
                        <p>
                            Al registrar datos no sensibles de tu pequeño, como su edad y talla actual, te mostraremos consejos de desarrollo, hitos mes a mes y los pañales que mejor protegen su piel. ¡Es rápido y 100% seguro!
                        </p>
                        <Button variant="primary" size="large" onClick={handleRestartOnboarding}>
                            Registrar a mi Bebé
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    const { name, ageInMonths, diaperSize, skinType, interests } = childData;
    const stage = getDevelopmentalStage(ageInMonths);

    if (!stage) return null;

    // Filter recommended products based on diaper size or skinType
    // 1. Primary diaper of their size
    // 2. Extra Wipes (especially supreme or daily wipes depending on skin sensitivity)
    const recommendedProducts = huggiesCatalog.filter(product => {
        // If sensitive skin, prioritize Supreme Care diaper of their size OR Supreme wipes
        if (skinType === 'sensitive' || skinType === 'atopic') {
            return (
                (product.size === diaperSize && product.name.includes('Supreme')) ||
                (product.type === 'Toallitas' && product.name.includes('Supreme'))
            );
        }
        
        // For 12+ months, prioritize pants if they have G or XG sizes
        if (ageInMonths && ageInMonths >= 12 && product.type === 'Pants') {
            return true;
        }

        // Default: match diaper size OR show universal wipes
        return product.size === diaperSize || (product.type === 'Toallitas' && product.size === null);
    }).slice(0, 3); // show top 3 recommendations

    return (
        <section className="personalized-recommendations container animate-slide-up">
            <header className="rec-header">
                <div className="rec-title-area">
                    <span className="rec-badge">Tu espacio personalizado</span>
                    <h2>El desarrollo de <strong>{name}</strong></h2>
                    <p className="rec-subtitle">
                        {ageInMonths !== null ? (
                            ageInMonths < 0 
                                ? '¡En camino! Tu dulce espera está siendo acompañada por Huggies.'
                                : `Tiene ${ageInMonths} ${ageInMonths === 1 ? 'mes' : 'meses'} · Etapa actual: ${stage.subtitle}`
                        ) : 'Edad no configurada'}
                    </p>
                </div>
                <div className="rec-header-actions">
                    <Button variant="outline" size="small" onClick={handleRestartOnboarding}>
                        Cambiar datos / Reiniciar
                    </Button>
                </div>
            </header>

            <div className="rec-grid">
                
                {/* 1. Stage Info & Milestone Tracker */}
                <div className="rec-column rec-card-growth">
                    <Card hoverable={false} className="card-custom-inner">
                        <div className="card-stage-header">
                            <span className="stage-icon-big">🎒</span>
                            <div>
                                <h3 className="stage-title">{stage.title}</h3>
                                <p className="stage-desc">{stage.desc}</p>
                            </div>
                        </div>

                        {/* Milestone Tracker Checklist */}
                        <div className="milestone-tracker">
                            <h4>Hitos del desarrollo a vigilar:</h4>
                            <p className="milestone-subtext">Selecciona los logros que ya realiza tu bebé para darle seguimiento a su crecimiento:</p>
                            
                            <div className="milestone-list">
                                {stage.milestones.map((milestone, idx) => (
                                    <label key={idx} className="milestone-item">
                                        <input 
                                            type="checkbox" 
                                            checked={!!checkedMilestones[milestone]}
                                            onChange={() => handleMilestoneChange(milestone)}
                                        />
                                        <span className="milestone-checkmark"></span>
                                        <span className="milestone-text">{milestone}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Development Progress Indicator */}
                        <div className="stage-progress-indicator">
                            <div className="progress-labels">
                                <span>RN</span>
                                <span>3m</span>
                                <span>6m</span>
                                <span>9m</span>
                                <span>12m+</span>
                            </div>
                            <div className="progress-track">
                                <div 
                                    className="progress-fill" 
                                    style={{ 
                                        width: ageInMonths === null ? '0%' 
                                            : ageInMonths < 0 ? '5%'
                                            : ageInMonths === 0 ? '15%'
                                            : ageInMonths <= 3 ? '35%'
                                            : ageInMonths <= 6 ? '55%'
                                            : ageInMonths <= 9 ? '75%'
                                            : ageInMonths <= 12 ? '90%'
                                            : '100%' 
                                    }}
                                ></div>
                                <div 
                                    className="progress-pin"
                                    style={{ 
                                        left: ageInMonths === null ? '0%' 
                                            : ageInMonths < 0 ? '5%'
                                            : ageInMonths === 0 ? '15%'
                                            : ageInMonths <= 3 ? '35%'
                                            : ageInMonths <= 6 ? '55%'
                                            : ageInMonths <= 9 ? '75%'
                                            : ageInMonths <= 12 ? '90%'
                                            : '98%' 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 2. Recommended Products */}
                <div className="rec-column rec-card-products">
                    <Card hoverable={false} className="card-custom-inner">
                        <div className="card-title-with-badge">
                            <h3>Productos recomendados</h3>
                            <span className="diaper-tag">Talla sugerida: <strong>{diaperSize}</strong></span>
                        </div>
                        <p className="section-desc">Especialmente seleccionados por talla y sensibilidad de piel ({skinType === 'sensitive' ? 'Sensible' : skinType === 'atopic' ? 'Muy Sensible' : 'Normal'}).</p>

                        <div className="rec-products-list">
                            {recommendedProducts.map(product => (
                                <div key={product.id} className="rec-product-row">
                                    <div className="product-row-image">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="product-row-details">
                                        <h4 className="p-row-name">{product.name}</h4>
                                        <div className="p-row-meta">
                                            {product.size && (
                                                <><span>Talla: <strong>{product.size}</strong></span><span>·</span></>
                                            )}
                                            <span>{product.weightRange || product.type}</span>
                                        </div>
                                        <div className="p-row-price">
                                            {product.discountPrice ? (
                                                <>
                                                    <span className="price-disc">{formatPrice(product.discountPrice)}</span>
                                                    <span className="price-old">{formatPrice(product.price)}</span>
                                                </>
                                            ) : (
                                                <span className="price-reg">{formatPrice(product.price)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="product-row-action" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <Button variant="outline" size="small" onClick={() => handleProductClick(product)} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
                                            Detalles
                                        </Button>
                                        <Button variant="primary" size="small" onClick={() => addToCart(product)} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
                                            Agregar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* 3. Personalized Tip & Articles */}
                <div className="rec-column rec-card-tips">
                    <Card hoverable={false} className="card-custom-inner bg-gradient-tip">
                        <div className="tip-header">
                            <span className="tip-icon">💡</span>
                            <div>
                                <h3>Huggies Tip del Día</h3>
                                <p className="tip-topic">Tema: {interests.includes('skin') ? 'Cuidado de la piel' : interests.includes('sleep') ? 'Sueño' : 'Desarrollo'}</p>
                            </div>
                        </div>
                        <p className="tip-content">"{stage.tips}"</p>

                        <hr className="tip-divider" />

                        <div className="curated-articles">
                            <h4>Lecturas de tu interés ({interests.map(i => i === 'sleep' ? 'Sueño' : i === 'nutrition' ? 'Nutrición' : i === 'milestones' ? 'Hitos' : 'Piel').join(', ')}):</h4>
                            <div className="curated-articles-links">
                                {interests.includes('skin') && (
                                    <a href="/articulo/1" className="curated-article-link">
                                        <span className="cal-dot red"></span>
                                        <span>Guía para el primer baño de tu bebé 🧼</span>
                                    </a>
                                )}
                                {interests.includes('sleep') && (
                                    <a href="/articulo/2" className="curated-article-link">
                                        <span className="cal-dot blue"></span>
                                        <span>Cómo establecer una rutina de sueño nocturna 🌙</span>
                                    </a>
                                )}
                                {interests.includes('nutrition') && (
                                    <a href="/articulo/3" className="curated-article-link">
                                        <span className="cal-dot green"></span>
                                        <span>Alimentación complementaria: Primeros pasos 🍎</span>
                                    </a>
                                )}
                                {interests.includes('milestones') && (
                                    <a href="/comunidad" className="curated-article-link">
                                        <span className="cal-dot orange"></span>
                                        <span>Actividades de estimulación temprana según su mes 🧩</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

            </div>

            {/* Feedback Widget */}
            <div className="rec-feedback-container animate-slide-up">
                {feedback ? (
                    <div className="rec-feedback-widget submitted">
                        <span>✨ ¡Gracias por tu opinión! Nos ayuda a mejorar las recomendaciones para {name}. ❤️</span>
                    </div>
                ) : (
                    <div className="rec-feedback-widget">
                        <span>¿Te resulta útil esta sección de recomendaciones personalizadas?</span>
                        <div className="feedback-buttons">
                            <button className="feedback-btn btn-yes" onClick={() => handleFeedback('useful')}>
                                Sí 👍
                            </button>
                            <button className="feedback-btn btn-no" onClick={() => handleFeedback('not_useful')}>
                                No 👎
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PersonalizedRecommendations;
