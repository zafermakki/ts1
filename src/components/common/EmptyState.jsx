import { PackageSearch } from "lucide-react";

export default function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <PackageSearch size={30} />
      </div>

      <h3>No products found</h3>

      <p>
        Try another search term or choose a different category.
      </p>

      <button
        className="secondary-button"
        type="button"
        onClick={onReset}
      >
        Clear search and filters
      </button>
    </div>
  );
}