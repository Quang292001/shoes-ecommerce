
import "./Products.css";
import ProductCard from "../../../../features/products/components/products/Productcard";
import { useEffect, useMemo, useState } from "react";
import { authApi } from "../../../auth/api/authApi";
import Navbar from "../../../../shared/layout/navbar/Navbar"
import Footer from "../../../../shared/layout/footer/Footer"
import { useLanguage } from "../../../../context/LanguageContext";
function Products() {
  const [products, setProducts] = useState([]);
  const {t}=useLanguage();
  // FILTER STATES
  const [brandFilter, setBrandFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await authApi.getProducts(1, 50);
        setProducts(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // BRAND
    if (brandFilter) {
      result = result.filter(
        (item) =>
          item.brand?.toLowerCase() ===
          brandFilter.toLowerCase()
      );
    }

    // COLOR
    if (colorFilter) {
      result = result.filter(
        (item) =>
          item.color?.toLowerCase() ===
          colorFilter.toLowerCase()
      );
    }

    // PRICE
    if (priceFilter === "under100") {
      result = result.filter((item) => item.price < 100);
    }

    if (priceFilter === "100to200") {
      result = result.filter(
        (item) => item.price >= 100 && item.price <= 200
      );
    }

    if (priceFilter === "over200") {
      result = result.filter((item) => item.price > 200);
    }

    // SORT
    if (sortOption === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return result;
  }, [
    products,
    brandFilter,
    colorFilter,
    priceFilter,
    sortOption,
  ]);

  return (
    <>
    <Navbar/>
    <div className="products-page">
      <h1 className="products-title">
        <span>{t.products}</span>
        
      </h1>

      {/* FILTER SIDEBAR */}
      <div className="products-layout">
        <div className="filter-sidebar">
          <h2>{t.filters}</h2>

          {/* BRAND */}
          <div className="filter-group">
            <label>{t.Brand}</label>

            <select
              value={brandFilter}
              onChange={(e) =>
                setBrandFilter(e.target.value)
              }
            >
              <option value="">{t.All}</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
            </select>
          </div>

          {/* COLOR */}
          <div className="filter-group">
            <label>{t.Color}</label>

            <select
              value={colorFilter}
              onChange={(e) =>
                setColorFilter(e.target.value)
              }
            >
              <option value="">{t.All}</option>
              <option value="Black">{t.Black}</option>
              <option value="White">{t.White}</option>
              <option value="Blue">{t.Blue}</option>
            </select>
          </div>

          {/* PRICE */}
          <div className="filter-group">
            <label>{t.Price}</label>

            <select
              value={priceFilter}
              onChange={(e) =>
                setPriceFilter(e.target.value)
              }
            >
              <option value="">{t.All}</option>
              <option value="under100">
                Under 100$
              </option>

              <option value="100to200">
                100$ - 200$
              </option>

              <option value="over200">
                Over 200$
              </option>
            </select>
          </div>

          {/* SORT */}
          <div className="filter-group">
            <label>{t.Sort_By}</label>

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
            >
              <option value="">{t.Default}</option>

              <option value="lowToHigh">
                {t.Price_Low_To_High}
              </option>

              <option value="highToLow">
                {t.Price_High_To_Low}
              </option>

              <option value="newest">
                {t.Newest}
              </option>
            </select>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
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
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Products;

