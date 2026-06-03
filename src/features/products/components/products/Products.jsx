import "./Products.css";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { authApi } from "../../../auth/api/authApi";


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await authApi.getProducts();

        console.log(data);

        setProducts(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products" id="Products">
      <h1>Products</h1>
      <div className="box">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.imageUrl}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
