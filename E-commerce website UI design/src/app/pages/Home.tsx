import { Link } from 'react-router';
import { ArrowRight, Star, TrendingUp, Package, Headphones, Shield, Clock, Eye, Sparkles, Zap, Gift, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRealTime } from '../context/RealTimeContext';
import { StaggerContainer, StaggerItem } from '../components/AnimatedPage';

export function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });
  const { liveViewers, recentActivity } = useRealTime();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.97]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else { seconds = 59; if (minutes > 0) minutes--; else { minutes = 59; if (hours > 0) hours--; } }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter(p => p.originalPrice).slice(0, 4);
  const featuredProducts = products.slice(0, 8);
  const bestSellers = products.filter(p => p.reviews > 1000).slice(0, 4);

  const categories = [
    { name: 'Electronics', icon: '📱', desc: 'Gadgets & tech', count: '120+ items' },
    { name: 'Fashion', icon: '👔', desc: 'Style your look', count: '280+ items' },
    { name: 'Home', icon: '🏠', desc: 'Comfort & decor', count: '95+ items' },
    { name: 'Beauty', icon: '💄', desc: 'Glow naturally', count: '150+ items' },
    { name: 'Grocery', icon: '🛒', desc: 'Fresh & organic', count: '200+ items' },
  ];

  const testimonials = [
    {
      name: 'Ananya Desai', location: 'Mumbai', rating: 5,
      text: 'Ordered headphones last week – quality is amazing! Shipped within 2 days. Will definitely order again.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    {
      name: 'Rahul Sharma', location: 'Pune', rating: 5,
      text: 'Best prices I\'ve found online. Customer support helped me with a return – no hassle at all.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    {
      name: 'Kavya Reddy', location: 'Bangalore', rating: 5,
      text: 'Genuine products, quick delivery. Been shopping here for 8 months – never disappointed!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
    }
  ];

  return (
    <div className="overflow-hidden">

      {/* ===== PREMIUM HERO ===== */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[85vh] flex items-center bg-[#0a0a0a] text-white overflow-hidden"
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] -top-48 -left-32"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent)' }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bottom-0 right-0"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent)' }}
            animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur px-4 py-2 rounded-full text-xs tracking-wider mb-8"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                NEW ARRIVALS 2026
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                Discover<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
                  Premium Style
                </span>
              </h1>

              <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-md font-light">
                Curated collections from world-class brands. 50,000+ happy customers and counting.
              </p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-white/10"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?sale=true"
                  className="px-8 py-4 border border-white/15 text-white/80 rounded-2xl font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  View Deals
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                className="flex items-center gap-6 mt-12 text-xs text-white/30 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Secure Payment</div>
                <div className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Free Delivery</div>
                <div className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> Easy Returns</div>
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden md:block relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
                  alt="Premium shopping"
                  className="rounded-3xl w-full shadow-2xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Floating stat cards */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-lg">{liveViewers}</span>
                    <p className="text-[11px] text-gray-500">Browsing now</p>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-2xl"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-900">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-gray-500">50,000+ reviews</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== LIVE ACTIVITY TICKER ===== */}
      <div className="bg-[#0a0a0a] border-t border-white/5 text-white py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="flex items-center gap-2 shrink-0 text-[11px] font-bold tracking-widest text-white/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            LIVE
          </span>
          <div className="flex-1 overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="flex gap-12 whitespace-nowrap"
            >
              {[...recentActivity, ...recentActivity].map((msg, i) => (
                <span key={i} className="text-xs text-white/30 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-500/60" />
                  {msg}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== FEATURES BAR ===== */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Headphones, title: '24/7 Support', desc: 'We\'re always here' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: Clock, title: 'Easy Returns', desc: '30-day guarantee' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="p-2.5 bg-gray-50 rounded-xl">
                  <item.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        {/* ===== CATEGORIES ===== */}
        <section className="py-20">
          <motion.div
            className="flex justify-between items-end mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
              <p className="text-gray-400 mt-1 text-sm">Find exactly what you need</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(cat => (
              <StaggerItem key={cat.name}>
                <Link to={`/products?category=${cat.name}`} className="group block">
                  <div className="bg-gray-50 hover:bg-white rounded-2xl p-6 text-center border border-transparent hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-400 hover:-translate-y-1">
                    <motion.div
                      className="text-4xl mb-3 inline-block"
                      whileHover={{ scale: 1.15, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {cat.icon}
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ===== FLASH SALE ===== */}
        <section className="py-6 mb-14">
          <motion.div
            className="bg-[#0a0a0a] rounded-3xl overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"
              style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15), transparent)' }}
            />

            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.span
                      className="text-2xl"
                      animate={{ rotate: [0, 12, -12, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-6 h-6 text-amber-400" />
                    </motion.span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Flash Sale</h2>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold tracking-wider animate-pulse">LIVE</span>
                  </div>
                  <p className="text-white/40 text-sm">Grab these deals before they vanish</p>
                </div>
                <div className="flex gap-2">
                  {[
                    { val: timeLeft.hours, label: 'HRS' },
                    { val: timeLeft.minutes, label: 'MIN' },
                    { val: timeLeft.seconds, label: 'SEC' },
                  ].map((t) => (
                    <div key={t.label} className="text-center bg-white/5 border border-white/10 backdrop-blur rounded-xl px-4 py-2.5 min-w-[64px]">
                      <motion.div
                        className="text-2xl font-bold text-white font-mono"
                        key={t.val}
                        initial={{ scale: 1.15, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        {String(t.val).padStart(2, '0')}
                      </motion.div>
                      <div className="text-[10px] text-white/30 font-bold tracking-widest mt-0.5">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {flashSaleProducts.map(product => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </motion.div>
        </section>

        {/* ===== FEATURED PRODUCTS ===== */}
        <section className="py-16">
          <div className="flex justify-between items-end mb-10">
            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
              <p className="text-gray-400 mt-1 text-sm">Curated picks our customers love</p>
            </motion.div>
            <Link to="/products" className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map(product => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ===== PROMO BANNER ===== */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#0a0a0a] rounded-3xl overflow-hidden relative">
            {/* Decorative */}
            <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px]"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent)' }}
            />

            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div className="p-10 md:p-14 text-white">
                <motion.div
                  className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-full text-xs mb-6 tracking-wider"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  FIRST ORDER SPECIAL
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
                  Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">20% OFF</span>
                  <br />your first order
                </h2>
                <p className="text-lg mb-8 text-white/40">
                  Use code: <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10">WELCOME20</span>
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-white/5"
                >
                  Claim Offer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hidden md:block p-8">
                <motion.img
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&q=80"
                  alt="Special Offer"
                  className="rounded-2xl shadow-2xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== BEST SELLERS ===== */}
        <section className="py-16">
          <div className="flex justify-between items-end mb-10">
            <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold tracking-tight">Best Sellers</h2>
              <p className="text-gray-400 mt-1 text-sm">What everyone's buying right now</p>
            </motion.div>
            <Link to="/products" className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map(product => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-20">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">What our customers say</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm">
              Real reviews from verified buyers. No bots, no fake ratings.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-400"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
