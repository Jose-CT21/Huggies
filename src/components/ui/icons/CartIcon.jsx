import React from 'react';

const CartIcon = ({ size = 24, fill = "none", stroke = "currentColor", className = "" }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width={size} 
            height={size} 
            fill={fill} 
            stroke={stroke} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`premium-cart-icon ${className}`}
            style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.15))' }}
        >
            <circle cx="9" cy="21" r="1.5"></circle>
            <circle cx="20" cy="21" r="1.5"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
    );
};

export default CartIcon;
