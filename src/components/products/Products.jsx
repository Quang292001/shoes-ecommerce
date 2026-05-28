import ProductCard from "./ProductCard";
import "./Products.css";
function Products() {
  return (
    <div className="products" id="Products">
      <h1>Products</h1>

      <div className="box">
        <ProductCard image="/image/shoes1.png" price="$100.99" />

        <ProductCard image="/image/shoes2.png" price="$200.99" />

        <ProductCard image="/image/shoes3.png" price="$150.99" />
      </div>
    </div>
  );
}

export default Products;
