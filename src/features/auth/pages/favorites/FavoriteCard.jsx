import "./FavoriteCard.css";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../../../context/FavoriteContext";
import { useCart } from "../../../../context/CartContext";
import { formatPrice } from "../../../../utils/formatPrice";
function FavoriteCard({ product }) {
  const navigate = useNavigate();

  const { toggleFavorite } = useFavorite();

  const { addToCart } = useCart();

  return (
    <div className="favorite-card">
      <button
        className="remove-favorite"
        onClick={() => toggleFavorite(product)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>

      <div
        className="favorite-image"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img src={product.image} alt={product.name} />
      </div>

      <div className="favorite-content">
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <div className="favorite-stars">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>

          <span>(123)</span>
        </div>

        <h3>{formatPrice(product.price)} </h3>

        <div className="favorite-buttons">
          <button
            onClick={() =>
              addToCart({
                ...product,
                quantity: 1,
              })
            }
          >
            <i className="fa-solid fa-cart-shopping"></i>
            Thêm vào giỏ
          </button>

          <button
            className="detail-btn"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
