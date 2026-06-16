import React, { useState, useRef } from 'react';
import { initialPosts, postCategories } from '../data/communityData';
import { Heart, Baby, MessageCircle, Home, Lightbulb, HelpCircle, Star, HeartHandshake } from 'lucide-react';
import './Community.css';

/* ─────────────────────────────────────────────
   CREATE POST BOX
───────────────────────────────────────────── */
const CreatePostBox = ({ onPost }) => {
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);   // [{url, file}]
    const fileRef = useRef();

    const handleImagePick = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(f => ({ url: URL.createObjectURL(f), file: f }));
        setImages(prev => [...prev, ...previews].slice(0, 4));
    };

    const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx));

    const canPost = text.trim().length > 0 && category !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canPost) return;
        onPost({
            text,
            category,
            images: images.map(i => i.url),
        });
        setText('');
        setCategory('');
        setImages([]);
        setExpanded(false);
    };

    return (
        <div className="create-post-box">
            {/* Collapsed trigger */}
            {!expanded && (
                <div className="cp-trigger" onClick={() => setExpanded(true)}>
                    <img className="cp-avatar" src="https://i.pravatar.cc/150?u=me" alt="Tú" />
                    <div className="cp-fake-input" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        ¿Qué está pasando con tu bebé? <Baby size={20} color="#10b981" />
                    </div>
                </div>
            )}

            {/* Expanded form */}
            {expanded && (
                <form className="cp-form" onSubmit={handleSubmit}>
                    <div className="cp-form-header">
                        <h3>Crear publicación</h3>
                        <button type="button" className="cp-close" onClick={() => setExpanded(false)}>✕</button>
                    </div>

                    {/* Category */}
                    <select
                        className="cp-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecciona un tema…</option>
                        {postCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    {/* Text */}
                    <textarea
                        className="cp-textarea"
                        placeholder="Comparte un tip, duda o recomendación…"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows={4}
                        autoFocus
                    />

                    {/* Image previews */}
                    {images.length > 0 && (
                        <div className={`cp-image-grid cols-${Math.min(images.length, 2)}`}>
                            {images.map((img, i) => (
                                <div key={i} className="cp-image-preview">
                                    <img src={img.url} alt="" />
                                    <button type="button" className="cp-remove-img" onClick={() => removeImage(i)}>✕</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Toolbar */}
                    <div className="cp-toolbar">
                        <div className="cp-tools">
                            <button
                                type="button"
                                className="cp-tool-btn"
                                title="Agregar foto"
                                onClick={() => fileRef.current.click()}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="3"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21 15 16 10 5 21"/>
                                </svg>
                                <span>Foto</span>
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={handleImagePick}
                            />
                            <button type="button" className="cp-tool-btn" title="Sentimiento">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                                </svg>
                                <span>Emoción</span>
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`cp-publish-btn ${!canPost ? 'disabled' : ''}`}
                            disabled={!canPost}
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   COMMENTS SECTION
───────────────────────────────────────────── */
const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setComments(prev => [
            ...prev,
            {
                id: Date.now(),
                author: 'Tú (María Pérez)',
                avatar: 'https://i.pravatar.cc/150?u=me',
                text: text.trim(),
                time: 'Ahora mismo',
                likes: 0,
            },
        ]);
        setText('');
    };

    return (
        <div className="comments-section">
            {/* Existing comments */}
            {comments.length > 0 && (
                <div className="comments-list">
                    {comments.map(c => (
                        <div key={c.id} className="comment-item">
                            <img src={c.avatar} alt={c.author} className="comment-avatar" />
                            <div className="comment-bubble">
                                <span className="comment-author">{c.author}</span>
                                <p className="comment-text">{c.text}</p>
                                <div className="comment-meta">
                                    <span>{c.time}</span>
                                    <button className="comment-like-btn">Me sirvió · {c.likes}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Input */}
            <form className="comment-form" onSubmit={handleAdd}>
                <img src="https://i.pravatar.cc/150?u=me" alt="Tú" className="comment-avatar" />
                <div className="comment-input-wrap">
                    <input
                        type="text"
                        className="comment-input"
                        placeholder="Escribe un comentario…"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    {text.trim() && (
                        <button type="submit" className="comment-send-btn" aria-label="Enviar">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

/* ─────────────────────────────────────────────
   POST CARD
───────────────────────────────────────────── */
const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        setLiked(prev => !prev);
        setLikes(prev => liked ? prev - 1 : prev + 1);
    };

    const catClass = post.category.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="post-card">
            {/* Header */}
            <div className="post-header">
                <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
                <div className="post-author-info">
                    <div className="post-author-name">
                        {post.author.name}
                        {post.author.isPremium && <span className="premium-badge">✦ Plus</span>}
                    </div>
                    <div className="post-meta">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span className={`category-tag ${catClass}`}>{post.category}</span>
                    </div>
                </div>
                <button className="post-menu-btn" aria-label="Opciones">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="post-body">
                {post.content && <p>{post.content}</p>}

                {/* Images */}
                {post.images && post.images.length > 0 && (
                    <div className={`post-image-grid cols-${Math.min(post.images.length, 2)}`}>
                        {post.images.map((img, i) => (
                            <div key={i} className="post-image-cell">
                                <img src={img} alt="" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="post-hashtags">
                        {post.tags.map(tag => (
                            <span key={tag} className="hashtag">#{tag.replace(/\s+/g, '')}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats row */}
            <div className="post-stats">
                {likes > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={14} color="#ef4444" fill="#ef4444" /> {likes} {likes === 1 ? 'persona' : 'personas'}</span>}
                <span
                    className="post-stats-replies"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => setShowComments(s => !s)}
                >
                    <MessageCircle size={14} color="#6b7280" /> {post.replies} comentarios
                </span>
            </div>

            {/* Action bar */}
            <div className="post-actions">
                <button
                    className={`action-btn ${liked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Me sirvió
                </button>
                <button
                    className={`action-btn ${showComments ? 'active' : ''}`}
                    onClick={() => setShowComments(s => !s)}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Comentar
                </button>
                <button className="action-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Compartir
                </button>
            </div>

            {/* Comments */}
            {showComments && <CommentsSection />}
        </div>
    );
};

/* ─────────────────────────────────────────────
   RIGHT SIDEBAR
───────────────────────────────────────────── */
const SUGGESTIONS = [
    { id: 'u1', name: 'Patricia Vela', mutual: '12 amigos en común', avatar: 'https://i.pravatar.cc/150?u=patricia' },
    { id: 'u2', name: 'Roberto Nájera', mutual: '5 amigos en común', avatar: 'https://i.pravatar.cc/150?u=roberto' },
    { id: 'u3', name: 'Diana Lozano', mutual: '8 amigos en común', avatar: 'https://i.pravatar.cc/150?u=diana' },
];

const RightSidebar = () => (
    <aside className="community-right-sidebar">
        {/* Your profile summary */}
        <div className="sidebar-card profile-card">
            <img src="https://i.pravatar.cc/150?u=me" alt="Tú" className="profile-card-avatar" />
            <div>
                <p className="profile-card-name">María Pérez</p>
                <p className="profile-card-sub">Miembro Plus ✦</p>
            </div>
        </div>

        {/* Suggestions */}
        <div className="sidebar-card">
            <h4 className="sidebar-card-title">Papás que podrías conocer</h4>
            <div className="suggestions-list">
                {SUGGESTIONS.map(s => (
                    <div key={s.id} className="suggestion-item">
                        <img src={s.avatar} alt={s.name} className="suggestion-avatar" />
                        <div className="suggestion-info">
                            <p className="suggestion-name">{s.name}</p>
                            <p className="suggestion-mutual">{s.mutual}</p>
                        </div>
                        <button className="suggestion-follow-btn">Seguir</button>
                    </div>
                ))}
            </div>
        </div>

        {/* Trending tags */}
        <div className="sidebar-card">
            <h4 className="sidebar-card-title">Temas populares</h4>
            <div className="trending-tags">
                {['HuggiesSupreme', 'TipsNocturnos', 'PrimerPañal', 'ActiveSecPants', 'Toallitas', 'BebeHuggies'].map(tag => (
                    <span key={tag} className="trending-tag">#{tag}</span>
                ))}
            </div>
        </div>
    </aside>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const Community = () => {
    const [posts, setPosts] = useState(
        initialPosts.map(p => ({ ...p, images: p.images ?? [] }))
    );
    const [activeFilter, setActiveFilter] = useState('Todos');

    const handleNewPost = ({ text, category, images }) => {
        const newPost = {
            id: `post-${Date.now()}`,
            author: {
                name: 'Tú (María Pérez)',
                avatar: 'https://i.pravatar.cc/150?u=me',
                isPremium: true,
            },
            date: 'Ahora mismo',
            category,
            content: text,
            images,
            likes: 0,
            replies: 0,
            tags: [],
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const filtered = activeFilter === 'Todos'
        ? posts
        : posts.filter(p => p.category === activeFilter);

    return (
        <div className="community-page">
            {/* Hero */}
            <div className="community-hero">
                <h1>Comunidad Huggies</h1>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    El lugar para compartir, aprender y conectar con otros papás <HeartHandshake size={20} color="#f59e0b" />
                </p>
            </div>

            <div className="community-root container">
                {/* Left sidebar — filters */}
                <aside className="community-left-sidebar">
                    <div className="sidebar-card">
                        <img src="https://i.pravatar.cc/150?u=me" alt="Tú" className="profile-card-avatar" />
                        <div>
                            <p className="profile-card-name">María Pérez</p>
                            <p className="profile-card-sub">Miembro Plus ✦</p>
                        </div>
                    </div>
                    <div className="sidebar-card filter-card">
                        <h4 className="sidebar-card-title">Temas</h4>
                        <div className="filter-buttons">
                            <button
                                className={`filter-pill ${activeFilter === 'Todos' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('Todos')}
                            >
                                <Home size={16} style={{marginRight: '6px'}} /> Todos los temas
                            </button>
                            {postCategories.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(cat)}
                                >
                                    {cat === 'Tips de Padres' ? <Lightbulb size={16} style={{marginRight: '6px'}} /> : cat === 'Dudas' ? <HelpCircle size={16} style={{marginRight: '6px'}} /> : <Star size={16} style={{marginRight: '6px'}} />} {cat}
                                </button>
                            ))}
                        </div>
                        <select
                            className="filter-dropdown"
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                        >
                            <option value="Todos">Todos los temas</option>
                            {postCategories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Main feed */}
                <main className="community-feed">
                    {/* Create post */}
                    <CreatePostBox onPost={handleNewPost} />

                    {/* Posts */}
                    <div className="posts-list">
                        {filtered.length > 0 ? (
                            filtered.map(post => <PostCard key={post.id} post={post} />)
                        ) : (
                            <div className="no-posts">
                                <div className="no-posts-icon"><Star size={48} color="#eab308" /></div>
                                <p>No hay publicaciones en esta categoría aún.</p>
                                <p>¡Sé el primero en compartir algo!</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right sidebar */}
                <RightSidebar />
            </div>
        </div>
    );
};

export default Community;
