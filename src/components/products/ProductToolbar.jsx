import { Plus, Search, SlidersHorizontal } from "lucide-react";

export default function ProductToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onAddClick,
}) {
  return (
    <section
      className="toolbar"
      aria-label="Search and filter products"
    >
      <div className="search-field">
        <Search size={19} aria-hidden="true" />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search products by name..."
          aria-label="Search products by name"
        />

        {searchQuery && (
          <button
            className="search-clear"
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="toolbar-actions">
        <label className="category-select">
          <SlidersHorizontal size={17} />

          <span className="sr-only">
            Filter by category
          </span>

          <select
            value={selectedCategory}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option
                key={category.slug}
                value={category.slug}
              >
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <button
          className="primary-button"
          type="button"
          onClick={onAddClick}
        >
          <Plus size={18} />
          <span>Add product</span>
        </button>
      </div>
    </section>
  );
}