import React from 'react';
import Card from '../ui/Card';
import './ProductCategories.css';

const ProductCategories = ({ categories }) => {
    return (
        <section id="productos" className="categories">
            <div className="container">
                <h2 className="section-title">Encuentra el producto ideal</h2>
                <div className="categories__grid">
                    {categories.map((category, index) => (
                        <Card key={category.id} className={`category-card delay-${(index + 1) * 100} animate-slide-up`}>
                            <div className="category-card__image-container">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="category-card__image"
                                />
                            </div>
                            <div className="category-card__content">
                                <h3 className="category-card__title">{category.title}</h3>
                                <p className="category-card__description">{category.description}</p>
                                <a href={category.link} className="category-card__link">Ver más &rarr;</a>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;
