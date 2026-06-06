import "./Cart.css";
import { useState } from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 2,
      name: "Nike Revolution",
      price: 150,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    },
    {
      id: 3,
      name: "Nike Zoom",
      price: 180,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    },
  ]);

  const handleQuantityChange = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(value) } : item,
      ),
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="cart-image">
                <img src={item.image} alt={item.name} />
              </div>

              <p className="product-name">{item.name}</p>

              <p>{item.price} VNĐ</p>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />

              <p className="subtotal">{item.price * item.quantity} VNĐ</p>
            </div>
          ))}
        </div>

        <div className="cart-bottom">
          <div className="coupon-box">
            <h2>Apply Coupon</h2>

            <div className="coupon-input">
              <input type="text" placeholder="Enter your coupon" />

              <button>Apply</button>
            </div>
          </div>

          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="total-row">
              <span>Subtotal</span>
              <span>{total} VNĐ</span>
            </div>

            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="total-row total">
              <span>Total</span>
              <span>{total} VNĐ</span>
            </div>

            <button className="checkout-btn">Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
