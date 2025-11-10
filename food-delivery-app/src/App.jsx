import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Plus, Minus, MapPin, Phone, Clock } from 'lucide-react';

export default function FoodDeliveryApp() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const menuItems = [
    { id: 1, name: 'Classic Burger', category: 'Burgers', price: 8.99, image: '🍔', description: 'Juicy beef patty with fresh toppings' },
    { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, image: '🍕', description: 'Fresh mozzarella, tomatoes, and basil' },
    { id: 3, name: 'Caesar Salad', category: 'Salads', price: 7.99, image: '🥗', description: 'Crisp romaine with parmesan and croutons' },
    { id: 4, name: 'Pad Thai', category: 'Asian', price: 11.99, image: '🍜', description: 'Traditional Thai rice noodles' },
    { id: 5, name: 'BBQ Chicken Pizza', category: 'Pizza', price: 14.99, image: '🍕', description: 'BBQ sauce, grilled chicken, red onions' },
    { id: 6, name: 'Veggie Burger', category: 'Burgers', price: 9.99, image: '🍔', description: 'Plant-based patty with avocado' },
    { id: 7, name: 'Sushi Platter', category: 'Asian', price: 18.99, image: '🍱', description: 'Assorted fresh sushi rolls' },
    { id: 8, name: 'Greek Salad', category: 'Salads', price: 8.99, image: '🥗', description: 'Feta cheese, olives, cucumber, tomatoes' },
  ];

  const categories = ['All', 'Burgers', 'Pizza', 'Salads', 'Asian'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-3xl">🍽️</div>
            <h1 className="text-2xl font-bold text-orange-600">QuickBite</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>Delivery Area</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>30-45 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone size={16} />
              <span>(555) 123-4567</span>
            </div>
          </div>

          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Delicious Food, Delivered Fast</h2>
          <p className="text-xl mb-8">Order your favorite meals from the comfort of your home</p>
          <div className="max-w-md mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for dishes..."
              className="w-full px-4 py-3 rounded-full text-gray-800 pr-12"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                  activeCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-8xl">
                {item.image}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">${item.price}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsCartOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-orange-600 font-bold">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-4 text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-orange-600 text-2xl">${getTotalPrice()}</span>
                    </div>
                    <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">© 2024 QuickBite. All rights reserved.</p>
          <p className="text-sm text-gray-400">Fast delivery • Fresh ingredients • Great taste</p>
        </div>
      </footer>
    </div>
  );
}