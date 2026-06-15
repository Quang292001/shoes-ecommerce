import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../language/LanguageSwitcher";
import { useLanguage } from "../../../context/LanguageContext";
import { useCart } from "../../../context/CartContext";
function Navbar() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {totalItems}=useCart();
  return (
    <nav>
      <div className="logo" onClick={() => navigate("/")}>
        <h1>
          Shoe<span>s</span>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{t.home}</Link>
        </li>

        <li>
          <Link to="/products">{t.products}</Link>
        </li>

        <li>
          <Link to="/about">{t.about}</Link>
        </li>

        <li>
          <Link to="/reviews">{t.reviews}</Link>
        </li>

        <li>
          <Link to="/services">{t.services}</Link>
        </li>
      </ul>
      {/* Thanh tìm kiếm */}
      <div className="search-box">
        <input type="text" placeholder={t.search} />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="icons">
        <i className="fas fa-heart"></i>

        <Link to="/cart" className="cart_icon">
          <i className="fas fa-shopping-cart"></i>
          {totalItems>0 &&(<span className="cart_badge">{totalItems}</span>)}
        </Link>

        <Link to="/profile">
          <i className="fas fa-user"></i>
        </Link>
      </div>
      <LanguageSwitcher />
    </nav>
  );
}

export default Navbar;
