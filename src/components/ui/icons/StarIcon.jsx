import React from 'react';

const StarIcon = ({ size = 24, className = "" }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width={size} 
            height={size}
            className={`premium-star-icon ${className}`}
            style={{ filter: 'drop-shadow(0px 2px 5px rgba(250, 204, 21, 0.5))' }}
        >
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="50%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
            </defs>
            <path 
                fill="url(#goldGradient)" 
                stroke="#fff"
                strokeWidth="1"
                strokeLinejoin="round"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
            />
        </svg>
    );
};

export default StarIcon;
