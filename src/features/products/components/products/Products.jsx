import "./Products.css";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { authApi } from "../../../auth/api/authApi";


function Products() {
const [products, setProducts] = useState([]);
const [pageNumber, setPageNumber] = useState(1);
const [pageSize] = useState(8);
const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const data = await authApi.getProducts(pageNumber, pageSize);

        console.log(data);

        setProducts(data.items);
        setTotalCount(data.totalCount);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [pageNumber, pageSize]);

  return (
    <div className="products" id="Products">
      <h1>Products</h1>
      <div className="box">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.imageUrl}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
      <div className="pagination">
  <button
    className="page_btn"
    disabled={pageNumber === 1}
    onClick={() => setPageNumber(pageNumber - 1)}
  >
    <i className="fa-solid fa-angle-left"></i>
  </button>

  {[...Array(Math.ceil(totalCount / pageSize))].map(
    (_, index) => (
      <button
        key={index}
        className={`page_number ${
          pageNumber === index + 1 ? "active" : ""
        }`}
        onClick={() => setPageNumber(index + 1)}
      >
        {index + 1}
      </button>
    )
  )}

  <button
    className="page_btn"
    disabled={
      pageNumber === Math.ceil(totalCount / pageSize)
    }
    onClick={() => setPageNumber(pageNumber + 1)}
  >
    <i className="fa-solid fa-angle-right"></i>
  </button>
</div>
    </div>
  );
}

export default Products;
