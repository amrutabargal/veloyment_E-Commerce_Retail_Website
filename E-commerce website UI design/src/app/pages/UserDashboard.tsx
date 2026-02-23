import { Link, Outlet, useLocation } from 'react-router';
import { Package, Heart, MapPin, User as UserIcon, LogOut, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const location = useLocation();
  const { user } = useApp();
  
  const menuItems = [
    { path: '/dashboard', label: 'Orders', icon: Package },
    { path: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/dashboard/addresses', label: 'Addresses', icon: MapPin },
    { path: '/dashboard/profile', label: 'Profile', icon: UserIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/orders';
    }
    return location.pathname === path;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {user?.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Orders Page
export function Orders() {
  const { orders } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Link to="/products" className="text-indigo-600 font-semibold hover:underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">Order {order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600 mt-2">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                </div>
                <Link 
                  to={`/dashboard/track/${order.id}`}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-violet-600 transition-colors"
                >
                  Track Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Wishlist Page
export function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (product: any) => {
    addToCart({ product, quantity: 1 });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link to="/products" className="text-indigo-600 font-semibold hover:underline">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex gap-4 p-4">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${product.id}`} className="font-semibold hover:text-indigo-600 mb-1 block">
                    {product.name}
                  </Link>
                  <p className="text-xl font-bold mb-2">${product.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm rounded-lg font-semibold hover:from-indigo-600 hover:to-violet-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="px-4 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg font-semibold hover:bg-red-100 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Addresses Page
export function Addresses() {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-violet-600 transition-colors">
          Add New Address
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{addr.type}</h3>
                {addr.isDefault && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                    Default
                  </span>
                )}
              </div>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <p className="font-semibold mb-1">{addr.name}</p>
            <p className="text-sm text-gray-600 mb-1">{addr.address}</p>
            <p className="text-sm text-gray-600 mb-1">
              {addr.city}, {addr.state} {addr.zipCode}
            </p>
            <p className="text-sm text-gray-600 mb-4">{addr.phone}</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Profile Page
export function Profile() {
  const { user } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-bold mb-4">Change Password</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-violet-600 transition-colors">
            Save Changes
          </button>
          <button className="px-8 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Order Tracking Page
export function OrderTracking() {
  const steps = [
    { label: 'Order Placed', date: '2026-02-05, 10:30 AM', completed: true },
    { label: 'Processing', date: '2026-02-05, 2:15 PM', completed: true },
    { label: 'Shipped', date: '2026-02-06, 9:00 AM', completed: true },
    { label: 'Out for Delivery', date: 'Expected today', completed: false },
    { label: 'Delivered', date: 'Pending', completed: false },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Track Order</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-lg mb-1">Order #ORD-2024-001</h3>
            <p className="text-sm text-gray-600">Expected Delivery: Feb 12, 2026</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
            In Transit
          </span>
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.completed ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? '✓' : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-0.5 h-12 ${step.completed ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="flex-1 pb-6">
                <h4 className="font-semibold mb-1">{step.label}</h4>
                <p className="text-sm text-gray-600">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/dashboard"
        className="text-indigo-600 font-semibold hover:underline"
      >
        ← Back to Orders
      </Link>
    </div>
  );
}
