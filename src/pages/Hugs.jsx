import React, { useState, useRef, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '../context/AuthContext';
import HugCard from '../components/hugs/HugCard';
import { hugsVideos } from '../data/hugsData';
import './Hugs.css';

/**
 * Hugs — Full-screen vertical video feed page (TikTok/Reels style).
 * Uses IntersectionObserver to detect which video is in viewport and auto-play it.
 */
const MySwal = withReactContent(Swal);

const Hugs = () => {
    const { hasSeenTutorial } = useAuth();
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
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

    // Show disclaimer on first visit
    useEffect(() => {
        const hasSeenDisclaimer = localStorage.getItem('huggies_hugs_disclaimer_seen');
        if (!hasSeenDisclaimer && hasSeenTutorial) {
            MySwal.fire({
                title: 'Aviso Importante de Seguridad',
                html: `
                    <p style="font-size: 1rem; line-height: 1.5; color: #4B5563; text-align: left; margin-bottom: 10px;">
                        Queremos recordarte la importancia de proteger la privacidad de los menores en internet. Te sugerimos <strong>evitar publicar videos o fotos donde se reconozca el rostro de niños o bebés</strong> en redes sociales públicas.
                    </p>
                    <p style="font-size: 0.9rem; line-height: 1.5; color: #6B7280; text-align: left;">
                        <em>Nota: Los videos aquí mostrados son ilustrativos. Huggies no se hace responsable por el mal uso o la distribución no autorizada de contenido generado por los usuarios.</em>
                    </p>
                `,
                icon: 'info',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#0288D1',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                localStorage.setItem('huggies_hugs_disclaimer_seen', 'true');
            });
        }
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
