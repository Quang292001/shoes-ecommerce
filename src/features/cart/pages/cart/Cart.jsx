import "./Cart.css";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { useCart } from "/src/context/CartContext";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();
const handleCheckout = () => {
  const accessToken = tokenStorage.getAccessToken();

  if (!accessToken) {
    navigate("/login", {
      state: {
        from: "/checkout", //"Tôi muốn sau login quay lại checkout"
      },
    });

    return;
  }

  navigate("/checkout");
};
  return (
    <div className="cart-page">
      <Navbar />

      <h1 className="cart-title">
        Shopping Cart
      </h1>

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

          {cartItems.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="cart-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <p className="product-name">
                {item.name}
              </p>

              <p>{item.price} VNĐ</p>

              <div className="quantity-box">
                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>
              </div>

              <p className="subtotal">
                {item.price * item.quantity}
                VNĐ
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
              />

              <button>Apply</button>
            </div>
          </div>

          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="total-row">
              <span>Subtotal</span>

              <span>
                {totalPrice} VNĐ
              </span>
            </div>

            <div className="total-row">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <div className="total-row total">
              <span>Total</span>

              <span>
                {totalPrice} VNĐ
              </span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;