import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../../../shared/layout/navbar/Navbar";
import { authApi } from "../../../auth/api/authApi";
import Toast from "../../../../shared/toast/Toast";
import { useCart } from "/src/context/CartContext";
import { useLanguage } from "../../../../context/LanguageContext";
import { tokenStorage } from "../../../../shared/auth/tokenStorage";
import { cartApi } from "../../../cart/api/cartApi";
import Footer from "../../../../shared/layout/footer/Footer";
import ProductCard from "../../../products/components/products/ProductCard";
import { useFavorite } from "../../../../context/FavoriteContext";
const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Giày rất đẹp, mang cực kỳ êm chân.",
    date: "2 ngày trước",
  },
  {
    id: 2,
    name: "Lê Minh",
    rating: 4,
    comment: "Đúng như hình, giao nhanh.",
    date: "1 tuần trước",
  },
  {
    id: 3,
    name: "Hoàng Nam",
    rating: 5,
    comment: "Sẽ mua thêm lần nữa.",
    date: "2 tuần trước",
  },
];
const sizes = [
  {
    size: 39,
    stock: 0,
  },
  {
    size: 40,
    stock: 8,
  },
  {
    size: 41,
    stock: 15,
  },
  {
    size: 42,
    stock: 2,
  },
  {
    size: 43,
    stock: 0,
  },
];

