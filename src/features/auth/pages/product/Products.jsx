import "./Products.css";
import { useEffect, useMemo, useState } from "react";
import { authApi } from "../../../auth/api/authApi";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import { useLanguage } from "../../../../context/LanguageContext";
import ProductCard from "../../../products/components/products/Productcard";
import Nike from "../../../../assets/image/brands/nike.png";
import Adidas from "../../../../assets/image/brands/adidas.png";
import Puma from "../../../../assets/image/brands/puma.png";
import Converse from "../../../../assets/image/brands/converse.png";
import Vans from "../../../../assets/image/brands/vans.png";
const brands = [
  {
    name: "Nike",
    logo: Nike,
  },
  {
    name: "Adidas",
    logo: Adidas,
  },
  {
    name: "Puma",
    logo: Puma,
  },
  {
    name: "Vans",
    logo: Vans,
  },
  {
    name: "Converse",
    logo: Converse,
  },
];
function Products() {
  const [products, setProducts] = useState([]);
  const { t } = useLanguage();
  // FILTER STATES
  const [brandFilter, setBrandFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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
        (item) => item.brand?.toLowerCase() === brandFilter.toLowerCase(),
      );
    }
    if (categoryFilter) {
      result = result.filter(
        (item) => item.category?.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    // COLOR
    if (colorFilter) {
      result = result.filter(
        (item) => item.color?.toLowerCase() === colorFilter.toLowerCase(),
      );
    }

    // PRICE
    if (priceFilter === "under100") {
      result = result.filter((item) => item.price < 100);
    }

    if (priceFilter === "100to200") {
      result = result.filter((item) => item.price >= 100 && item.price <= 200);
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
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, brandFilter, colorFilter, priceFilter, sortOption]);

  return (
    <>
      <Navbar />
      <div className="products-page">
        <h1 className="products-title">
          <span>{t.products}</span>
        </h1>

        {/* FILTER SIDEBAR */}
        <>
          <div className="filter-bar">
            <div className="filter-section">
              <h3>{t.Brand}</h3>
              <div className="brand-chips">
                {brands.map((brand) => (
                  <button
                    key={brand.name}
                    className={`brand-btn ${
                      brandFilter === brand.name ? "active" : ""
                    }`}
                    onClick={() =>
                      setBrandFilter(
                        brandFilter === brand.name ? "" : brand.name,
                      )
                    }
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="brand-logo"
                    />

                    <span>{brand.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-section">
              <h3>{t.categories}</h3>
              <div className="category-grid">
                <div
                  className={`category-card ${
                    categoryFilter === "Running" ? "active" : ""
                  }`}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === "Running" ? "" : "Running",
                    )
                  }
                >
                  <i className="fa-solid fa-person-running"></i>
                  <span>{t.Running}</span>
                </div>

                <div
                  className={`category-card ${
                    categoryFilter === "Basketball" ? "active" : ""
                  }`}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === "Basketball" ? "" : "Basketball",
                    )
                  }
                >
                  <i className="fa-solid fa-basketball"></i>
                  <span>{t.Basketball}</span>
                </div>

                <div
                  className={`category-card ${
                    categoryFilter === "Fashion" ? "active" : ""
                  }`}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === "Fashion" ? "" : "Fashion",
                    )
                  }
                >
                  <i className="fa-solid fa-shirt"></i>
                  <span>{t.Fashion}</span>
                </div>
                <div
                  className={`category-card ${
                    categoryFilter === "Training" ? "active" : ""
                  }`}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === "Training" ? "" : "Training",
                    )
                  }
                >
                  <i className="fa-solid fa-dumbbell"></i>
                  <span>{t.Training}</span>
                </div>

                <div
                  className={`category-card ${
                    categoryFilter === "Hiking" ? "active" : ""
                  }`}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === "Hiking" ? "" : "Hiking",
                    )
                  }
                >
                  <i className="fa-solid fa-mountain"></i>
                  <span>{t.Hiking}</span>
                </div>

                <div
                  className={`category-card ${
                    categoryFilter === "Casual" ? "active" : ""
                  }`}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === "Casual" ? "" : "Casual",
                    )
                  }
                >
                  <i className="fa-solid fa-person-walking"></i>
                  <span>{t.Casual}</span>
                </div>
              </div>
            </div>
            {/* TOOLBAR */}
            <div className="filter-section">
              <h3>{t.filters}</h3>
              <div className="filter-toolbar">
                <select
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                >
                  <option value="">{t.Color}</option>
                  <option value="Black">{t.Black}</option>
                  <option value="White">{t.White}</option>
                  <option value="Blue">{t.Blue}</option>
                  <option value="Red">{t.Red}</option>
                </select>

                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="">{t.Price}</option>
                  <option value="under100">Dưới 100$</option>
                  <option value="100to200">100$ - 200$</option>
                  <option value="over200">Trên 200$</option>
                </select>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">{t.Sort}</option>
                  <option value="lowToHigh">{t.Low_price_to_high}</option>

                  <option value="highToLow">{t.Low_high_to_low}</option>

                  <option value="newest">{t.Newest}</option>
                </select>
              </div>
            </div>
          </div>

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
        </>
      </div>
      <Footer />
    </>
  );
}

export default Products;
