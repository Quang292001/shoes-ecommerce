import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  // Lấy dữ liệu từ localStorage
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  // Mỗi khi favoriteItems thay đổi -> lưu lại
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favoriteItems),
    );
  }, [favoriteItems]);

  // Thêm / xóa yêu thích
  const toggleFavorite = (product) => {
    const exists = favoriteItems.find(
      (item) => item.id === product.id,
    );

    if (exists) {
      setFavoriteItems(
        favoriteItems.filter(
          (item) => item.id !== product.id,
        ),
      );
    } else {
      setFavoriteItems([
        ...favoriteItems,
        product,
      ]);
    }
  };

  // Kiểm tra đã yêu thích chưa
  const isFavorite = (id) => {
    return favoriteItems.some(
      (item) => item.id === id,
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
}