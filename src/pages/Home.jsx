import React, { useMemo } from 'react';
import Hero from '../components/home/Hero';
import ProductMarquee from '../components/home/ProductMarquee';
import BabyDashboard from '../components/home/BabyDashboard';
import UserRegistrationPromo from '../components/home/UserRegistrationPromo';
import SupportNewsletterPromo from '../components/home/SupportNewsletterPromo';
import { dummyData } from '../data/dummyData';
import { huggiesCatalog } from '../data/huggiesCatalog';
import { useAuth } from '../context/AuthContext';
import { Flame } from 'lucide-react';

const Home = () => {
    const { isAuthenticated } = useAuth();

    // Ofertas: Products that have a discountPrice
    const offers = useMemo(() => {
        return huggiesCatalog.filter(p => p.discountPrice !== null);
    }, []);

    return (
        <main className="home-page" style={{ paddingBottom: '0' }}>
            <Hero data={dummyData.hero} />
            
            <ProductMarquee 
                title={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Flame color="#ea580c" fill="#ea580c" size={28} /> Productos en Oferta</span>} 
                products={offers} 
            />
            
            <BabyDashboard />
            {!isAuthenticated && <UserRegistrationPromo />}
            
            <SupportNewsletterPromo />
        </main>
    );
};

export default Home;
