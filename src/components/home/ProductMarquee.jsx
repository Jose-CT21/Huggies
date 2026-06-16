import React, { useRef, useState } from 'react';
import './ProductMarquee.css';
import { useNavigate } from 'react-router-dom';

const ProductMarquee = ({ title, products }) => {
    const navigate = useNavigate();
    const trackRef = useRef(null);
    
    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setHasDragged(false);
        setStartX(e.pageX - trackRef.current.offsetLeft);
        setScrollLeft(trackRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        setHasDragged(true);
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        trackRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleProductClick = (productId) => {
        // Prevent click if the user was dragging
        if (!hasDragged) {
            navigate(`/product/${productId}`);
        }
    };

    return (
        <section className="product-marquee-section">
            <h2 className="marquee-title">{title}</h2>
            <div className="marquee-container">
                <div 
                    className={`marquee-track ${isDragging ? 'active' : ''}`} 
                    ref={trackRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {products.map((product, idx) => (
                        <div 
                            key={`${product.id}-${idx}`} 
                            className="marquee-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="marquee-card__img-wrapper">
                                <img src={product.image} alt={product.name} loading="lazy" />
                            </div>
                            <h3 className="marquee-card__name">{product.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductMarquee;
