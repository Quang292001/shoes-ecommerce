import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { authApi } from "../../../auth/api/authApi";
import Toast from "../../../../shared/toast/Toast";
import { useCart } from "/src/context/CartContext";
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [quantity,setQuantity]=useState(1);

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
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: quantity,
    });
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <div>
      <Navbar />
      <div className="product_detail_container">
        {/* LEFT */}
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

        {/* RIGHT */}
        <div className="product_info">
          <p className="breadcrumb">Home / {product.categoryName}</p>

          <h1>{product.name}</h1>

          <h2>{product.price} VNĐ</h2>

          <div className="size_select">
            <label>Size</label>

            <select>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
            </select>
          </div>

          <div className="cart_section">
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} />

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>

          <div className="product_description">
            <h3>Product Details</h3>

            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}

export default ProductDetail;
