import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart"); //lưu cart vào localStorage để giữ trạng thái khi reload trang

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
  setCartItems((prevCartItems) => { //cập nhật cartItems dựa trên giá trị trước đó để tránh lỗi khi thêm nhiều sản phẩm liên tiếp
    const existingProduct = prevCartItems.find( //tìm sản phẩm đã tồn tại trong giỏ hàng
      (item) => item.id === product.id,
    );

    // nếu sản phẩm đã tồn tại
    if (existingProduct) {
      return prevCartItems.map((item) => //duyệt qua cartItems để cập nhật số lượng của sản phẩm đã tồn tại
        item.id === product.id //nếu là sản phẩm trùng id
          ? {
              ...item, //copy toàn bộ dữ liệu cũ
              quantity: item.quantity + product.quantity, //cập nhật số lượng bằng cách cộng thêm số lượng mới
            }
          : item, //nếu không phải sản phẩm trùng id thì giữ nguyên
      );
    }

    // nếu chưa tồn tại
    return [...prevCartItems, product];
  });
};

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
