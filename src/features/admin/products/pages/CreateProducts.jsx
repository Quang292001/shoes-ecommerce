import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminCategoryApi } from "../../categories/api/adminCategoryApi";
import { adminProductApi } from "../api/adminProductApi";
import ProductForm from "../components/ProductForm";
import "../styles/AdminProduct.css";
import { adminCategoryApi } from "../../categories/api/adminCategoryApi";

const initialProduct = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  initialStock: "",
  image: null,
};

function CreateProducts() {
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      setErrorMessage("");

      const response = await adminCategoryApi.getCategories(false);

      setCategories(response);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Load categories failed",
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (field, value) => {
    setProduct((currentProduct) => ({
      ...currentProduct,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!product.name.trim()) {
      setErrorMessage("Product name is required");
      return;
    }

    if (!product.categoryId) {
      setErrorMessage("Category is required");
      return;
    }

    if (!product.price || Number(product.price) <= 0) {
      setErrorMessage("Price must be greater than 0");
      return;
    }

    if (product.initialStock === "" || Number(product.initialStock) < 0) {
      setErrorMessage("Initial stock must be greater than or equal 0");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      await adminProductApi.createProduct({
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        categoryId: product.categoryId,
        initialStock: Number(product.initialStock),
        image: product.image,
      });

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Create product failed");
    } finally {
      setSubmitting(false);
    }
  };
  <ProductForm
    mode="create"
    value={product}
    categories={categories}
    submitting={submitting}
    submitText="Create Product"
    onChange={handleChange}
    onSubmit={handleSubmit}
  />;
  return (
    <div className="admin-product-page">
      <div className="admin-page-header">
        <div>
          <h1>Create Product</h1>
          <p>Add a new product to catalog</p>
        </div>

        <button
          className="admin-secondary-btn"
          onClick={() => navigate("/admin/products")}
        >
          Back
        </button>
      </div>

      {errorMessage && <div className="admin-error">{errorMessage}</div>}

      <ProductForm
        mode="create"
        value={product}
        categories={categories}
        loadingCategories={loadingCategories}
        submitting={submitting}
        submitText="Create Product"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateProducts;
