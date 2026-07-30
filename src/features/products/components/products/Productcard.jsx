import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "/src/context/CartContext";
import { useState } from "react";
import Toast from "../../../../shared/toast/Toast";
import { useLanguage } from "../../../../context/LanguageContext";
import { useFavorite } from "/src/context/FavoriteContext";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import { cartApi } from "../../../cart/api/cartApi";

function ProductCard({ id, image, name, description, price }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorite();
  const { addToCart } = useCart();

  const [isAddingToCart, setIsAddingToCart] = useState(false);
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

//   const handleAddToCart = async () => {
//     const accessToken = tokenStorage.getAccessToken();

//     if (!accessToken) {
//       navigate("/login", {
//         state: {
//           from: "/products",
//         },
//       });

//       return;
//     }

//     try {
//       setIsAddingToCart(true);
// console.log("Product ID:", id);

// console.log({
//   productId: id,
//   quantity: 1,
// });
//       await cartApi.addItem({
//         productId: id,
//         quantity: 1,
//       });

//       addToCart({
//         id,
//         name,
//         price,
//         image,
//         quantity: 1,
//       });

//       showToast(`${name} added to cart`, "success");
//     } catch (error) {
//       console.error("Add to cart failed:", error);

//       showToast(
//         error.response?.data?.message ||
//           error.response?.data?.title ||
//           "Failed to add product to cart",
//         "error"
//       );
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

const handleAddToCart = () => {
  addToCart({
    id,
    name,
    price,
    image,
    quantity: 1,
  });

  showToast(`${name} added to cart`, "success");
};
  return (
    <div className="card">
      <div className="small_card">
        <i
          className={`fa-heart ${
            isFavorite(id) ? "fa-solid active-heart" : "fa-solid"
          }`}
          onClick={() =>
            toggleFavorite({
              id,
              name,
              price,
              image,
              description,
            })
          }
        ></i>

        <i className="fa-solid fa-share"></i>
      </div>

      <div className="image" onClick={() => navigate(`/products/${id}`)}>
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
        {/* <button
          className="add-cart-btn"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? "Adding..." : t.add_to_cart}
        </button> */}
        <button
  className="add-cart-btn"
  onClick={handleAddToCart}
>
  {t.add_to_cart}
</button>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default ProductCard;