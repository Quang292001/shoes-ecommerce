import "./Products.css";
import ProductCard from "./ProductCard";

import shoes1 from "../../../../assets/image/shoes1.png";
import shoes2 from "../../../../assets/image/shoes2.png";
import shoes3 from "../../../../assets/image/shoes3.png";
import shoes4 from "../../../../assets/image/shoes4.png";
import shoes5 from "../../../../assets/image/shoes5.png";
import shoes6 from "../../../../assets/image/shoes6.png";
import shoes7 from "../../../../assets/image/shoes7.png";
import shoes8 from "../../../../assets/image/shoes8.png";
function Products() {
  return (
    <div className="products" id="Products">
      <h1>Products</h1>
      <div className="box">
        <ProductCard image={shoes1} price="$250.99" />
        <ProductCard image={shoes2} price="$200.99" />
        <ProductCard image={shoes3} price="$175.99" />
        <ProductCard image={shoes4} price="$120.99" />
        <ProductCard image={shoes5} price="$150.99" />
        <ProductCard image={shoes6} price="$300.99" />
        <ProductCard image={shoes7} price="$250.99" />
        <ProductCard image={shoes8} price="$200.99" />
      </div>
    </div>
  );
}

export default Products;
