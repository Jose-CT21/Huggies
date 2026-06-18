import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import './BabyDashboard.css';
import { getDevelopmentalStage } from '../../data/developmentalStages';
import { Baby, Smile, Heart, Lightbulb } from 'lucide-react';

const BabyDashboard = () => {
    const { childrenData, updateChildrenData, activeChildIndex, setActiveChildIndex } = useAuth();

    if (!childrenData || childrenData.length === 0) return null;

    const handleRegisterClick = () => {
        updateChildrenData([]);
    };

    const activeChild = childrenData[activeChildIndex];

    if (activeChild.skipped) {
        return (
            <div className="baby-dashboard skipped-dashboard">
                <div className="skipped-icon">
                    <Baby size={48} color="#FDA4AF" />
                </div>
                <h3 className="skipped-title">¡Descubre la etapa de tu bebé!</h3>
                <p className="skipped-desc">
                    Regístralo ahora para recibir tips exactos para su edad. <strong>Es 100% privado y seguro.</strong>
                </p>
                <Button variant="primary" onClick={handleRegisterClick}>
                    Completar Perfil
                </Button>
            </div>
        );
    }

    const age = activeChild.ageInMonths;
    const currentStage = getDevelopmentalStage(age) || getDevelopmentalStage(0);

    return (
        <div className="baby-dashboard active-dashboard">
            {childrenData.length > 1 && (
                <div className="baby-selector-container" style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Ver recomendaciones para:</p>
                    <div className="baby-selector" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {childrenData.map((child, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveChildIndex(idx)}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    border: '1px solid #0288D1',
                                    background: activeChildIndex === idx ? '#0288D1' : '#fff',
                                    color: activeChildIndex === idx ? '#fff' : '#0288D1',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontWeight: activeChildIndex === idx ? 'bold' : 'normal',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {child.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="dashboard-header">
                <div className="baby-avatar">
                    {activeChild.gender === 'boy' ? <Smile size={32} color="#0EA5E9" /> : activeChild.gender === 'girl' ? <Smile size={32} color="#EC4899" /> : <Baby size={32} color="#10B981" />}
                </div>
                <div>
                    <h3 className="baby-name">{activeChild.name}</h3>
                    <p className="baby-age" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {age !== null ? (age < 0 ? <>En camino <Heart size={16} color="#EC4899" fill="#EC4899" /></> : `${age} meses`) : 'Edad no definida'}
                    </p>
                </div>
            </div>
            
            <div className="milestone-card">
                <h4 className="milestone-title">Hito Actual: {currentStage.title}</h4>
                <p className="milestone-desc">{currentStage.description}</p>
                
                {currentStage.tips && (
                    <div className="milestone-tips">
                        <p className="milestone-tip-item" style={{ display: 'flex', gap: '8px' }}>
                            <Lightbulb size={18} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{currentStage.tips}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BabyDashboard;
