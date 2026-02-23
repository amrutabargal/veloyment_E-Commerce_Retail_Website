import { Link } from 'react-router';
import { ShoppingCart, Heart, Star, Zap, Eye } from 'lucide-react';
import { Product } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, wishlist } = useApp();
  const isInWishlist = wishlist.some(p => p.id === product.id);
  const [addedToCart, setAddedToCart] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product, quantity: 1 });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="premium-card">
        {/* === IMAGE SECTION === */}
        <div className="card-image relative aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div className="card-overlay" />

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-20">
              <motion.div
                className="badge-gold px-3 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-lg"
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.1 }}
              >
                <Zap className="w-3 h-3" />
                {discount}% OFF
              </motion.div>
            </div>
          )}

          {/* Wishlist button */}
          <motion.button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-20 p-2.5 rounded-full shadow-lg transition-all duration-300 ${
              isInWishlist
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:text-rose-500 hover:bg-white'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
          >
            <Heart className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} />
          </motion.button>

          {/* Quick view on hover */}
          <div className="absolute bottom-3 left-3 right-3 z-20 card-btn-wrap">
            <motion.button
              onClick={handleAddToCart}
              disabled={product.stock === 'out-of-stock'}
              className={`w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm backdrop-blur-md transition-all duration-300 ${
                addedToCart
                  ? 'bg-emerald-500 text-white'
                  : product.stock === 'out-of-stock'
                    ? 'bg-white/70 text-gray-400 cursor-not-allowed'
                    : 'bg-white/90 text-gray-900 hover:bg-white shadow-xl'
              }`}
              whileTap={product.stock !== 'out-of-stock' && !addedToCart ? { scale: 0.96 } : {}}
            >
              {addedToCart ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {product.stock === 'out-of-stock' ? 'Sold Out' : 'Add to Cart'}
                </>
              )}
            </motion.button>
          </div>

          {/* Stock urgency strip */}
          {product.stock === 'limited' && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500/90 to-amber-500/0 text-white text-[11px] font-bold text-center py-4 pt-8 z-10 card-btn-wrap">
              Only {product.stockCount} left – selling fast!
            </div>
          )}
        </div>

        {/* === CONTENT SECTION === */}
        <div className="p-5">
          {/* Brand */}
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-[0.12em] mb-2">{product.brand}</p>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2.5 line-clamp-2 min-h-[2.75rem] text-[15px] leading-snug group-hover:text-indigo-700 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-500">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </span>
              </>
            )}
          </div>

          {/* Stock indicator bar */}
          {product.stock === 'in-stock' && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[11px] text-emerald-600 font-medium">In Stock</span>
            </div>
          )}
          {product.stock === 'limited' && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-amber-600 font-semibold">Almost gone!</span>
                <span className="text-[11px] text-gray-400">{product.stockCount} left</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(10, (product.stockCount / 50) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}
          {product.stock === 'out-of-stock' && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <span className="text-[11px] text-red-500 font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
