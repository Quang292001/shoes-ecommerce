import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminCategoryApi } from "../api/adminCategoryApi";
import CategoryForm from "../components/CategoryForm";
import "../styles/AdminCategory.css";

const initialCategory = {
  name: "",
  description: "",
  isActive: true,
  image: null,
};

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await adminCategoryApi.getCategoryById(id);

      setCategory({
        name: data.name || "",
        description: data.description || "",
        isActive: data.isActive ?? true,
        image: null,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Load category failed");
    } finally {
      setLoading(false);
    }
  };

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

      await adminCategoryApi.updateCategory(id, {
        name: category.name.trim(),
        description: category.description.trim(),
        isActive: category.isActive,
        image: category.image,
      });

      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Update category failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="admin-category-page">Loading...</div>;
  }

  return (
    <div className="admin-category-page">
      <div className="admin-page-header">
        <div>
          <h1>Edit Category</h1>
          <p>Update category information</p>
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
        mode="edit"
        value={category}
        submitting={submitting}
        submitText="Update Category"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditCategory;
