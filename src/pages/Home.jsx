import React from 'react';
import Hero from '../components/home/Hero';
import ProductCategories from '../components/home/ProductCategories';
import Features from '../components/home/Features';
import ArticleCarousel from '../components/home/ArticleCarousel';
import RewardsPromo from '../components/home/RewardsPromo';
import PersonalizedRecommendations from '../components/home/PersonalizedRecommendations';
import { dummyData } from '../data/dummyData';

const Home = () => {
    return (
        <main>
            <Hero data={dummyData.hero} />
            <PersonalizedRecommendations />
            <ProductCategories categories={dummyData.categories} />
            <Features features={dummyData.features} />
            <RewardsPromo />
            <ArticleCarousel articles={dummyData.articles} />
        </main>
    );
};

export default Home;
