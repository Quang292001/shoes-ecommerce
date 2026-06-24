import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import { useCart } from "/src/context/CartContext";
import { ordersApi } from "../../api/ordersApi";
import { useLanguage } from "../../../../context/LanguageContext";

function Cart() {
  const {t}=useLanguage();
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
      setCheckoutError(t.Your_cart_is_empty);
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

      <h1 className="cart-title">{t.Cart}</h1>

      <div className="cart-container">
        <div className="cart-table">
          <div className="cart-header">
            <p>{t.REMOVE}</p>
            <p>{t.IMAGE}</p>
            <p>{t.PRODUCT}</p>
            <p>{t.PRICE}</p>
            <p>{t.QUANTITY}</p>
            <p>{t.SUBTOTAL}</p>
          </div>

          {cartItems.length === 0 && (
            <div className="cart-empty">
              {t.Your_cart_is_empty}
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
            <h2>{t.Apply_Coupon}</h2>

            <div className="coupon-input">
              <input
                type="text"
                placeholder={t.Enter_your_coupon}
                disabled={isCheckingOut}
              />

              <button disabled={isCheckingOut}>{t.Apply}</button>
            </div>
          </div>

          <div className="cart-total">
            <h2>{t.Cart_Totals}</h2>

            <div className="total-row">
              <span>{t.SUBTOTAL}</span>
              <span>{totalPrice} VNĐ</span>
            </div>

            <div className="total-row">
              <span>{t.Shipping}</span>
              <span>{t.Free}</span>
            </div>

            <div className="total-row total">
              <span>{t.Total}</span>
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
              {isCheckingOut ? t.Processing : t.Proceed_To_Checkout}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;