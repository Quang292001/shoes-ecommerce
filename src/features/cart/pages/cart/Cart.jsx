import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import { useCart } from "/src/context/CartContext";
import { ordersApi } from "../../api/ordersApi";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = async () => {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      navigate("/login", {
        state: {
          from: "/checkout",
        },
      });

      return;
    }

    if (cartItems.length === 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    try {
      setIsCheckingOut(true);
      setCheckoutError("");

      const response = await ordersApi.checkoutCart();

      console.log("Checkout success:", response);

      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed:", error);

      setCheckoutError(
        error.response?.data?.message ||
          error.response?.data?.title ||
          error.message ||
          "Checkout failed."
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="cart-page">
      <Navbar />

      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-table">
          <div className="cart-header">
            <p>REMOVE</p>
            <p>IMAGE</p>
            <p>PRODUCT</p>
            <p>PRICE</p>
            <p>QUANTITY</p>
            <p>SUBTOTAL</p>
          </div>

          {cartItems.length === 0 && (
            <div className="cart-empty">
              Your cart is empty.
            </div>
          )}

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                disabled={isCheckingOut}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="cart-image">
                <img src={item.image} alt={item.name} />
              </div>

              <p className="product-name">{item.name}</p>

              <p>{item.price} VNĐ</p>

              <div className="quantity-box">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={isCheckingOut}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  disabled={isCheckingOut}
                >
                  +
                </button>
              </div>

              <p className="subtotal">
                {item.price * item.quantity} VNĐ
              </p>
            </div>
          ))}
        </div>

        <div className="cart-bottom">
          <div className="coupon-box">
            <h2>Apply Coupon</h2>

            <div className="coupon-input">
              <input
                type="text"
                placeholder="Enter your coupon"
                disabled={isCheckingOut}
              />

              <button disabled={isCheckingOut}>Apply</button>
            </div>
          </div>

          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="total-row">
              <span>Subtotal</span>
              <span>{totalPrice} VNĐ</span>
            </div>

            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="total-row total">
              <span>Total</span>
              <span>{totalPrice} VNĐ</span>
            </div>

            {checkoutError && (
              <p className="checkout-error">
                {checkoutError}
              </p>
            )}

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
            >
              {isCheckingOut ? "Processing..." : "Proceed To Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;