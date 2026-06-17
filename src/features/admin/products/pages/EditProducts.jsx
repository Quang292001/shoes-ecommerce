import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminProductApi } from "../api/adminProductApi";
import ProductForm from "../components/ProductForm";
import "../styles/AdminProduct.css";

const initialProduct = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  status: "Active",
  image: null,
};

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await adminProductApi.getProductById(id);

      setProduct({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        categoryId: data.categoryId || "",
        status: data.status || "Active",
        image: null,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Load product failed");
    } finally {
      setLoading(false);
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

    if (!product.categoryId.trim()) {
      setErrorMessage("Category Id is required");
      return;
    }

    if (!product.price || Number(product.price) <= 0) {
      setErrorMessage("Price must be greater than 0");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      await adminProductApi.updateProduct(id, {
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        categoryId: product.categoryId,
        status: product.status,
        image: product.image,
      });

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Update product failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="admin-product-page">Loading...</div>;
  }

  return (
    <div className="admin-product-page">
      <div className="admin-page-header">
        <div>
          <h1>Edit Product</h1>
          <p>Update product information</p>
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
        mode="edit"
        value={product}
        submitting={submitting}
        submitText="Update Product"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditProducts;