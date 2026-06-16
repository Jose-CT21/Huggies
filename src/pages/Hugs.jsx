import React, { useState, useRef, useEffect, useCallback } from 'react';
import HugCard from '../components/hugs/HugCard';
import { hugsVideos } from '../data/hugsData';
import './Hugs.css';

/**
 * Hugs — Full-screen vertical video feed page (TikTok/Reels style).
 * Uses IntersectionObserver to detect which video is in viewport and auto-play it.
 */
const Hugs = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const isScrolling = useRef(false);
    const touchStartY = useRef(0);

    const changeVideo = useCallback((direction) => {
        if (isScrolling.current) return;
        
        setActiveIndex(prev => {
            const newIndex = prev + direction;
            if (newIndex >= 0 && newIndex < hugsVideos.length) {
                isScrolling.current = true;
                setTimeout(() => { isScrolling.current = false; }, 600);
                return newIndex;
            }
            return prev;
        });
    }, []);

    // Handle mouse wheel for strict video-by-video scrolling
    // Handle mouse wheel and touch for strict video-by-video scrolling
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? 1 : -1;
            changeVideo(direction);
        };

        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            e.preventDefault(); // Prevent native scroll while swiping
        };

        const handleTouchEnd = (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY.current - touchEndY;
            
            // 50px threshold for swipe
            if (Math.abs(diff) > 50) {
                const direction = diff > 0 ? 1 : -1;
                changeVideo(direction);
            }
        };

        // Needs to be non-passive to prevent default scrolling
        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [changeVideo]);

    return (
        <div className="hugs-page">
            {/* Header */}
            <div className="hugs-page__header">
                <h2 className="hugs-page__title">Hugs</h2>
                <p className="hugs-page__subtitle">Tips y momentos para tu bebé</p>
            </div>

            {/* Feed container */}
            <div className="hugs-feed" ref={containerRef}>
                <div 
                    className="hugs-feed__inner" 
                    style={{ 
                        transform: `translateY(-${activeIndex * 100}%)`, 
                        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' 
                    }}
                >
                    {hugsVideos.map((video, index) => (
                        <div
                            key={video.id}
                            className="hugs-feed__slide"
                        >
                            <HugCard
                                video={video}
                                isActive={index === activeIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hugs;
