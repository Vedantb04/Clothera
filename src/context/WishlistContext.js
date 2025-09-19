import React, { createContext, useReducer, useEffect } from 'react';

export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state;
      }
      return [...state, action.payload];
    }

    case 'REMOVE_FROM_WISHLIST':
      return state.filter(item => item.id !== action.payload);

    case 'TOGGLE_WISHLIST': {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return [...state, action.payload];
    }

    case 'CLEAR_WISHLIST':
      return [];

    case 'LOAD_WISHLIST':
      return action.payload || [];

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('vedant-store-wishlist') || '[]');
    if (savedWishlist.length > 0) {
      dispatch({ type: 'LOAD_WISHLIST', payload: savedWishlist });
    }
  }, []);

  // Save wishlist to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('vedant-store-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};