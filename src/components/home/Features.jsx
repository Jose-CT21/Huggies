import React from 'react';
import './Features.css';

const Features = ({ features }) => {
    return (
        <section id="beneficios" className="features">
            <div className="container">
                <h2 className="section-title">¿Por qué elegir Huggies?</h2>
                <div className="features__grid">
                    {features.map((feature, index) => (
                        <div key={feature.id} className={`feature-item delay-${(index + 1) * 100} animate-slide-up`}>
                            <div className="feature-item__icon">
                                {feature.icon}
                            </div>
                            <h3 className="feature-item__title">{feature.title}</h3>
                            <p className="feature-item__description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
