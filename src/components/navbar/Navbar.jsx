import "./Navbar.css";

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
          <a href="#Home">Home</a>
        </li>
        <li>
          <a href="#Products">Products</a>
        </li>
        <li>
          <a href="#About">About</a>
        </li>
        <li>
          <a href="#Reviews">Reviews</a>
        </li>
        <li>
          <a href="#Services">Services</a>
        </li>
      </ul>

      <div className="icons">
        <i className="fas fa-heart"></i>
        <i className="fas fa-shopping-cart"></i>
        <i className="fas fa-user"></i>
      </div>
    </nav>
  );
}

export default Navbar;
