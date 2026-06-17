import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminCategoryApi } from "../api/adminCategoryApi";
import CategoryForm from "../components/CategoryForm";
import "../styles/AdminCategory.css";

const initialCategory = {
  name: "",
  description: "",
  image: null,
};

function CreateCategory() {
  const navigate = useNavigate();

  const [category, setCategory] = useState(initialCategory);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field, value) => {
    setCategory((currentCategory) => ({
      ...currentCategory,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category.name.trim()) {
      setErrorMessage("Category name is required");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      await adminCategoryApi.createCategory({
        name: category.name.trim(),
        description: category.description.trim(),
        image: category.image,
      });

      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Create category failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-category-page">
      <div className="admin-page-header">
        <div>
          <h1>Create Category</h1>
          <p>Add a new product category</p>
        </div>

        <button
          className="admin-secondary-btn"
          type="button"
          onClick={() => navigate("/admin/categories")}
        >
          Back
        </button>
      </div>

      {errorMessage && <div className="admin-error">{errorMessage}</div>}

      <CategoryForm
        mode="create"
        value={category}
        submitting={submitting}
        submitText="Create Category"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateCategory;