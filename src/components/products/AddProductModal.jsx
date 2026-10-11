import { useEffect, useState } from "react";
import { ImagePlus, X, Upload, Trash2 } from "lucide-react";

export default function AddProductModal({
  categories,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState(
    categories[0] || "beauty"
  );

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  // Release the temporary image URL when the component unmounts
  // or when the selected preview changes.
  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setImageFile(file);
  }

  function handleRemoveImage() {
    setImageFile(null);

    // Allow selecting the same file again.
    const input = document.getElementById("product-image");

    if (input) {
      input.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const parsedPrice = Number(price);

    if (!title.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError("Enter a price greater than zero.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description:
          description.trim() || "No description provided.",
        price: parsedPrice,
        category,
        imageFile,
        imagePreview,
      });
    } catch (submitError) {
      setError(
        submitError?.message ||
          "Could not add the product. Please try again."
      );
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div className="modal-heading-icon">
            <ImagePlus size={21} />
          </div>

          <div>
            <h2 id="modal-title">Add a product</h2>
            <p>
              Fill in the details to add it to your catalog.
            </p>
          </div>

          <button
            className="icon-button modal-close"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="product-form"
        >
          <label>
            Product name{" "}
            <span className="required-mark">*</span>

            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Wireless headphones"
              maxLength={100}
              required
              disabled={isSubmitting}
            />
          </label>

          <div className="form-row">
            <label>
              Price ($){" "}
              <span className="required-mark">*</span>

              <input
                type="number"
                min="0.01"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="49.99"
                required
                disabled={isSubmitting}
              />
            </label>

            <label>
              Category{" "}
              <span className="required-mark">*</span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                required
                disabled={isSubmitting}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Description

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="What makes this product special?"
              rows={3}
              maxLength={500}
              disabled={isSubmitting}
            />
          </label>

          {/* Product image upload */}
          <div className="image-upload-section">
            <span className="image-upload-label">
              Product image
            </span>

            {imagePreview ? (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt={`Preview of ${title || "new product"}`}
                  className="product-image-preview"
                />

                <button
                  className="remove-image-button"
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                  aria-label="Remove selected image"
                >
                  <Trash2 size={16} />
                  Remove image
                </button>
              </div>
            ) : (
              <label
                className="image-upload-box"
                htmlFor="product-image"
              >
                <Upload size={25} />

                <span className="image-upload-title">
                  Choose a product image
                </span>

                <span className="image-upload-hint">
                  JPG, PNG, WEBP or another image format · Max 5 MB
                </span>
              </label>
            )}

            <input
              id="product-image"
              className="image-file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add product"}
            </button>
          </div>

          <p className="form-note">* Required fields</p>
        </form>
      </section>
    </div>
  );
}