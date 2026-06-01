import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { initialPosts } from '../data/communityData';
import Button from '../components/ui/Button';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const article = initialPosts.find(p => p.id === id);

    if (!article) {
        return (
            <div className="article-not-found">
                <div className="container">
                    <div className="not-found-content">
                        <div className="not-found-icon">📄</div>
                        <h1>Artículo no encontrado</h1>
                        <p>El artículo que buscas no existe o ha sido eliminado.</p>
                        <Button variant="primary" onClick={() => navigate('/comunidad')}>
                            Volver a la Comunidad
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const relatedPosts = initialPosts
        .filter(p => p.id !== article.id && p.category === article.category)
        .slice(0, 2);

    return (
        <div className="article-detail-page">
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Inicio</Link>
                    <span>›</span>
                    <Link to="/comunidad">Comunidad</Link>
                    <span>›</span>
                    <span>{article.category}</span>
                </nav>

                <article className="article-body">
                    {/* Header */}
                    <header className="article-header">
                        <span className={`article-category-tag cat-${article.category.replace(/\s+/g, '-').toLowerCase()}`}>
                            {article.category}
                        </span>
                        <h1 className="article-title">
                            {article.content.slice(0, 80)}{article.content.length > 80 ? '...' : ''}
                        </h1>
                        <div className="article-meta">
                            <img
                                src={article.author.avatar}
                                alt={article.author.name}
                                className="article-avatar"
                            />
                            <div>
                                <p className="article-author">
                                    {article.author.name}
                                    {article.author.isPremium && (
                                        <span className="premium-badge" title="Miembro Plus"> ✦</span>
                                    )}
                                </p>
                                <p className="article-date">{article.date}</p>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="article-content">
                        <p>{article.content}</p>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="article-tags">
                            {article.tags.map(tag => (
                                <span key={tag} className="hashtag">#{tag.replace(/\s+/g, '')}</span>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="article-actions">
                        <div className="article-stats">
                            <span>❤️ {article.likes} me sirvió</span>
                            <span>💬 {article.replies} respuestas</span>
                        </div>
                        <Button variant="outline" onClick={() => navigate('/comunidad')}>
                            ‹ Volver a la Comunidad
                        </Button>
                    </div>
                </article>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <section className="related-articles">
                        <h2>Publicaciones relacionadas</h2>
                        <div className="related-articles-grid">
                            {relatedPosts.map(post => (
                                <Link key={post.id} to={`/articulo/${post.id}`} className="related-article-card">
                                    <div className="ra-card-header">
                                        <img src={post.author.avatar} alt={post.author.name} />
                                        <div>
                                            <p className="ra-author">{post.author.name}</p>
                                            <p className="ra-date">{post.date}</p>
                                        </div>
                                    </div>
                                    <p className="ra-excerpt">{post.content.slice(0, 120)}...</p>
                                    <span className={`ra-category cat-${post.category.replace(/\s+/g, '-').toLowerCase()}`}>
                                        {post.category}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ArticleDetail;
