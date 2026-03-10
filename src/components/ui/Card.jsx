import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hoverable = true }) => {
    return (
        <div className={`ui-card ${hoverable ? 'hover-lift' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
