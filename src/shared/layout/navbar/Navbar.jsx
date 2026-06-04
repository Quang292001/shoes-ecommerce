import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h1>
          Shoe<span>s</span>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#Products">Products</a>
        </li>
        <li>
          <a href="/#About">About</a>
        </li>
        <li>
          <a href="/#Reviews">Reviews</a>
        </li>
        <li>
          <a href="/#Services">Services</a>
        </li>
      </ul>

      <div className="icons">
        <i className="fas fa-heart"></i>

        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>

        <Link to="/profile">
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
