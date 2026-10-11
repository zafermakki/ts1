import { ArrowUpRight, Star } from "lucide-react";

function getInitials(title) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div
        className={`product-image-wrap ${
          product.thumbnail ? "" : "placeholder-image"
        }`}
      >
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        ) : (
          <span className="product-placeholder" aria-hidden="true">
            {getInitials(product.title)}
          </span>
        )}

        <span className="category-pill">
          {product.category}
        </span>

        <button
          className="quick-view-button"
          type="button"
          aria-label={`View ${product.title}`}
        >
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-title-row">
          <h4 title={product.title}>
            {product.title}
          </h4>

          <span className="product-rating">
            <Star size={14} fill="currentColor" />
            {Number(product.rating || 0).toFixed(1)}
          </span>
        </div>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-card-bottom">
          <div>
            <span className="price-caption">Price</span>

            <span className="product-price">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <span className="product-id">
            ID #{product.id}
          </span>
        </div>
      </div>
    </article>
  );
}