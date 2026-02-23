import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { products } from '../data/products';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Check, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { useRealTime } from '../context/RealTimeContext';
import { AnimatedPage } from '../components/AnimatedPage';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart, addToWishlist, wishlist, addRecentlyViewed, recentlyViewed } = useApp();
  const { liveViewers } = useRealTime();

  const [selectedSize, setSelectedSize] = useState(product?.variants?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.variants?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product?.id, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-gray-600 hover:text-gray-900 underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const isInWishlist = wishlist.some(p => p.id === product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const recentlyViewedFiltered = recentlyViewed.filter(p => p.id !== product.id).slice(0, 4);

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined
    });
  };

  const reviews = [
    {
      name: 'Alice Thompson',
      rating: 5,
      date: '2026-02-01',
      comment: 'Excellent product! Exceeded my expectations. The quality is amazing and shipping was fast.',
      verified: true
    },
    {
      name: 'Robert Kim',
      rating: 4,
      date: '2026-01-28',
      comment: 'Great value for money. Works as described. Would recommend to others.',
      verified: true
    },
    {
      name: 'Maria Garcia',
      rating: 5,
      date: '2026-01-25',
      comment: 'Love it! This is my second purchase. The customer service is also excellent.',
      verified: true
    }
  ];

  return (
    <AnimatedPage>
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-gray-900">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedImage(prev => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSelectedImage(prev => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-indigo-500' : 'border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Live viewers badge */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Eye className="w-4 h-4" />
            <span>{liveViewers} people viewing this product</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock === 'in-stock' && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">In Stock ({product.stockCount} available)</span>
                </div>
              )}
              {product.stock === 'limited' && (
                <div className="flex items-center gap-2 text-amber-600">
                  <span className="font-semibold">Only {product.stockCount} left in stock - Order soon</span>
                </div>
              )}
              {product.stock === 'out-of-stock' && (
                <div className="text-red-600 font-semibold">Out of Stock</div>
              )}
            </div>
          </div>

          {/* Size Selector */}
          {product.variants?.sizes && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border-2 rounded-xl font-semibold text-sm transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.variants?.colors && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 border-2 rounded-xl font-semibold text-sm transition-all ${
                      selectedColor === color
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="p-3 hover:bg-gray-100"
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <motion.button
              onClick={handleAddToCart}
              disabled={product.stock === 'out-of-stock'}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#0a0a0a] text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              whileHover={product.stock !== 'out-of-stock' ? { scale: 1.02 } : {}}
              whileTap={product.stock !== 'out-of-stock' ? { scale: 0.98 } : {}}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </motion.button>
            <button
              onClick={() => addToWishlist(product)}
              className={`p-4 border-2 rounded-xl transition-all ${
                isInWishlist
                  ? 'border-rose-500 bg-rose-50 text-rose-500'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Heart className="w-6 h-6" fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          <Link
            to="/cart"
            className="block text-center w-full px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Buy Now
          </Link>

          {/* Features */}
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-700">
              <Check className="w-5 h-5 text-green-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Check className="w-5 h-5 text-green-600" />
              <span>30-day easy returns</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Check className="w-5 h-5 text-green-600" />
              <span>Secure payment processing</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-gray-700 leading-relaxed mt-4">
              This premium product is designed with quality and durability in mind. 
              Perfect for everyday use, it combines functionality with style to meet your needs.
            </p>
          </div>
        )}

        {activeTab === 'specifications' && product.specifications && (
          <div className="bg-gray-50 rounded-xl p-6">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-white' : ''}>
                    <td className="py-3 px-4 font-semibold">{key}</td>
                    <td className="py-3 px-4 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{product.rating}</div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{product.reviews} reviews</p>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-3 mb-2">
                    <span className="text-sm w-12">{stars} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {stars === 5 ? '70%' : stars === 4 ? '20%' : '10%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      {recentlyViewedFiltered.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recently viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewedFiltered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
    </AnimatedPage>
  );
}
