import React from 'react';
import Button from '../ui/Button';
import './Hero.css';

const Hero = ({ data }) => {
    return (
        <section className="hero">
            <div className="hero__background">
                <img src={data.image} alt="Huggies Hero" className="hero__image" />
                <div className="hero__overlay"></div>
            </div>
            <div className="container hero__content">
                <div className="hero__text animate-slide-up">
                    <h1 className="hero__title">{data.headline}</h1>
                    <p className="hero__description delay-100">{data.subheadline}</p>
                    <div className="hero__actions delay-200">
                        <Button variant="primary" size="large">{data.cta}</Button>
                        <Button variant="outline" size="large" className="bg-white">Ver Ofertas</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
