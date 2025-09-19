import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'shop':
        return <ShopPage setSelectedProduct={setSelectedProduct} setCurrentPage={setCurrentPage} />;
      case 'product':
        return <ProductPage product={selectedProduct} setCurrentPage={setCurrentPage} />;
      case 'cart':
        return <CartPage />;
      case 'blog':
        return <BlogPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    // <CartProvider>
    //   <WishlistProvider>
    //     <div className="App">
    //       <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
    //       <main className="min-h-screen">
    //         {renderPage()}
    //       </main>
    //       <Footer />
    //     </div>
    //   </WishlistProvider>
    // </CartProvider>
        <div className="App">
      <CartPage />
    </div>
  );
};

export default App;