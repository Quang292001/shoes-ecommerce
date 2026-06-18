import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../features/products/pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import Register from "../features/auth/pages/register/Register";
import Profile from "../features/auth/pages/profile/Profile";
import Cart from "../features/cart/pages/cart/Cart";
import ProductDetail from "../features/products/components/products/ProductDetails";
import ForgotPassword from "../features/auth/pages/forgotpassword/ForgotPassword";
import ResetPassword from "../features/auth/pages/resetpassword/ResetPassword";
import About from "../features/auth/pages/about/About";
import Products from "../features/auth/pages/product/Products";
import Services from "../features/auth/pages/services/Services";
import Reviews from "../features/auth/pages/reviews/Reviews";
import Favorites from "../features/auth/pages/favorites/Favorites";

import AdminLayout from "../features/admin/layout/AdminLayout";
import AdminDashboard from "../features/admin/pages/AdminDashboard";

import AdminProductList from "../features/admin/products/pages/AdminProductList";
import CreateProducts from "../features/admin/products/pages/CreateProducts";
import EditProducts from "../features/admin/products/pages/EditProducts";

import AdminCategoryList from "../features/admin/categories/pages/AdminCategoryList";
import CreateCategory from "../features/admin/categories/pages/CreateCategory";
import EditCategory from "../features/admin/categories/pages/EditCategory";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/favorites" element={<Favorites />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="products" element={<AdminProductList />} />
        <Route path="products/create" element={<CreateProducts />} />
        <Route path="products/:id/edit" element={<EditProducts />} />

        <Route path="categories" element={<AdminCategoryList />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/:id/edit" element={<EditCategory />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;