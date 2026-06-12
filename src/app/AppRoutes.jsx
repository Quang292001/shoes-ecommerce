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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<ProductDetail />} />
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
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/services" element={<Services />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default AppRoutes;
