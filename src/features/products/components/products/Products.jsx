import "./Products.css";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../auth/api/authApi";
import { useLanguage } from "../../../../context/LanguageContext";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await authApi.getProducts(1, 50);
        setProducts(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Bán chạy
  const bestSellingProducts = products.slice(0, 8);

  // Giảm giá
  const saleProducts = products.slice(8, 16);

  // Tìm kiếm hàng đầu
  const topSearchProducts = products.slice(16, 24);

  const renderProducts = (list) => {
    return list.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        image={product.imageUrl}
        name={product.name}
        description={product.description}
        price={product.price}
      />
    ));
  };

  return (
    <div className="products" id="Products">
      <h1>{t.products}</h1>

      {/* Header section */}
      <h2 className="section_title">{t.bestseller}</h2>

      <div className="box">{renderProducts(bestSellingProducts)}</div>
      <div className="view-more-wrapper">
        <button className="view-more-btn" onClick={() => navigate("/products")}>
          <span>Xem thêm →</span>
        </button>
      </div>

      <h2 className="section_title">{t.sale}</h2>

      <div className="box">{renderProducts(saleProducts)}</div>
      <div className="view-more-wrapper">
        <button className="view-more-btn" onClick={() => navigate("/products")}>
          <span>Xem thêm →</span>
        </button>
      </div>

      <h2 className="section_title">{t.top_search}</h2>

      <div className="box">{renderProducts(topSearchProducts)}</div>
      <div className="view-more-wrapper">
        <button className="view-more-btn" onClick={() => navigate("/products")}>
          <span>Xem thêm →</span>
        </button>
      </div>
    </div>
  );
}

export default Products;
