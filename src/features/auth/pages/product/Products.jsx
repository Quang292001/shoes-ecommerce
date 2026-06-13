import "./Products.css";
import { useState } from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";
import ProductCard from "../../../products/components/products/ProductCard";


function Products() {
  const [products,setProducts]= useState([]);

  //Filter states
  const [brandFilter, setBrandFilter] = useState();
  const [priceFilter, setPriceFilter] = useState();
  const [colorFilter, setColorFilter] = useState();
  const [sortOption, setSortOption] = useState();

  useEffect(()=>{
    const fetchProducts=async()=>{
      try{
        const data=await authApi.getProducts(1,50);
        setProducts(data.items);
      }catch(error){
        console.log(error);
        console.error("Error fetching products:",error);
      }
    };
    fetchProducts();
  }, []);

  

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />

      <section className="products-page">
        <h1>
          Our <span>Products</span>
        </h1>

        {/* FILTER */}
        <div className="products-top">
          <div className="filter-buttons">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>

            <button
              className={selectedCategory === "Nike" ? "active" : ""}
              onClick={() => setSelectedCategory("Nike")}
            >
              Nike
            </button>

            <button
              className={selectedCategory === "Adidas" ? "active" : ""}
              onClick={() => setSelectedCategory("Adidas")}
            >
              Adidas
            </button>

            <button
              className={selectedCategory === "Puma" ? "active" : ""}
              onClick={() => setSelectedCategory("Puma")}
            >
              Puma
            </button>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <i className="fas fa-search"></i>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Products;