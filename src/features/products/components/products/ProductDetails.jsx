import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { authApi } from "../../../auth/api/authApi";
import Toast from "../../../../shared/toast/Toast";
import { useCart } from "/src/context/CartContext";
import { useLanguage } from "../../../../context/LanguageContext";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import { cartApi } from "../../../cart/api/cartApi";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const { addToCart } = useCart();
  const { t } = useLanguage();

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 1000);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await authApi.getProductDetails(id);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        showToast("Failed to load product details", "error");
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      navigate("/login", {
        state: {
          from: `/products/${id}`,
        },
      });

      return;
    }

    if (!product) {
      return;
    }

    if (quantity < 1) {
      showToast("Quantity must be greater than 0", "error");
      return;
    }

    try {
      setIsAddingToCart(true);

      const cartResponse = await cartApi.addItem({
        productId: product.id,
        quantity,
      });

      console.log("Cart updated:", cartResponse);

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity,
      });

      showToast(`${product.name} added to cart`, "success");
    } catch (error) {
      console.error("Add to cart failed:", error);

      showToast(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to add product to cart",
        "error"
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <h1>{t.loading}</h1>;
  }

  return (
    <div>
      <Navbar />

      <div className="product_detail_container">
        <div className="product_images">
          <div className="main_image_detail">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="thumbnail_list">
            <img src={product.imageUrl} alt="" />
            <img src={product.imageUrl} alt="" />
            <img src={product.imageUrl} alt="" />
            <img src={product.imageUrl} alt="" />
          </div>
        </div>

        <div className="product_info">
          <h1>{product.name}</h1>

          <h2>{product.price} VNĐ</h2>

          <div className="size_select">
            <label>{t.size}</label>

            <select>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
            </select>
          </div>

          <div className="cart_section">
            <input
              type="number"
              min="1"
              value={quantity}
              disabled={isAddingToCart}
              onChange={(event) => setQuantity(Number(event.target.value) || 1)}
            />

            <button onClick={handleAddToCart} disabled={isAddingToCart}>
              {isAddingToCart ? "Adding..." : t.add_to_cart}
            </button>
          </div>

          <div className="product_description">
            <h3>{t.product_details}</h3>

            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default ProductDetail;