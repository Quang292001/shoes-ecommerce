import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminProductApi } from "../api/adminProductApi";
import "../styles/AdminProduct.css";

function AdminProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await adminProductApi.getProducts();

      setProducts(Array.isArray(data) ? data : data.items || []);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Load products failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) {
      return;
    }

    try {
      await adminProductApi.deleteProduct(productId);
      await loadProducts();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Delete product failed");
    }
  };

  if (loading) {
    return <div className="admin-product-page">Loading...</div>;
  }

  return (
    <div className="admin-product-page">
      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>Manage catalog products</p>
        </div>

        <button
          className="admin-primary-btn"
          type="button"
          onClick={() => navigate("/admin/products/create")}
        >
          Create Product
        </button>
      </div>

      {errorMessage && <div className="admin-error">{errorMessage}</div>}

      <div className="admin-table-card">
        <table className="admin-product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th className="action-column">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.imageUrl ? (
                    <img
                      className="product-thumb"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  ) : (
                    <div className="product-thumb-placeholder">No Image</div>
                  )}
                </td>

                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.categoryName || product.categoryId || "-"}</td>
                <td>
                  <span
                    className={
                      product.status === "Active" || product.isActive
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {product.status || (product.isActive ? "Active" : "Inactive")}
                  </span>
                </td>

                <td className="action-column">
                  <button
                    className="admin-edit-btn"
                    type="button"
                    onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-delete-btn"
                    type="button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProductList;