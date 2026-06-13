import "./Checkout.css";
import { useState } from "react";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    payment: "cash",
  });

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

        <div className="checkout-container">
          {/* FORM */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Shipping Information</h2>

            <div className="input-box">
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

            <div className="input-box">
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

            <div className="input-box">
              <label>Address</label>

              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="input-box">
              <label>Payment Method</label>

              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
              >
                <option value="cash">Cash On Delivery</option>
                <option value="bank">Bank Transfer</option>
                <option value="momo">Momo Wallet</option>
              </select>
            </div>

            <button type="submit" className="checkout-btn">
              Place Order
            </button>
          </form>

          {/* SUMMARY */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="summary-item">
              <span>Nike Air Max</span>
              <span>1.200.000 VNĐ</span>
            </div>

            <div className="summary-item">
              <span>Adidas Runner</span>
              <span>1.500.000 VNĐ</span>
            </div>

            <div className="summary-item total">
              <span>Total</span>
              <span>2.700.000 VNĐ</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;