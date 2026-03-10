import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', className = '', ...props }) => {
    return (
        <button
            className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
