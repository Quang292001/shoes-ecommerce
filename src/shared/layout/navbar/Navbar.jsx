import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
   const navigate = useNavigate();
  return (
    <nav>
      <div className="logo" onClick={() => navigate('/')}>
        <h1>
          Shoe<span>s</span>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
      </ul>

        {/* Thanh tìm kiếm */}
  <div className="search-box">
    <input type="text" placeholder="Search..." />
    <i className="fa-solid fa-magnifying-glass"></i>
  </div>

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