function ProductDetail() {
  const { id } = useParams(); //hàm hook của react router, nó sẽ trả về một object chứa các tham số trong URL, ở đây là id của sản phẩm
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [activeTab, setActiveTab] = useState("details");
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectColor, setSelectColor] = useState("");
  const { toggleFavorite, isFavorite } = useFavorite();

  const showToast = (message, type) => {
    //truyền vào message và type để hiển thị thông báo
    setToast({ show: true, message, type }); // gán giá trị ban đầu của toast là true, message và type là giá trị truyền vào

    setTimeout(() => {
      //thiết lập thời gian để ẩn thông báo sau 100ms
      setToast({ show: false, message: "", type: "" }); // gán giá trị của toast là false, message và type là rỗng
    }, 1000);
  };
  useEffect(() => {
    // thực hiện khi component được render lần đầu tiên và khi id thay đổi, nó sẽ gọi API để lấy chi tiết sản phẩm dựa trên id từ URL,
    //  khi mở trang thì useEffect sẽ chạy và gọi API để lấy dữ liệu chi tiết sản phẩm, sau đó gán giá trị của product là detail trả về từ API,
    //  đồng thời tạo danh sách các sản phẩm để lọc ra những sản phẩm liên quan, chỉ lấy những sản phẩm có cùng thương hiệu hoặc cùng danh mục với sản phẩm hiện tại,
    //  và gán giá trị của relatedProducts là danh sách các sản phẩm liên quan.
    const fetchData = async () => {
      // hàm bất đồng bộ để gọi API và lấy dữ liệu chi tiết sản phẩm
      try {
        const detail = await authApi.getProductDetails(id); // gọi API để lấy chi tiết sản phẩm dựa trên id từ URL, await để chờ kết quả trả vể rồi chạy tiếp

        setProduct(detail); //gán giá trị của product là detail trả về từ API
        setSelectedImage(detail.imageUrl);
        const list = await authApi.getProducts(1, 50); // tạo danh sách các sản phẩm để lọc ra những sản phẩm liên quan, lấy 50 sản phẩm đầu tiên
        const related = list.items.filter(
          //lọc dữ liệu sản phẩm để chỉ lấy những sản phẩm có cùng thương hiệu hoặc cùng danh mục với sản phẩm hiện tại,
          // và không lấy sản phẩm hiện tại
          (item) =>
            item.id !== detail.id && // không lấy sản phẩm hiện tại và chỉ lấy những sản phẩm có cùng thương hiệu hoặc cùng danh mục
            (item.brand === detail.brand || //lấy sản phẩm có cùng thương hiệu hoặc cùng danh mục
              item.category === detail.category),
        );

        setRelatedProducts(related.slice(0, 4)); // lấy 4 sản phẩm liên quan đầu tiên và gán giá trị của relatedProducts là danh sách các sản phẩm liên quan
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // gọi lại hàm fetchData để lấy dữ liệu chi tiết sản phẩm và danh sách các sản phẩm liên quan nếu không thì React chỉ biết có hàm thôi
    // và không biết hàm đó làm gì, nên phải gọi lại hàm để thực hiện
  }, [id]); // dọi dependency array là [id] để khi id thay đổi thì useEffect sẽ chạy lại và gọi API để lấy dữ liệu chi tiết sản phẩm mới

  const handleAddToCart = async () => {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      navigate("/login", {
        state: {
          from: `/products/${id}`,
        },
      });

      return;
    }

    if (!product) {
      return;
    }

    if (quantity < 1) {
      showToast("Quantity must be greater than 0", "error");
      return;
    }

    try {
      setIsAddingToCart(true);

      const cartResponse = await cartApi.addItem({
        productId: product.id,
        quantity,
      });

      console.log("Cart updated:", cartResponse);

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity,
      });

      showToast(`${product.name} added to cart`, "success");
    } catch (error) {
      console.error("Add to cart failed:", error);

      showToast(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to add product to cart",
        "error",
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <h1>{t.loading}</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="container-product-detail">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Trang chủ</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span onClick={() => navigate("/products")}>Sản phẩm</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span>{product.name}</span>
        </div>
        <div className="product_detail_container">
          <div className="product_images">
            <div className="thumbnail_list">
              <img
                src={product.imageUrl}
                onClick={() => setSelectedImage(product.imageUrl)}
                alt=""
              />
              <img
                src={product.imageUrl}
                onClick={() => setSelectedImage(product.imageUrl)}
                alt=""
              />
              <img
                src={product.imageUrl}
                onClick={() => setSelectedImage(product.imageUrl)}
                alt=""
              />
              <img
                src={product.imageUrl}
                onClick={() => setSelectedImage(product.imageUrl)}
                alt=""
              />
              <img
                src={product.imageUrl}
                onClick={() => setSelectedImage(product.imageUrl)}
                alt=""
              />
            </div>
            <div className="main_image_detail">
              <img src={selectedImage} alt={product.name} />
            </div>
          </div>

          <div className="product_info">
            <h1>{product.name}</h1>

            <div className="product_star">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <span>(123 Đánh giá)</span>
            </div>

            <div className="stock-info">
              {!selectedSize && <span className="have-stock">Còn hàng</span>}

              {selectedSize?.stock > 0 && selectedSize?.stock <= 5 && (
                <span className="low-stock">
                  Chỉ còn {selectedSize.stock} sản phẩm
                </span>
              )}

              {selectedSize?.stock > 5 && (
                <span className="in-stock">
                  Còn {selectedSize.stock} sản phẩm
                </span>
              )}
            </div>

            <div className="price-box">
              <h2>{product.price.toLocaleString("vi-VN")} VNĐ VNĐ</h2>

              <span className="old-price">
                {product.originalPrice} 3,000,000 VNĐ
              </span>

              <span className="discount">-20%</span>
            </div>

            <div className="color-section">
              <h3>Màu sắc</h3>
              <div className="color-list">
                <button className="active">
                  <img src={product.imageUrl} />
                </button>

                <button>
                  <img src={product.imageUrl} />
                </button>

                <button>
                  <img src={product.imageUrl} />
                </button>
              </div>
            </div>

            <div className="size_section">
              <div className="size_header">
                <label>{t.size}</label>
                <div
                  className="choose_size"
                  onClick={() => setShowSizeGuide(true)}
                >
                  <i className="fa-solid fa-ruler"></i>
                  Hướng dẫn chọn size
                </div>
                {showSizeGuide && (
                  <div className="size-modal">
                    <div className="size-content">
                      <button
                        className="close-btn"
                        onClick={() => setShowSizeGuide(false)}
                      >
                        ×
                      </button>

                      <h2>Hướng dẫn chọn size</h2>

                      <table>
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th>Chiều dài chân</th>
                            <th>US</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>39</td>
                            <td>24.5 cm</td>
                            <td>6</td>
                          </tr>

                          <tr>
                            <td>40</td>
                            <td>25 cm</td>
                            <td>7</td>
                          </tr>

                          <tr>
                            <td>41</td>
                            <td>26 cm</td>
                            <td>8</td>
                          </tr>

                          <tr>
                            <td>42</td>
                            <td>26.5 cm</td>
                            <td>9</td>
                          </tr>

                          <tr>
                            <td>43</td>
                            <td>27.5 cm</td>
                            <td>10</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <div className="size_list">
                {sizes.map((item) => (
                  <button
                    key={item.size}
                    disabled={item.stock === 0}
                    className={`${
                      selectedSize?.size === item.size ? "active" : ""
                    }
                       ${item.stock === 0 ? "disabled-size" : ""}`}
                    onClick={() => setSelectedSize(item)}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="quantity-label">Số lượng</h3>
            <div className="quantity-box">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="action-buttons">
              <button disabled={selectedSize?.stock === 0} className="buy-now">
                Mua ngay
              </button>
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
                disabled={isAddingToCart || selectedSize?.stock === 0}
              >
                {isAddingToCart ? t.Adding : t.add_to_cart}
              </button>
              <div
                className="favorite-btn"
                onClick={() =>
                  toggleFavorite({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.imageUrl,
                    description: product.description,
                  })
                }
              >
                <i
                  className={
                    isFavorite(product.id)
                      ? "fa-solid fa-heart active-heart"
                      : "fa-regular fa-heart"
                  }
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-tabs">
        <div className="product-tabs">
          <button
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Chi tiết
          </button>

          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Mô tả
          </button>

          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá ({reviews.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "details" && (
            <div className="detail-table">
              <div className="detail-row">
                <span>Thương hiệu</span>
                <p>{product.brand}</p>
              </div>

              <div className="detail-row">
                <span>Danh mục</span>
                <p>{product.category}</p>
              </div>

              <div className="detail-row">
                <span>Màu sắc</span>
                <p>{product.color}</p>
              </div>

              <div className="detail-row">
                <span>Chất liệu</span>
                <p>Mesh Fabric</p>
              </div>

              <div className="detail-row">
                <span>Đế giày</span>
                <p>Rubber</p>
              </div>

              <div className="detail-row">
                <span>Bảo hành</span>
                <p>12 tháng</p>
              </div>
            </div>
          )}

          {activeTab === "description" && (
            <div className="description-box">
              <p>{product.description}</p>

              <ul>
                <li>✔ Thiết kế thời trang hiện đại.</li>

                <li>✔ Chất liệu cao cấp.</li>

                <li>✔ Thoáng khí.</li>

                <li>✔ Đế chống trơn trượt.</li>

                <li>✔ Phù hợp đi học, đi chơi và chạy bộ.</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="review-list">
              {reviews.map((review) => (
                <div className="review-card" key={review.id}>
                  <div className="review-header">
                    <strong>{review.name}</strong>

                    <span>{review.date}</span>
                  </div>

                  <div className="review-stars">
                    {[...Array(review.rating)].map((_, index) => (
                      <i key={index} className="fas fa-star"></i>
                    ))}
                  </div>

                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="related-products">
        <h2>Sản phẩm liên quan</h2>

        <div className="related-grid">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.imageUrl}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
      <Footer />
    </>
  );
}

export default ProductDetail;
