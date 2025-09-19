import React, { useRef, useEffect, useState } from 'react';
import { Truck, ShoppingBag, Gift, Award, RefreshCw, Headphones, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage = ({ setCurrentPage }) => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);
  const [currentBannerIndex, setBannerIndex] = useState(0);

  const banners = [
    {
      title: "Super Value Deals",
      subtitle: "On all products",
      description: "Save more with coupons & up to 70% off!",
      buttonText: "Shop Now",
      gradient: "from-blue-600 via-purple-600 to-green-600"
    },
    {
      title: "New Arrivals",
      subtitle: "Latest Collection 2025",
      description: "Discover the freshest styles and trends!",
      buttonText: "Explore",
      gradient: "from-pink-600 via-red-600 to-orange-600"
    },
    {
      title: "Premium Quality",
      subtitle: "Best Materials",
      description: "High-quality fabrics at unbeatable prices!",
      buttonText: "Discover",
      gradient: "from-green-600 via-teal-600 to-blue-600"
    }
  ];

  // Hero section animations
  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        hero.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      }, 100);
    }

    // Features staggered animation
    const features = featuresRef.current;
    if (features) {
      const featureCards = features.children;
      Array.from(featureCards).forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 300 + i * 150);
      });
    }

    // Auto-rotate banner
    const interval = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50', color: 'from-pink-500 to-rose-500' },
    { icon: ShoppingBag, title: 'Online Order', description: 'Quick & easy checkout', color: 'from-green-500 to-emerald-500' },
    { icon: Gift, title: 'Save Money', description: 'Best deals & offers', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, title: 'Promotions', description: 'Seasonal discounts', color: 'from-purple-500 to-violet-500' },
    { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy', color: 'from-pink-500 to-rose-500' },
    { icon: Headphones, title: '24/7 Support', description: 'Always here to help', color: 'from-yellow-500 to-orange-500' },
  ];

  const featuredProducts = products.filter(p => p.category === 'featured').slice(0, 8);
  const newProducts = products.filter(p => p.category === 'new').slice(0, 4);

  const currentBanner = banners[currentBannerIndex];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative bg-gradient-to-br ${currentBanner.gradient} text-white py-20 lg:py-32 overflow-hidden transition-all duration-1000`}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                Trade-in Offer Available
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {currentBanner.title}
              <span className="block text-yellow-300 text-4xl lg:text-5xl mt-2">
                {currentBanner.subtitle}
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              {currentBanner.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg 
                         hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl
                         flex items-center justify-center space-x-2 group"
              >
                <span>{currentBanner.buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg 
                               hover:bg-white hover:text-gray-800 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Banner Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best shopping with our premium services and unmatched quality
            </p>
          </div>
          
          <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                         transition-all duration-500 hover:-translate-y-3 border border-gray-100
                         hover:border-transparent cursor-pointer"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl 
                              flex items-center justify-center mx-auto mb-6 
                              group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">Collection New Modern Design</p>
          </div>
          
          <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onProductClick={() => {
                  setCurrentPage('product');
                }}
              />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 
                       text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 
                       hover:scale-105 shadow-lg"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Repair Services Available
          </h2>
          <p className="text-2xl lg:text-3xl mb-8">
            Up to <span className="text-yellow-300 font-bold">70% Off</span> - All T-shirts & Accessories
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg 
                     hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Explore More
          </button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              New Arrivals
            </h2>
            <p className="text-xl text-gray-600">Latest Collection 2025</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onProductClick={() => {
                  setCurrentPage('product');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold mb-4">Sign Up For Newsletter</h3>
              <p className="text-xl text-gray-300">
                Get email updates about our latest shop and{' '}
                <span className="text-yellow-400 font-semibold">special offers</span>
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 rounded-full text-gray-800 outline-none 
                           focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                           text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 
                           hover:scale-105 shadow-lg whitespace-nowrap"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;