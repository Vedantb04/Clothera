import React, { useContext, useRef, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ product, onProductClick, className = '' }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const cardRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.9)';
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
              }, Math.random() * 200);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(card);
      
      return () => observer.disconnect();
    }
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    
    // Add to cart animation
    const button = e.currentTarget;
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100)).toFixed(0)
    : product.price;

  return (
    <div 
      ref={cardRef}
      className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
                 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 ${className}`}
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 
                   group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 
                        text-white px-3 py-1 rounded-full text-sm font-bold 
                        shadow-lg animate-pulse">
            -{product.discount}%
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                      transition-all duration-300 flex items-center justify-center space-x-3">
          <button
            onClick={handleToggleWishlist}
            className={`p-3 rounded-full transition-all duration-300 transform 
                      translate-y-4 group-hover:translate-y-0 ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Heart 
              className="w-5 h-5" 
              fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
            />
          </button>
          
          <button
            onClick={handleProductClick}
            className="p-3 rounded-full bg-white/90 text-gray-700 
                     hover:bg-blue-500 hover:text-white transition-all duration-300 
                     transform translate-y-4 group-hover:translate-y-0 shadow-lg"
            style={{ transitionDelay: '150ms' }}
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-white/90 text-gray-700 
                     hover:bg-green-500 hover:text-white transition-all duration-300 
                     transform translate-y-4 group-hover:translate-y-0 shadow-lg"
            style={{ transitionDelay: '200ms' }}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        {/* Brand and Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 transition-colors duration-200 ${
                  i < product.rating 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 
                     group-hover:text-green-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">
              ${discountedPrice}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-500 to-emerald-500 
                     hover:from-green-600 hover:to-emerald-600 
                     text-white p-2.5 rounded-full transition-all duration-300 
                     hover:scale-110 hover:shadow-lg active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
        
        {/* Product Tags/Categories */}
        {product.category && (
          <div className="mt-3 flex flex-wrap gap-1">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full 
                           capitalize hover:bg-gray-200 transition-colors duration-200">
              {product.category}
            </span>
            {product.tags && product.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full 
                         hover:bg-blue-200 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;