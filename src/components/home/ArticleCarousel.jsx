import React from 'react';
import Card from '../ui/Card';
import './ArticleCarousel.css';

const ArticleCarousel = ({ articles }) => {
    return (
        <section id="articulos" className="articles">
            <div className="container">
                <div className="articles__header">
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Consejos para padres</h2>
                    <a href="#todos-articulos" className="articles__see-all">Ver todos &rarr;</a>
                </div>

                <div className="articles__scroll-container">
                    <div className="articles__track">
                        {articles.map((article, index) => (
                            <Card key={article.id} className={`article-card delay-${(index + 1) * 100} animate-slide-up`}>
                                <div className="article-card__image-container">
                                    <img src={article.image} alt={article.title} className="article-card__image" />
                                </div>
                                <div className="article-card__content">
                                    <span className="article-card__date">{article.date}</span>
                                    <h3 className="article-card__title">{article.title}</h3>
                                    <a href={`#articulo-${article.id}`} className="article-card__link">Leer artículo</a>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArticleCarousel;
