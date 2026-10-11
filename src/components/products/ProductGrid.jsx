import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

export default function ProductGrid({
  products,
  onResetFilters,
}) {
  if (products.length === 0) {
    return (
      <EmptyState onReset={onResetFilters} />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}