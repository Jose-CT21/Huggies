import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { initialPosts, postCategories } from '../data/communityData';
import './Community.css';

const Community = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [activeFilter, setActiveFilter] = useState('Todos');

    // Create post state
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCategory, setNewPostCategory] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const filteredPosts = activeFilter === 'Todos'
        ? posts
        : posts.filter(post => post.category === activeFilter);

    const handleCreatePost = (e) => {
        e.preventDefault();

        const isFormValid = newPostContent.trim() && newPostCategory;
        if (!isFormValid) return;

        const newPost = {
            id: `post-${Date.now()}`,
            author: {
                name: 'Tú (María Pérez)',
                avatar: 'https://i.pravatar.cc/150?u=current_user',
                isPremium: true
            },
            date: 'Hace un momento',
            category: newPostCategory,
            content: newPostContent,
            likes: 0,
            replies: 0,
            tags: []
        };

        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setNewPostCategory(''); // Reset category after post
        setIsCreating(false);
    };

    const handleLikeClick = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                // Simple toggle simulation
                const isLiked = post.userLiked;
                return {
                    ...post,
                    likes: isLiked ? post.likes - 1 : post.likes + 1,
                    userLiked: !isLiked
                };
            }
            return post;
        }));
    };

    const isFormValid = newPostContent.trim() && newPostCategory;
    let helperMessage = '';
    if (!newPostCategory) {
        helperMessage = 'Por favor, selecciona un tema para tu publicación.';
    } else if (!newPostContent.trim()) {
        helperMessage = 'Por favor, escribe un mensaje descriptivo.';
    }

    return (
        <div className="community-page">
            <div className="community-hero">
                <h1>Comunidad Huggies</h1>
                <p>El lugar perfecto para compartir experiencias, consejos y resolver tus dudas con otros padres.</p>
            </div>

            <div className="container community-layout">
                {/* Main Feed Sidebar / Actions */}
                <div className="community-sidebar">
                    <Card className="create-post-prompt">
                        <img src="https://i.pravatar.cc/150?u=current_user" alt="Tu avatar" className="user-avatar" />
                        <button
                            className="fake-input-btn"
                            onClick={() => setIsCreating(true)}
                        >
                            ¿Tienes algún tip o duda que compartir?
                        </button>
                    </Card>

                    <div className="community-filters">
                        <h3>Categorías</h3>
                        <br />
                        <button
                            className={`filter-pill ${activeFilter === 'Todos' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Todos')}
                        >
                            Todos los temas
                        </button>
                        {postCategories.map(category => (
                            <button
                                key={category}
                                className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feed and Modals */}
                <div className="community-feed">
                    {/* Create Post Form (Visible when isCreating is true) */}
                    {isCreating && (
                        <Card className="create-post-form-card">
                            <form onSubmit={handleCreatePost}>
                                <div className="create-post-header">
                                    <h3>Crear Publicación</h3>
                                    <button
                                        type="button"
                                        className="close-btn"
                                        onClick={() => setIsCreating(false)}
                                    >
                                        &times;
                                    </button>
                                </div>

                                <select
                                    className="post-category-select"
                                    value={newPostCategory}
                                    onChange={(e) => setNewPostCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Selecciona un tema...</option>
                                    {postCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>

                                <textarea
                                    className="post-textarea"
                                    placeholder="Escribe tu mensaje aquí..."
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    rows={4}
                                    autoFocus
                                />

                                <div className="create-post-footer">
                                    {!isFormValid && (
                                        <span className="post-helper-text">{helperMessage}</span>
                                    )}
                                    <div className="create-post-actions">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsCreating(false)}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={!isFormValid}
                                        >
                                            Publicar
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    )}

                    {/* Posts Flow */}
                    <div className="posts-container">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <Card key={post.id} className="post-card">
                                    <div className="post-header">
                                        <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
                                        <div className="post-author-info">
                                            <h4>
                                                {post.author.name}
                                                {post.author.isPremium && <span className="premium-badge" title="Miembro Plus">✦</span>}
                                            </h4>
                                            <span className="post-meta">{post.date} • <span className={`category-tag ${post.category.replace(/\s+/g, '-').toLowerCase()}`}>{post.category}</span></span>
                                        </div>
                                    </div>

                                    <div className="post-body">
                                        <p>{post.content}</p>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="post-hashtags">
                                                {post.tags.map(tag => (
                                                    <span key={`${post.id}-${tag}`} className="hashtag">#{tag.replace(/\s+/g, '')}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="post-footer">
                                        <button
                                            className={`action-btn ${post.userLiked ? 'liked' : ''}`}
                                            onClick={() => handleLikeClick(post.id)}
                                        >
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                            Sí me sirvió ({post.likes})
                                        </button>
                                        <button className="action-btn">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            </svg>
                                            Responder ({post.replies})
                                        </button>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className="no-posts">
                                <p>No hay publicaciones en esta categoría aún.</p>
                                <Button variant="primary" onClick={() => setIsCreating(true)}>¡Sé el primero en compartir algo!</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
