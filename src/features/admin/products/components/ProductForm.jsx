import "../styles/AdminProduct.css";

function ProductForm({
  value,
  categories = [],
  mode,
  loadingCategories = false,
  submitting,
  submitText,
  onChange,
  onSubmit,
}) {
  return (
    <form className="admin-product-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          value={value.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Nike Air Zoom"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={value.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Product description"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            min="0"
            value={value.price}
            onChange={(event) => onChange("price", event.target.value)}
            placeholder="120"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={value.categoryId}
            onChange={(event) => onChange("categoryId", event.target.value)}
            disabled={submitting || loadingCategories}
          >
            <option value="">
              {loadingCategories ? "Loading categories..." : "Select category"}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mode === "create" && (
        <div className="form-group">
          <label>Initial Stock</label>
          <input
            type="number"
            min="0"
            value={value.initialStock}
            onChange={(event) => onChange("initialStock", event.target.value)}
            placeholder="100"
          />
        </div>
      )}

      {mode === "edit" && (
        <div className="form-group">
          <label>Status</label>
          <select
            value={value.status}
            onChange={(event) => onChange("status", event.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
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

export default ProductForm;