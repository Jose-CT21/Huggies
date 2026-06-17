import React, { useRef, useState, useEffect, useCallback } from 'react';
import HugComments from './HugComments';

/**
 * HugCard — Individual short video card for the Hugs feed.
 * Handles video playback, progress bar, and all social interactions.
 */
const HugCard = ({ video, isActive }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLiked, setIsLiked] = useState(video.isLiked);
    const [likeCount, setLikeCount] = useState(video.likes);
    const [isSaved, setIsSaved] = useState(video.isSaved);
    const [showComments, setShowComments] = useState(false);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [shareToast, setShareToast] = useState(false);
    const playIconTimeout = useRef(null);
    const heartTimeout = useRef(null);
    const lastTapTime = useRef(0);

    // For TikTok overlay
    const [overlayActive, setOverlayActive] = useState(true);

    // Auto-play/pause based on visibility
    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        if (isActive) {
            vid.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
            vid.pause();
            const timer = setTimeout(() => setIsPlaying(false), 0);
            return () => clearTimeout(timer);
        }

        // Reset overlay when card becomes inactive
        if (!isActive) {
            setOverlayActive(true);
        }
    }, [isActive]);

    // Update progress bar
    const handleTimeUpdate = useCallback(() => {
        const vid = videoRef.current;
        if (!vid || !vid.duration) return;
        setCurrentTime(vid.currentTime);
        setProgress((vid.currentTime / vid.duration) * 100);
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        const vid = videoRef.current;
        if (vid) setDuration(vid.duration);
    }, []);

    // Toggle play/pause on tap
    const handleVideoTap = (e) => {
        const now = e.timeStamp;
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTapTime.current < DOUBLE_TAP_DELAY) {
            // Double tap = like
            handleDoubleTapLike();
            lastTapTime.current = 0;
            return;
        }

        lastTapTime.current = now;

        setTimeout(() => {
            if (performance.now() - lastTapTime.current >= DOUBLE_TAP_DELAY) {
                // Single tap = toggle play/pause
                const vid = videoRef.current;
                if (!vid) return;

                if (vid.paused) {
                    vid.play().then(() => setIsPlaying(true));
                } else {
                    vid.pause();
                    setIsPlaying(false);
                }

                // Show play/pause icon briefly
                setShowPlayIcon(true);
                clearTimeout(playIconTimeout.current);
                playIconTimeout.current = setTimeout(() => setShowPlayIcon(false), 800);
            }
        }, DOUBLE_TAP_DELAY);
    };

    // Double tap to like with heart animation
    const handleDoubleTapLike = () => {
        if (!isLiked) {
            setIsLiked(true);
            setLikeCount(prev => prev + 1);
        }
        setShowHeart(true);
        clearTimeout(heartTimeout.current);
        heartTimeout.current = setTimeout(() => setShowHeart(false), 900);
    };

    // Scrub progress bar
    const handleProgressChange = (e) => {
        const vid = videoRef.current;
        if (!vid || !vid.duration) return;
        const newTime = (parseFloat(e.target.value) / 100) * vid.duration;
        vid.currentTime = newTime;
        setProgress(parseFloat(e.target.value));
        setCurrentTime(newTime);
    };

    // Like toggle
    const handleLikeToggle = () => {
        setIsLiked(prev => {
            setLikeCount(c => prev ? c - 1 : c + 1);
            return !prev;
        });
    };

    // Share
    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/hugs#${video.id}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
        } catch {
            // fallback — silently fail
        }
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
    };

    // Save toggle
    const handleSave = () => {
        setIsSaved(prev => !prev);
    };

    // Format time helper
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Format number for display
    const formatCount = (n) => {
        if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
        return n.toString();
    };

    if (video.type === 'tiktok') {
        // Calculate dynamic styles based on description length
        // Short text = more top padding added by TikTok natively = we must pull it up (negative top)
        // Long text = less top padding = we must push it down slightly so it doesn't hide under the menu
        const textLength = video.description ? video.description.length : 0;

        // Base values
        let dynamicTop = 70;
        let dynamicScale = 1.06;

        if (textLength < 40) {
            // dynamicTop = -15; // Pull up
            dynamicScale = 1.08;
        } else if (textLength < 70) {
            // dynamicTop = -5; // Pull up slightly
            dynamicScale = 1.07;
        } else {
            // dynamicTop = 10; // Push down to avoid menu overlap
            dynamicScale = 1.05;
        }

        return (
            <div className="hug-card" style={{ background: '#000', overflow: 'hidden', position: 'relative' }}>
                <iframe
                    src={`https://www.tiktok.com/embed/v2/${video.tiktokId}?autoplay=1&muted=0`}
                    scrolling="no"
                    style={{
                        position: 'absolute',
                        top: `${dynamicTop}px`,
                        left: 0,
                        width: '100%',
                        height: '100%', // Strict 100% so TikTok doesn't add centering padding
                        border: 'none',
                        overflow: 'hidden',
                        transform: `scale(${dynamicScale})`,
                        transformOrigin: 'top center' // Pin to the top to avoid overlapping the header
                    }}
                    allow="autoplay; encrypted-media; fullscreen"
                    title="TikTok Video"
                />

                {/* 
                    Invisible overlay to capture touch/scroll events for the feed.
                    If the user taps it, we hide it so they can interact with the TikTok iframe. 
                */}
                {overlayActive && (
                    <div
                        onClick={() => setOverlayActive(false)}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, cursor: 'pointer' }}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="hug-card">
            {/* Video Element */}
            <video
                ref={videoRef}
                className="hug-card__video"
                src={video.videoUrl}
                loop
                muted
                playsInline
                preload="metadata"
                onClick={handleVideoTap}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Gradient overlays for readability */}
            <div className="hug-card__gradient-top" />
            <div className="hug-card__gradient-bottom" />

            {/* Play/Pause visual feedback */}
            {showPlayIcon && (
                <div className="hug-card__play-indicator">
                    <span className="play-indicator-icon">{isPlaying ? '▶' : '⏸'}</span>
                </div>
            )}

            {/* Double-tap heart animation */}
            {showHeart && (
                <div className="hug-card__heart-burst">
                    <span>❤️</span>
                </div>
            )}

            {/* Share toast */}
            {shareToast && (
                <div className="hug-card__share-toast">
                    Enlace copiado ✓
                </div>
            )}

            {/* Right side action buttons */}
            <div className="hug-card__actions">
                {/* Creator avatar */}
                <div className="hug-action__creator-avatar">
                    <span>{video.creatorAvatar}</span>
                </div>

                {/* Like */}
                <button className={`hug-action-btn ${isLiked ? 'hug-action-btn--liked' : ''}`} onClick={handleLikeToggle}>
                    <span className="hug-action-icon">{isLiked ? '❤️' : '🤍'}</span>
                    <span className="hug-action-count">{formatCount(likeCount)}</span>
                </button>

                {/* Comment */}
                <button className="hug-action-btn" onClick={() => setShowComments(true)}>
                    <span className="hug-action-icon">💬</span>
                    <span className="hug-action-count">{formatCount(video.commentsCount)}</span>
                </button>

                {/* Share */}
                <button className="hug-action-btn" onClick={handleShare}>
                    <span className="hug-action-icon">↗️</span>
                    <span className="hug-action-count">{formatCount(video.shares)}</span>
                </button>

                {/* Save */}
                <button className={`hug-action-btn ${isSaved ? 'hug-action-btn--saved' : ''}`} onClick={handleSave}>
                    <span className="hug-action-icon">{isSaved ? '🔖' : '🏷️'}</span>
                    <span className="hug-action-count">{isSaved ? 'Guardado' : 'Guardar'}</span>
                </button>
            </div>

            {/* Bottom info overlay */}
            <div className="hug-card__info">
                <div className="hug-card__creator-line">
                    <span className="hug-card__creator-name">
                        @{video.creator}
                        {video.verified && <span className="hug-verified-badge">✓</span>}
                    </span>
                </div>
                <p className="hug-card__description">{video.description}</p>
                <div className="hug-card__hashtags">
                    {video.hashtags.map((tag, i) => (
                        <span key={i} className="hug-hashtag">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Progress bar */}
            <div className="hug-card__progress-area">
                <input
                    type="range"
                    className="hug-progress-slider"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleProgressChange}
                />
                <div className="hug-progress-time">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Comments panel */}
            {showComments && (
                <HugComments
                    comments={video.comments}
                    onClose={() => setShowComments(false)}
                    creatorName={video.creator}
                />
            )}
        </div>
    );
};

export default HugCard;
