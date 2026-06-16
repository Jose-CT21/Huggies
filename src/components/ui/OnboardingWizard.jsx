import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import './OnboardingWizard.css';
import CustomDatePicker from './CustomDatePicker';
import { Sparkles, Baby, Smile, Heart, Calendar, Shield, Puzzle } from 'lucide-react';

import { DIAPER_SIZES, INTERESTS, SKIN_TYPES } from '../../data/onboardingData';

const OnboardingWizard = () => {
    const { childData, updateChildData } = useAuth();
    const [prevChildData, setPrevChildData] = useState(childData);
    const [showWizard, setShowWizard] = useState(() => {
        const completed = localStorage.getItem('huggies_onboarding_completed');
        return !completed && !childData;
    });
    const [step, setStep] = useState(1);
    
    // Form state
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [diaperSize, setDiaperSize] = useState('');
    const [skinType, setSkinType] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);

    // Constants for birth date ranges (dynamic based on Today)
    const today = new Date();

    // Adjust state during render when childData changes (e.g. on reset/restart onboarding)
    if (childData !== prevChildData) {
        setPrevChildData(childData);
        if (!childData) {
            const completed = localStorage.getItem('huggies_onboarding_completed');
            if (!completed) {
                setShowWizard(true);
                setStep(1); // Reset wizard step too
            }
        } else {
            setShowWizard(false);
        }
    }

    const handleInterestToggle = (interestId) => {
        if (selectedInterests.includes(interestId)) {
            setSelectedInterests(selectedInterests.filter(id => id !== interestId));
        } else {
            setSelectedInterests([...selectedInterests, interestId]);
        }
    };

    const calculateAgeInMonths = (dateStr) => {
        if (!dateStr) return null;
        const birth = new Date(dateStr);
        const now = new Date();
        const diffYears = now.getFullYear() - birth.getFullYear();
        const diffMonths = now.getMonth() - birth.getMonth();
        let totalMonths = diffYears * 12 + diffMonths;
        if (now.getDate() < birth.getDate()) {
            totalMonths--;
        }
        return totalMonths;
    };

    const handleNext = () => {
        if (step === 2 && !birthDate) {
            alert('Por favor selecciona una fecha de nacimiento aproximada.');
            return;
        }
        if (step === 3 && (!diaperSize || !skinType)) {
            alert('Por favor selecciona la talla de pañal y el tipo de piel.');
            return;
        }
        if (step === 4 && selectedInterests.length === 0) {
            alert('Por favor selecciona al menos un área de interés para personalizar tus consejos.');
            return;
        }
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = () => {
        const babyAgeInMonths = calculateAgeInMonths(birthDate);
        
        const finalData = {
            name: name.trim() || 'mi bebé',
            gender,
            birthDate,
            ageInMonths: babyAgeInMonths,
            diaperSize,
            skinType,
            interests: selectedInterests,
            lastUpdated: new Date().toISOString()
        };

        updateChildData(finalData);
        setShowWizard(false);
    };

    const handleSkip = () => {
        // Save dummy/empty configuration to indicate skipped onboarding
        const finalData = {
            name: 'tu bebé',
            gender: '',
            birthDate: '',
            ageInMonths: null,
            diaperSize: 'M', // default size
            skinType: 'normal',
            interests: ['sleep', 'milestones'],
            skipped: true,
            lastUpdated: new Date().toISOString()
        };
        updateChildData(finalData);
        setShowWizard(false);
    };

    if (!showWizard) return null;

    const babyMonths = calculateAgeInMonths(birthDate);
    const progressPercent = (step / 5) * 100;

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-card animate-scale-up">

                {/* Progress bar */}
                <div className="onboarding-progress-bar-wrapper">
                    <div className="onboarding-progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>

                <div className="onboarding-step-content">
                    
                    {/* STEP 1: Name and Gender */}
                    {step === 1 && (
                        <div className="wizard-step animate-fade-in">
                            <h2 className="wizard-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                ¡Te damos la bienvenida a Huggies! <Baby size={28} color="#0ea5e9" />
                            </h2>
                            <p className="wizard-subtitle">Para darte una experiencia personalizada con artículos y recomendaciones, cuéntanos sobre tu bebé.</p>
                            
                            <div className="form-group-wizard">
                                <label className="wizard-label">¿Cómo se llama tu bebé? (Opcional)</label>
                                <input 
                                    type="text" 
                                    className="wizard-input" 
                                    placeholder="Ej. Mateo, Sofía..." 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group-wizard">
                                <label className="wizard-label">Género (Opcional)</label>
                                <div className="gender-cards-grid">
                                    <div 
                                        className={`gender-card ${gender === 'boy' ? 'active' : ''}`}
                                        onClick={() => setGender('boy')}
                                    >
                                        <span className="gender-icon"><Smile size={32} color="#0EA5E9" /></span>
                                        <span className="gender-name">Niño</span>
                                    </div>
                                    <div 
                                        className={`gender-card ${gender === 'girl' ? 'active' : ''}`}
                                        onClick={() => setGender('girl')}
                                    >
                                        <span className="gender-icon"><Smile size={32} color="#EC4899" /></span>
                                        <span className="gender-name">Niña</span>
                                    </div>
                                    <div 
                                        className={`gender-card ${gender === 'other' ? 'active' : ''}`}
                                        onClick={() => setGender('other')}
                                    >
                                        <span className="gender-icon"><Sparkles size={32} color="#8b5cf6" /></span>
                                        <span className="gender-name">Prefiero no decirlo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: BirthDate */}
                    {step === 2 && (
                        <div className="wizard-step animate-fade-in">
                            <h2 className="wizard-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                ¿Cuál es su fecha de nacimiento? <Calendar size={28} color="#f59e0b" />
                            </h2>
                            <p className="wizard-subtitle">
                                Si está en camino, puedes seleccionar la fecha estimada de parto. Calcularemos su edad automáticamente para adaptar los consejos.
                            </p>

                            <CustomDatePicker birthDate={birthDate} setBirthDate={setBirthDate} />
                                
                                {birthDate && (
                                    <div className="age-preview-badge animate-slide-up">
                                        {babyMonths !== null && (
                                            babyMonths < 0 ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={16} color="#EC4899" fill="#EC4899" /> ¡Tu bebé está en camino! (Faltan {Math.abs(babyMonths)} meses)</span>
                                            ) : babyMonths === 0 ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Baby size={16} color="#10B981" /> ¡Recién nacido! (Menos de 1 mes)</span>
                                            ) : (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Baby size={16} color="#10B981" /> Edad actual calculada: <strong>{babyMonths} {babyMonths === 1 ? 'mes' : 'meses'}</strong></span>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    )}

                    {/* STEP 3: Diaper Size and Skin Type */}
                    {step === 3 && (
                        <div className="wizard-step animate-fade-in">
                            <h2 className="wizard-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                Talla de Pañal y Tipo de Piel <Shield size={28} color="#8b5cf6" />
                            </h2>
                            <p className="wizard-subtitle">Esto nos ayuda a recomendarte la línea Huggies ideal y a evitar irritaciones.</p>

                            <div className="form-group-wizard">
                                <label className="wizard-label">Talla de pañal actual</label>
                                <div className="diaper-sizes-grid">
                                    {DIAPER_SIZES.map(item => (
                                        <div 
                                            key={item.size}
                                            className={`diaper-card ${diaperSize === item.size ? 'active' : ''}`}
                                            onClick={() => setDiaperSize(item.size)}
                                        >
                                            <span className="diaper-size-num">{item.size}</span>
                                            <span className="diaper-weight">{item.weight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group-wizard">
                                <label className="wizard-label">Tipo de piel de tu bebé</label>
                                <div className="skin-cards-grid">
                                    {SKIN_TYPES.map(item => (
                                        <div 
                                            key={item.id}
                                            className={`skin-card ${skinType === item.id ? 'active' : ''}`}
                                            onClick={() => setSkinType(item.id)}
                                        >
                                            <span className="skin-label">{item.label}</span>
                                            <span className="skin-desc">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Interests */}
                    {step === 4 && (
                        <div className="wizard-step animate-fade-in">
                            <h2 className="wizard-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                ¿Qué temas te gustaría seguir de cerca? <Puzzle size={28} color="#eab308" />
                            </h2>
                            <p className="wizard-subtitle">Selecciona los temas de interés para personalizar el contenido informativo y consejos.</p>

                            <div className="interests-grid">
                                {INTERESTS.map(item => (
                                    <div 
                                        key={item.id}
                                        className={`interest-card ${selectedInterests.includes(item.id) ? 'active' : ''}`}
                                        onClick={() => handleInterestToggle(item.id)}
                                    >
                                        <span className="interest-icon">{item.icon}</span>
                                        <div className="interest-text-wrapper">
                                            <span className="interest-label">{item.label}</span>
                                            <span className="interest-desc">{item.desc}</span>
                                        </div>
                                        <div className="interest-checkbox">
                                            {selectedInterests.includes(item.id) ? '✓' : '+'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 5: Success & Confirmation */}
                    {step === 5 && (
                        <div className="wizard-step wizard-success animate-fade-in">
                            <div className="success-lottie-placeholder">🎉</div>
                            <h2 className="wizard-title">¡Todo listo para la aventura, {name || 'mamá/papá'}!</h2>
                            <p className="wizard-subtitle">
                                Hemos guardado de forma segura tus preferencias. Ahora verás artículos y productos especialmente recomendados para el crecimiento de tu bebé.
                            </p>

                            <div className="wizard-summary-card">
                                <h3>Resumen del Perfil</h3>
                                <div className="summary-details">
                                    <div className="summary-item">
                                        <span>Bebé:</span>
                                        <strong>{name || 'Mi bebé'} {gender === 'boy' ? '👦' : gender === 'girl' ? '👧' : ''}</strong>
                                    </div>
                                    {babyMonths !== null && (
                                        <div className="summary-item">
                                            <span>Etapa:</span>
                                            <strong>
                                                {babyMonths < 0 
                                                    ? 'En camino / Gestación' 
                                                    : `${babyMonths} ${babyMonths === 1 ? 'mes' : 'meses'}`
                                                }
                                            </strong>
                                        </div>
                                    )}
                                    <div className="summary-item">
                                        <span>Talla Recomendada:</span>
                                        <strong>Etapa {diaperSize}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Piel:</span>
                                        <strong>{SKIN_TYPES.find(s => s.id === skinType)?.label}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Buttons */}
                <div className="onboarding-footer">
                    {step > 1 && step < 5 && (
                        <Button variant="outline" onClick={handleBack}>Atrás</Button>
                    )}
                    {step < 5 ? (
                        <Button 
                            variant="primary" 
                            onClick={handleNext} 
                            disabled={
                                (step === 2 && !birthDate) ||
                                (step === 3 && (!diaperSize || !skinType)) ||
                                (step === 4 && selectedInterests.length === 0)
                            }
                            className="wizard-next-btn"
                        >
                            Continuar
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleSubmit} className="wizard-submit-btn w-full">
                            Ver Recomendaciones Personalizadas
                        </Button>
                    )}
                </div>

                {step < 5 && (
                    <div className="onboarding-skip-bottom-wrapper">
                        <button className="onboarding-skip-bottom-link" onClick={handleSkip}>
                            Omitir por ahora
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OnboardingWizard;
