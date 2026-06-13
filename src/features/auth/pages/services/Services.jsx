import React from 'react'
import Navbar from '../../../../shared/layout/navbar/Navbar'
import Footer from '../../../../shared/layout/footer/Footer'
import './Services.css'
function Services() {
  return (
    <>
      <Navbar />
     <section className="services" id="Services">
      <h1>
        Our <span>Services</span>
      </h1>

      <div className="services-container">
        <div className="service-card">
          <i className="fas fa-truck"></i>

          <h2>Fast Delivery</h2>

          <p>
            We provide fast and secure delivery to ensure your products
            arrive safely and on time.
          </p>
        </div>

        <div className="service-card">
          <i className="fas fa-undo"></i>

          <h2>Easy Return</h2>

          <p>
            Not satisfied? No worries. Enjoy our simple and flexible
            return policy.
          </p>
        </div>

        <div className="service-card">
          <i className="fas fa-headset"></i>

          <h2>24/7 Support</h2>

          <p>
            Our support team is always ready to help you anytime and
            anywhere.
          </p>
        </div>

        <div className="service-card">
          <i className="fas fa-shield-alt"></i>

          <h2>Secure Payment</h2>

          <p>
            Shop confidently with our trusted and secure payment system.
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default Services
