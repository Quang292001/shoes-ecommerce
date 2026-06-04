import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../shared/layout/navbar/Navbar";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5143/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

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
            <input type="number" defaultValue={1} />

            <button>Add To Cart</button>
          </div>

          <div className="product_description">
            <h3>Product Details</h3>

            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
