import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import './BabyDashboard.css';
import { getDevelopmentalStage } from '../../data/developmentalStages';
import { Baby, Smile, Heart, Lightbulb } from 'lucide-react';

const BabyDashboard = () => {
    const { childData, updateChildData } = useAuth();

    if (!childData) return null; // Shouldn't render if completely empty, although skipping creates skipped:true childData

    const handleRegisterClick = () => {
        // Clearing childData forces the OnboardingWizard to pop up again
        updateChildData(null);
    };

    if (childData.skipped) {
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

    // Find the right milestone
    const age = childData.ageInMonths;
    const currentStage = getDevelopmentalStage(age) || getDevelopmentalStage(0);

    return (
        <div className="baby-dashboard active-dashboard">
            <div className="dashboard-header">
                <div className="baby-avatar">
                    {childData.gender === 'boy' ? <Smile size={32} color="#0EA5E9" /> : childData.gender === 'girl' ? <Smile size={32} color="#EC4899" /> : <Baby size={32} color="#10B981" />}
                </div>
                <div>
                    <h3 className="baby-name">{childData.name}</h3>
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
