import { useFavorite } from "../../../../context/FavoriteContext";
import Footer from "../../../../shared/layout/footer/Footer";
import Navbar from "../../../../shared/layout/navbar/Navbar";

function Favorites() {
  const { favoriteItems } = useFavorite();

  return (

    <>
    <Navbar/>
    <div className="favorites-page">
      <h1>Favorite Products</h1>

      <div className="products-grid">
        {favoriteItems.map((item) => (
          <div
            className="product-card"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <h2>{item.name}</h2>

            <p>{item.price} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Favorites;