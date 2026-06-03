import "./Products.css";

function ProductCard({ image, name, description, price }) {
  console.log(image);
  return (
    <div className="card">
      <div className="small_card">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-share"></i>
      </div>

      <div className="image">
        <img src={image} alt={name} />
      </div>

      <div className="product_text">
        <h2>{name}</h2>

        <p>{description}</p>

        <h3>{price} VNĐ</h3>
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
