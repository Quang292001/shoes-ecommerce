import "../styles/AdminCategory.css";

function CategoryForm({
  value,
  mode,
  submitting,
  submitText,
  onChange,
  onSubmit,
}) {
  return (
    <form className="admin-category-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Category Name</label>

        <input
          type="text"
          value={value.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Running Shoes"
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          value={value.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Category description"
        />
      </div>

      {mode === "edit" && (
        <label className="category-checkbox">
          <input
            type="checkbox"
            checked={value.isActive}
            onChange={(event) => onChange("isActive", event.target.checked)}
          />

          Active
        </label>
      )}

      <div className="form-group">
        <label>Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(event) => onChange("image", event.target.files[0])}
        />
      </div>

      <button className="admin-submit-btn" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitText}
      </button>
    </form>
  );
}

export default CategoryForm;