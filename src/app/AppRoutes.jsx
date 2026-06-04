import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../features/products/pages/home/Home";
import Login from "../features/auth/pages/login/Login";
import Register from "../features/auth/pages/register/Register";

import Profile from "../features/auth/pages/profile/Profile";
import Cart from "../features/cart/pages/cart/Cart";
import ProductDetail from "../features/products/components/products/ProductDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/products/:id"
        element={<ProductDetail />}
      />
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
    </Routes>
  );
}

export default AppRoutes;