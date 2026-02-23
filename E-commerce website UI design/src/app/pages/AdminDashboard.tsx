import { Link, Outlet, useLocation } from 'react-router';
import { BarChart3, Package, Users, ShoppingBag, Tag, Settings, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { products } from '../data/products';

export function AdminDashboard() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/coupons', label: 'Coupons', icon: Tag },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white p-2 rounded-lg">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">ShopHub Management</p>
            </div>
          </div>
          <Link to="/" className="px-4 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Back to Store
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
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
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

// Analytics Dashboard
export function AdminAnalytics() {
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 320 },
    { month: 'Feb', sales: 52000, orders: 380 },
    { month: 'Mar', sales: 48000, orders: 350 },
    { month: 'Apr', sales: 61000, orders: 420 },
    { month: 'May', sales: 55000, orders: 390 },
    { month: 'Jun', sales: 67000, orders: 450 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Fashion', value: 25 },
    { name: 'Home', value: 20 },
    { name: 'Beauty', value: 15 },
    { name: 'Grocery', value: 5 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Revenue</p>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-1">$328,000</p>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Orders</p>
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-1">2,310</p>
          <p className="text-sm text-green-600">+8.3% from last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Products</p>
            <Package className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{products.length}</p>
          <p className="text-sm text-gray-600">Across 5 categories</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Customers</p>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold mb-1">1,845</p>
          <p className="text-sm text-green-600">+15.2% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-lg mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-lg mb-4">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-lg mb-4">Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Products Management
export function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-violet-600 transition-colors">
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Product</th>
                <th className="text-left px-6 py-4 font-semibold">Category</th>
                <th className="text-left px-6 py-4 font-semibold">Price</th>
                <th className="text-left px-6 py-4 font-semibold">Stock</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map(product => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 font-semibold">${product.price}</td>
                  <td className="px-6 py-4">{product.stockCount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock === 'in-stock' ? 'bg-green-100 text-green-700' :
                      product.stock === 'limited' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm font-semibold hover:bg-blue-100">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm font-semibold hover:bg-red-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Orders Management
export function AdminOrders() {
  const orders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2026-02-10', total: 299.99, status: 'processing' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2026-02-10', total: 549.99, status: 'shipped' },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2026-02-09', total: 189.99, status: 'delivered' },
    { id: 'ORD-004', customer: 'Alice Brown', date: '2026-02-09', total: 799.99, status: 'processing' },
    { id: 'ORD-005', customer: 'Charlie Wilson', date: '2026-02-08', total: 399.99, status: 'shipped' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Order ID</th>
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">Date</th>
                <th className="text-left px-6 py-4 font-semibold">Total</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-semibold">${order.total}</td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={order.status}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-semibold"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-1 bg-blue-50 text-blue-600 rounded text-sm font-semibold hover:bg-blue-100">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Customers Management
export function AdminCustomers() {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, spent: 2499.99, joined: '2025-08-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, spent: 1899.99, joined: '2025-09-22' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 15, spent: 3299.99, joined: '2025-07-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', orders: 5, spent: 999.99, joined: '2026-01-05' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Management</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Orders</th>
                <th className="text-left px-6 py-4 font-semibold">Total Spent</th>
                <th className="text-left px-6 py-4 font-semibold">Joined</th>
                <th className="text-left px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.orders}</td>
                  <td className="px-6 py-4 font-semibold">${customer.spent}</td>
                  <td className="px-6 py-4">{customer.joined}</td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-1 bg-blue-50 text-blue-600 rounded text-sm font-semibold hover:bg-blue-100">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Coupons Management
export function AdminCoupons() {
  const coupons = [
    { id: 1, code: 'SAVE10', discount: '10%', used: 145, limit: 1000, expiry: '2026-03-31', active: true },
    { id: 2, code: 'WELCOME20', discount: '20%', used: 89, limit: 500, expiry: '2026-12-31', active: true },
    { id: 3, code: 'SUMMER25', discount: '25%', used: 234, limit: 500, expiry: '2026-08-31', active: false },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Coupon Management</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-violet-600 transition-colors">
          Create New Coupon
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">{coupon.code}</h3>
                <p className="text-2xl font-bold text-indigo-600">{coupon.discount} OFF</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                coupon.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {coupon.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Used:</span>
                <span className="font-semibold">{coupon.used} / {coupon.limit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expires:</span>
                <span className="font-semibold">{coupon.expiry}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full"
                style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
              />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
