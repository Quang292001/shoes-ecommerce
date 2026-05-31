import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer>
      <div className="footer_main">
        <div className="tag">
          <h1>Contact</h1>

          <a href="#">
            <i className="fas fa-home"></i>123/Colombo/Sri Lanka
          </a>

          <a href="#">
            <i className="fas fa-phone"></i>+94 12 345 6789
          </a>

          <a href="#">
            <i className="fas fa-envelope"></i>contact@gmail.com
          </a>
        </div>

        <div className="tag">
          <h1>Get Help</h1>

          <a href="#">FAQ</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Payment Options</a>
        </div>

        <div className="tag">
          <h1>Our Stores</h1>

          <a href="#">Sri Lanka</a>
          <a href="#">USA</a>
          <a href="#">India</a>
          <a href="#">Japan</a>
        </div>

        <div className="tag">
          <h1>Follow Us</h1>

          <div className="social_link">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="tag">
          <h1>Newsletter</h1>

          <div className="search_bar">
            <input type="text" placeholder="You email id here" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
