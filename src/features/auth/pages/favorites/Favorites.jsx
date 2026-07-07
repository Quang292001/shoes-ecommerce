import "./Favorites.css";
import FavoriteCard from "../../../../features/auth/pages/favorites/FavoriteCard";
import { useNavigate } from "react-router-dom";

import { useFavorite } from "../../../../context/FavoriteContext";

import { useLanguage } from "../../../../context/LanguageContext";

import Navbar from "../../../../shared/layout/navbar/Navbar";
import Footer from "../../../../shared/layout/footer/Footer";

import ProductCard from "../../../products/components/products/ProductCard";

function Favorites() {
  const navigate = useNavigate();

  const { favoriteItems } = useFavorite();

  const { t } = useLanguage();

  if (favoriteItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="empty-favorite">
          <i className="fa-regular fa-heart"></i>

          <h2>Chưa có sản phẩm yêu thích</h2>

          <p>Hãy thêm sản phẩm bạn thích để xem lại sau.</p>

          <button onClick={() => navigate("/products")}>
            Tiếp tục mua sắm
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="favorites-page">
        <h1>
          ❤️ {t.Favorite_Products}
          <span>({favoriteItems.length})</span>
        </h1>

        <div className="favorite-grid">
          {favoriteItems.map((product) => (
            <FavoriteCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Favorites;
