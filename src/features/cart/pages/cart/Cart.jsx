import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import { useCart } from "/src/context/CartContext";
import { ordersApi } from "../../api/ordersApi";
import { useLanguage } from "../../../../context/LanguageContext";

function Cart() {
  const { t } = useLanguage();
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

console.log("Access Token:", accessToken);
    if (!accessToken) {
      navigate("/login", {
        state: {
          from: "/cart",
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

      navigate("/checkout");
    } catch (error) {
      console.error("Checkout failed:", error);

      setCheckoutError(
        error.response?.data?.message ||
          error.response?.data?.title ||
          error.message ||
          "Checkout failed.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };
  const shippingFee = totalPrice >= 1000000 ? 0 : 30000;

  const discount = 0;

  const finalTotal = totalPrice + shippingFee - discount;
  return (
    <div className="cart-page">
      <Navbar />

      <h1 className="cart-title">{t.Cart}</h1>

      <div className="cart-container">
        <div className="cart-table">
          <div className="cart-header">
            <input type="checkbox" />
            <p>{t.IMAGE}</p>
            <p>{t.PRODUCT}</p>
            <p>{t.PRICE}</p>
            <p>{t.QUANTITY}</p>
            <p>{t.SUBTOTAL}</p>
            <p>{t.REMOVE}</p>
          </div>

          {cartItems.length === 0 && (
            <div className="cart-empty">{t.Your_cart_is_empty}</div>
          )}

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <input type="checkbox" />

              <div className="cart-image">
                <img src={item.image} alt={item.name} />
              </div>

              <p className="product-name">{item.name}</p>

              <p>{item.price.toLocaleString("vi-VN")} VNĐ</p>

              <div className="quantity-box-cart">
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
                {(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ
              </p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                disabled={isCheckingOut}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
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

          <div className="cart-summary">
            <h2>🧾 Tóm tắt đơn hàng</h2>
            {shippingFee > 0 ? (
              <div className="shipping-progress">
                🚚 Mua thêm{" "}
                <strong>
                  {(1000000 - totalPrice).toLocaleString("vi-VN")} 
                </strong>
                <span className="currency"> VNĐ </span>
                để được miễn phí vận chuyển.
              </div>
            ) : (
              <div className="free-shipping">
                🎉 Bạn đã được miễn phí vận chuyển.
              </div>
            )}
            <div className="summary-row">
              <span>Tạm tính</span>

              <span>{totalPrice.toLocaleString("vi-VN")} VNĐ</span>
            </div>

            <div className="summary-row">
              <span>Giảm giá</span>

              <span>-{discount.toLocaleString("vi-VN")} VNĐ</span>
            </div>

            <div className="summary-row">
              <span>Vận chuyển</span>

              <span>
                {shippingFee === 0
                  ? "Miễn phí"
                  : `${shippingFee.toLocaleString("vi-VN")} VNĐ`}
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Tổng cộng</span>

              <span>{finalTotal.toLocaleString("vi-VN")} VNĐ</span>
            </div>

            {checkoutError && <p className="checkout-error">{checkoutError}</p>}

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
            >
              {isCheckingOut ? "Đang xử lý..." : "Thanh toán ngay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
