import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartModal from './components/ui/CartModal';
import ScrollToTopButton from './components/ui/ScrollToTopButton';

// Lazy loaded pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Products = lazy(() => import('./pages/Products'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Community = lazy(() => import('./pages/Community'));

// Simple loading fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#0288D1' }}>
    <h3>Cargando...</h3>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/comunidad" element={<Community />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartModal />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
