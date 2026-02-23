import { Link } from 'react-router';
import { Search, ShoppingCart, User, Heart, Menu, Eye, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRealTime } from '../context/RealTimeContext';

export function Header() {
  const { cart, user, wishlist } = useApp();
  const { liveViewers } = useRealTime();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Grocery'];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Strip */}
      <div className="bg-[#0a0a0a] text-white/80 text-xs py-2 tracking-wide">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400 animate-bounce-subtle" />
            FREE SHIPPING on orders over $50 &nbsp;|&nbsp; Up to 50% OFF selected items
          </p>
          <div className="hidden md:flex gap-6 font-medium">
            <Link to="/dashboard" className="hover:text-white transition-colors">Track Order</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Help</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <motion.div
                className="bg-[#0a0a0a] text-white p-2 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Shop<span className="text-indigo-600">Hub</span>
              </span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className={`relative w-full transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border-2 focus:outline-none transition-all duration-300 ${
                    searchFocused
                      ? 'border-indigo-400 bg-white shadow-lg shadow-indigo-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>

            {/* Live badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Eye className="w-3.5 h-3.5" />
              {liveViewers} online
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link to="/dashboard/wishlist" className="hidden md:flex p-2.5 hover:bg-gray-100 rounded-xl relative transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
                {wishlist.length > 0 && (
                  <motion.span
                    className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>

              <Link to="/cart" className="flex p-2.5 hover:bg-gray-100 rounded-xl relative transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute top-1 right-1 bg-[#0a0a0a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              <Link to="/dashboard" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors text-sm font-medium">
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                {user ? user.name.split(' ')[0] : 'Login'}
              </Link>

              <button
                className="md:hidden p-2.5 hover:bg-gray-100 rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Search..." className="w-full pl-11 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 bg-gray-50" />
            </div>
          </div>
        </div>

        {/* Categories Nav */}
        <div className="border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="hidden md:flex items-center gap-1 py-1">
              {[{ to: '/products', label: 'All Products' }, ...categories.map(c => ({ to: `/products?category=${c}`, label: c }))].map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/products?sale=true" className="px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Sale
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-b border-gray-100 shadow-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="px-4 py-3 space-y-0.5">
              <Link to="/dashboard" className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-gray-50 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                <User className="w-4 h-4 text-gray-400" />
                {user ? user.name : 'Login'}
              </Link>
              <Link to="/dashboard/wishlist" className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-gray-50 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                <Heart className="w-4 h-4 text-gray-400" />
                Wishlist ({wishlist.length})
              </Link>
              <div className="border-t border-gray-100 pt-2 mt-2">
                {categories.map(cat => (
                  <Link key={cat} to={`/products?category=${cat}`} className="block py-3 px-3 rounded-xl hover:bg-gray-50 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    {cat}
                  </Link>
                ))}
              </div>
              <Link to="/about" className="block py-3 px-3 rounded-xl hover:bg-gray-50 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="block py-3 px-3 rounded-xl hover:bg-gray-50 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
