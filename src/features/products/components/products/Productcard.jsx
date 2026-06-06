import "./Products.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "/src/context/CartContext";
import { useState } from "react";
import Toast from "../../../../shared/toast/Toast";

function ProductCard({
  id,
  image,
  name,
  description,
  price,
}) {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 1000);
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    });

    showToast(
      `${name} added to cart`,
      "success"
    );
  };

  return (
    <div className="card">
      <div className="small_card">
        <i className="fa-solid fa-heart"></i>

        <i className="fa-solid fa-share"></i>
      </div>

      <div
        className="image"
        onClick={() =>
          navigate(`/products/${id}`)
        }
      >
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
        <button
          className="add-cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}

export default ProductCard;