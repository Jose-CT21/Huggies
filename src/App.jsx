import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
