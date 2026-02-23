import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { ProductListing } from "./pages/ProductListing";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Dashboard, Orders, Wishlist, Addresses, Profile, OrderTracking } from "./pages/UserDashboard";
import { 
  AdminDashboard, 
  AdminAnalytics, 
  AdminProducts, 
  AdminOrders, 
  AdminCustomers, 
  AdminCoupons 
} from "./pages/AdminDashboard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "products",
        Component: ProductListing,
      },
      {
        path: "product/:id",
        Component: ProductDetail,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          {
            index: true,
            Component: Orders,
          },
          {
            path: "orders",
            Component: Orders,
          },
          {
            path: "wishlist",
            Component: Wishlist,
          },
          {
            path: "addresses",
            Component: Addresses,
          },
          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "track/:orderId",
            Component: OrderTracking,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboard,
    children: [
      {
        index: true,
        Component: AdminAnalytics,
      },
      {
        path: "products",
        Component: AdminProducts,
      },
      {
        path: "orders",
        Component: AdminOrders,
      },
      {
        path: "customers",
        Component: AdminCustomers,
      },
      {
        path: "coupons",
        Component: AdminCoupons,
      },
    ],
  },
]);