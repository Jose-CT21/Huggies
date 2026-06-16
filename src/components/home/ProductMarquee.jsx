import React, { useRef, useEffect, useState, useCallback } from 'react';
import './ProductMarquee.css';
import { useNavigate } from 'react-router-dom';

const ProductMarquee = ({ title, products, direction = 'left', speed = 0.5 }) => {
    const navigate = useNavigate();
    const trackRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef(null);

    // Duplicate products to ensure enough content for infinite scrolling
    // We duplicate multiple times so it fills wide screens
    const duplicatedProducts = [...products, ...products, ...products, ...products];

    const animate = useCallback(() => {
        if (!trackRef.current || isPaused) {
            animationRef.current = requestAnimationFrame(animate);
            return;
        }

        const track = trackRef.current;
        if (direction === 'left') {
            track.scrollLeft += speed;
            // If scrolled past 1/4 of total scroll width (which is one full set of products)
            // silently jump back to create infinite illusion
            if (track.scrollLeft >= track.scrollWidth / 4) {
                track.scrollLeft -= track.scrollWidth / 4;
            }
        } else {
            // For right scrolling, if at the beginning, jump forward
            if (track.scrollLeft <= 0) {
                track.scrollLeft += track.scrollWidth / 4;
            }
            track.scrollLeft -= speed;
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [direction, isPaused, speed]);

    useEffect(() => {
        // Initial setup for 'right' direction to avoid jumping
        if (direction === 'right' && trackRef.current) {
            trackRef.current.scrollLeft = trackRef.current.scrollWidth / 4;
        }
        
        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [animate, direction]);

    // Handlers to pause scrolling on interaction
    const handlePointerDown = () => setIsPaused(true);
    const handlePointerUp = () => setIsPaused(false);

    return (
        <section className="product-marquee-section">
            <h2 className="marquee-title">{title}</h2>
            <div className="marquee-container">
                <div 
                    className={`marquee-track ${direction}`} 
                    ref={trackRef}
                    onMouseEnter={handlePointerDown}
                    onMouseLeave={handlePointerUp}
                    onTouchStart={handlePointerDown}
                    onTouchEnd={handlePointerUp}
                >
                    {duplicatedProducts.map((product, idx) => (
                        <div 
                            key={`${product.id}-${idx}`} 
                            className="marquee-card"
                            onClick={() => navigate(`/product/${product.id}`)}
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
