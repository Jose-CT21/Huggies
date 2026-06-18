import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import CartModal from './components/ui/CartModal';
import OnboardingWizard from './components/ui/OnboardingWizard';
import AppTutorial from './components/ui/AppTutorial';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuth } from './context/AuthContext';

function ErrorFallback({ error }) {
  return (
    <div role="alert" style={{ padding: '20px', color: 'red' }}>
      <h2>Ocurrió un error en la aplicación:</h2>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#ffebee', padding: '10px' }}>{error.message}</pre>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>{error.stack}</pre>
    </div>
  );
}

// Lazy loaded pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Products = lazy(() => import('./pages/Products'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Community = lazy(() => import('./pages/Community'));
const Account = lazy(() => import('./pages/Account'));
const Rewards = lazy(() => import('./pages/Rewards'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const StoreLocator = lazy(() => import('./pages/StoreLocator'));
const Hugs = lazy(() => import('./pages/Hugs'));

// Simple loading fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#0288D1' }}>
    <div className="loader-content" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>Cargando...</h3>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #0288D1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
    </div>
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function App() {
  const location = useLocation();
  const isHugsRoute = location.pathname === '/hugs';
  const { childrenData, hasSeenTutorial } = useAuth();

  const showTutorial = !hasSeenTutorial;
  const showOnboarding = hasSeenTutorial && !localStorage.getItem('huggies_onboarding_completed') && (!childrenData || childrenData.length === 0);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="app-container">
        <Navbar />
        {showOnboarding && <OnboardingWizard />}
        {showTutorial && <AppTutorial />}
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/comunidad" element={<Community />} />
              <Route path="/articulo/:id" element={<ArticleDetail />} />
              <Route path="/cuenta" element={<Account />} />
              <Route path="/recompensas" element={<Rewards />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/donde-comprar" element={<StoreLocator />} />
              <Route path="/hugs" element={<Hugs />} />
            </Routes>
          </Suspense>
        </main>
        {!isHugsRoute && <Footer className="desktop-footer" />}
        <BottomNav />
        <CartModal />
      </div>
    </ErrorBoundary>
  );
}

export default App;
