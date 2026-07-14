import "./Checkout.css";
import { useState } from "react";
import { useCart } from "/src/context/CartContext";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";

function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const [step, setStep] = useState(1);
  const shippingFee = totalPrice >= 1000000 ? 0 : 20000;

  const discount = 0;

  const finalTotal = totalPrice + shippingFee - discount;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order placed successfully!");
  };

  return (
    <>
      <Navbar />

      <section className="checkout">
        <h1>
          Check<span>out</span>
        </h1>
        <div className="checkout-breadcrumb">
          <span>Home</span>

          <i className="fa-solid fa-chevron-right"></i>

          <span>Cart</span>

          <i className="fa-solid fa-chevron-right"></i>

          <span>Checkout</span>
        </div>

        <div className="checkout-progress">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
            Shipping
          </div>

          <div className="line"></div>

          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <span>2</span>
            Payment
          </div>

          <div className="line"></div>

          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <span>3</span>
            Success
          </div>
        </div>
        <div className="checkout-container">
          <div className="checkout-left">
            <div className="checkout-card">
              <h2>Shipping Information</h2>

              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="two-column">
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Address</label>

                  <textarea
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="checkout-card">
              <h2>Delivery Information</h2>
              <label className="shipping-option active">
                <input type="radio" name="shipping" checked readOnly />
                <div className="shipping-info">
                  <h4>🚚 Giao hàng tận nơi</h4>

                  <p>Nhận hàng trong 2 - 4 ngày</p>
                </div>

                <span className="shipping-price">20.000đ</span>
              </label>
            </div>
            <div className="checkout-card">
              <h2>Phương thức thanh toán</h2>

              <label className="payment-option active">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.payment === "cash"}
                  value="cash"
                  onChange={handleChange}
                />

                <div className="payment-info">
                  <h4>Thanh toán khi nhận hàng</h4>

                  <p>COD</p>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={formData.payment === "momo"}
                  onChange={handleChange}
                />

                <div className="payment-info">
                  <h4>Ví MoMo</h4>

                  <p>Thanh toán online</p>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="vnpay"
                  checked={formData.payment === "vnpay"}
                  onChange={handleChange}
                />

                <div className="payment-info">
                  <h4>VNPay</h4>

                  <p>Visa / MasterCard</p>
                </div>
              </label>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="checkout-right">
            <h2>Order Summary</h2>

            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <h3>Thông tin đơn hàng</h3>

                  <p>{cartItems.length} sản phẩm</p>
                </div>

                <i className="fa-solid fa-bag-shopping"></i>
              </div>

              {cartItems.map((item) => (
                <div className="summary-product" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="summary-content">
                    <div className="summary-top">
                      <h4>{item.name}</h4>

                      <span className="product-size">
                        Size: {item.size || 42}
                      </span>
                    </div>

                    <div className="summary-middle">
                      <span>Color: {item.color || "White"}</span>

                      <span>SL x {item.quantity}</span>
                    </div>

                    <div className="summary-bottom">
                      {(item.price * item.quantity).toLocaleString()} VNĐ
                    </div>
                  </div>
                </div>
              ))}
              <hr />

              <div className="summary-row">
                <span>Tạm tính</span>

                <span>{totalPrice.toLocaleString()} VNĐ</span>
              </div>

              <div className="summary-row">
                <span>Phí vận chuyển</span>

                <span>
                  {shippingFee === 0
                    ? "Miễn phí"
                    : shippingFee.toLocaleString() + " VNĐ"}
                </span>
              </div>

              <div className="summary-row">
                <span>Giảm giá</span>

                <span>-{discount.toLocaleString()} VNĐ</span>
              </div>

              <div className="summary-row total">
                <span>Tổng cộng</span>

                <span>{finalTotal.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="voucher-box">
              <h3 className="ticket-sale">
                <i className="fa-solid fa-ticket"></i>
                Mã giảm giá
              </h3>

              <div className="voucher-input">
                <input placeholder="Nhập mã giảm giá" />

                <button>Áp dụng</button>
              </div>
            </div>
            <button type="submit" form="checkout-form" className="checkout-btn">
              Đặt hàng
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;
