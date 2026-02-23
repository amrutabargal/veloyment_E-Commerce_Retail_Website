import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white mt-20 relative overflow-hidden">
      {/* Subtle gradient decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[150px] -top-64 right-1/4"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05), transparent)' }}
        />
      </div>

      {/* Newsletter */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 -mt-14 relative z-10">
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-gray-200/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Stay in the loop</h3>
                <p className="text-gray-500 text-sm">Real deals, no spam. We only email when it matters.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-900 text-sm focus:outline-none border-2 border-gray-200 focus:border-gray-900 transition-colors"
                  />
                </div>
                <motion.button
                  className="px-6 py-3.5 bg-[#0a0a0a] text-white rounded-xl font-semibold text-sm whitespace-nowrap hover:bg-gray-800 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 pt-24 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-white p-1.5 rounded-lg">
                <ShoppingCart className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-lg font-bold tracking-tight">ShopHub</span>
            </div>
            <p className="text-white/30 text-sm mb-6 leading-relaxed">
              Real products. Real people. Built with care for honest shoppers.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-4 h-4 text-white/40" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/60 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {[
                { to: '/products', label: 'All Products' },
                { to: '/products?sale=true', label: 'Flash Sale' },
                { to: '/products?category=Electronics', label: 'Electronics' },
                { to: '/products?category=Fashion', label: 'Fashion' },
                { to: '/dashboard', label: 'My Account' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/25 hover:text-white/60 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/60 uppercase tracking-wider">Help</h4>
            <ul className="space-y-3">
              {['Help Center', 'Track Order', 'Returns & Refunds', 'Shipping Info', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/25 hover:text-white/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/60 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Warranty'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/25 hover:text-white/60 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs flex items-center gap-1">
              &copy; 2026 ShopHub. Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in India.
            </p>
            <div className="flex items-center gap-3">
              {['VISA', 'MASTERCARD', 'PAYPAL', 'UPI'].map(m => (
                <div key={m} className="bg-white/5 px-3 py-1 rounded text-[10px] font-bold text-white/30 tracking-wider">
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
