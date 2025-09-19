import React, { useState, useContext } from 'react';
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Header = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems = [
    { name: 'Home', page: 'home' },
    { name: 'Shop', page: 'shop' },
    { name: 'Blog', page: 'blog' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop');
      // You can add search functionality here
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div 
              className="text-2xl font-bold text-green-600 cursor-pointer hover:text-green-700 transition-colors duration-300"
              onClick={() => setCurrentPage('home')}
            >
              Vedant's Store
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`font-medium transition-all duration-300 hover:text-green-600 relative py-2 ${
                    currentPage === item.page ? 'text-green-600' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {currentPage === item.page && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 transition-all duration-300 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md animate-in slide-in-from-right-5 duration-300">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="outline-none bg-transparent text-sm w-40"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors duration-300 hover:bg-green-50 rounded-full"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* User Account */}
            <button className="p-2 text-gray-700 hover:text-green-600 transition-colors duration-300 hover:bg-green-50 rounded-full">
              <User className="w-5 h-5" />
            </button>
            
            {/* Wishlist */}
            <button className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-300 hover:bg-green-50 rounded-full">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            {/* Shopping Cart */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-300 hover:bg-green-50 rounded-full"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`lg:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-2">
          {/* Mobile Search */}
          <div className="mb-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none bg-transparent text-sm flex-1"
              />
            </form>
          </div>
          
          {navigationItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                currentPage === item.page 
                  ? 'bg-green-100 text-green-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;