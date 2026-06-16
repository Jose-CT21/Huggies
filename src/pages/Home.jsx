import React, { useMemo } from 'react';
import Hero from '../components/home/Hero';
import ProductMarquee from '../components/home/ProductMarquee';
import BabyDashboard from '../components/home/BabyDashboard';
import UserRegistrationPromo from '../components/home/UserRegistrationPromo';
import { dummyData } from '../data/dummyData';
import { huggiesCatalog } from '../data/huggiesCatalog';
import { useAuth } from '../context/AuthContext';
import { Flame, Star } from 'lucide-react';

const Home = () => {
    const { isAuthenticated } = useAuth();

    // Ofertas: Products that have a discountPrice
    const offers = useMemo(() => {
        return huggiesCatalog.filter(p => p.discountPrice !== null);
    }, []);

    // Más comprados: Just a simulated selection (e.g., top pants and wipes)
    const bestSellers = useMemo(() => {
        return huggiesCatalog.filter(p => 
            p.id === 'p14' || p.id === 'p18' || p.id === 'w2' || p.id === 'p7' || p.id === 'p1' || p.id === 'p20'
        );
    }, []);

    return (
        <main className="home-page" style={{ paddingBottom: '80px' }}>
            <Hero data={dummyData.hero} />
            <ProductMarquee 
                title={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Flame color="#ea580c" fill="#ea580c" size={28} /> Productos en Oferta</span>} 
                products={offers} 
                direction="left" 
            />
            <ProductMarquee 
                title={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Star color="#eab308" fill="#eab308" size={28} /> Los Más Comprados</span>} 
                products={bestSellers} 
                direction="right" 
            />
            <BabyDashboard />
            {!isAuthenticated && <UserRegistrationPromo />}
        </main>
    );
};

export default Home;
