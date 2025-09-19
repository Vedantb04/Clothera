import React, { useContext, useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartSubtotal, 
    getTotalDiscount 
  } = useContext(CartContext);
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const shippingCost = getCartTotal() > 50 ? 0 : 9.99;
  const finalTotal = getCartTotal() + shippingCost;

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      'SAVE10': { discount: 10, type: 'percentage' },
      'WELCOME20': { discount: 20, type: 'percentage' },
      'FLAT5': { discount: 5, type: 'fixed' }
    };

    if (validCoupons[couponCode]) {
      setAppliedCoupon({ code: couponCode, ...validCoupons[couponCode] });
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (getCartTotal() * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const totalWithCoupon = Math.max(0, getCartTotal() - getCouponDiscount()) + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add some products to get started!</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 
                     text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-xl opacity-90">Review your items before checkout</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Cart Items ({cart.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-lg font-bold text-green-600">
                            ${item.price}
                          </span>
                          {item.discount > 0 && (
                            <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                              -{item.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Coupon Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Apply Coupon
                </h3>
                
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 font-medium">
                        {appliedCoupon.code} applied!
                      </span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      You saved ${getCouponDiscount().toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                               rounded-lg font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${getCartSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {getTotalDiscount() > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Product Discounts</span>
                      <span>-${getTotalDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-${getCouponDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Shipping
                    </span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {shippingCost > 0 && (
                    <div className="text-sm text-gray-500">
                      Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${(appliedCoupon ? totalWithCoupon : finalTotal).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 
                           hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 
                           rounded-lg font-semibold transition-all duration-300 hover:scale-105 
                           flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-8 h-5 bg-blue-600 rounded-sm mr-1 flex items-center justify-center text-xs text-white">V</div>
                    <span>Visa</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-5 bg-red-600 rounded-sm mr-1 flex items-center justify-center text-xs text-white">M</div>
                    <span>Mastercard</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-5 bg-yellow-500 rounded-sm mr-1 flex items-center justify-center text-xs text-white">P</div>
                    <span>PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h3>
              <p className="text-gray-600 mb-6">
                This is a demo checkout. In a real application, this would integrate with 
                payment processing services.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg 
                           font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    alert('Order placed successfully! (Demo)');
                    clearCart();
                    setShowCheckout(false);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg 
                           font-semibold transition-colors"
                >
                  Complete Order (Demo)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;