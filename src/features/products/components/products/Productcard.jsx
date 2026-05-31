import "./Products.css";
function ProductCard({ image, price }) {
  return (
    <div className="card">
      <div className="small_card">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-share"></i>
      </div>

      <div className="image">
        <img src={image} alt="shoe" />
      </div>

      <div className="product_text">
        <h2>NIKE</h2>

        <p>Lorem ipsum dolor sit amet.</p>

        <h3>{price}</h3>
      </div>

      <div className="product_star">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>

      <div className="button">
        <a href="#">Add to Cart</a>
      </div>
    </div>
  );
}

export default ProductCard;
