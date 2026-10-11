import { useState } from "react";

import Header from "./components/layout/Header";
import ProductToolbar from "./components/products/ProductToolbar";
import ProductGrid from "./components/products/ProductGrid";
import AddProductModal from "./components/products/AddProductModal";

import LoadingState from "./components/common/LoadingState";
import ErrorState from "./components/common/ErrorState";

import useProducts from "./hooks/useProducts";

import "./App.css";
import "./styles/products.css";

export default function App() {
  const {
    products,
    categories,
    searchQuery,
    selectedCategory,
    currentPage,
    totalProducts,
    totalPages,
    isLoading,
    error,
    handleSearchChange,
    handleCategoryChange,
    handleResetFilters,
    handleRetry,
    handlePageChange,
    handleAddProduct,
  } = useProducts();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  async function handleSubmitProduct(formData) {
    setIsAddingProduct(true);

    try {
      await handleAddProduct(formData);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add product:", err);
      throw err;
    } finally {
      setIsAddingProduct(false);
    }
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <section className="page-intro">
          <div>
            <span className="eyebrow">
              YOUR PRODUCT CATALOG
            </span>

            <h2>Explore products</h2>

            <p>
              Find what you need, discover something new,
              or add a product of your own.
            </p>
          </div>

          <div
            className="intro-stat"
            aria-label={`${totalProducts} products`}
          >
            <span className="intro-stat-number">
              {totalProducts}
            </span>

            <span className="intro-stat-label">
              Total products
            </span>
          </div>
        </section>

        <ProductToolbar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <section className="results-section" aria-live="polite">
          <div className="results-heading">
            <div>
              <h3>
                {selectedCategory === "all"
                  ? "All products"
                  : categories.find(
                      (category) =>
                        category.slug === selectedCategory
                    )?.name || selectedCategory}
              </h3>

              <p>
                Showing <strong>{totalProducts}</strong>{" "}
                {totalProducts === 1 ? "result" : "results"}
              </p>
            </div>

            {(searchQuery || selectedCategory !== "all") && (
              <button
                className="text-button"
                type="button"
                onClick={handleResetFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={handleRetry}
            />
          ) : (
            <>
              <ProductGrid
                products={products}
                onResetFilters={handleResetFilters}
              />

              {totalProducts > 0 && (
                <nav
                  className="pagination"
                  aria-label="Product pages"
                >
                  <button
                    className="secondary-button"
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      handlePageChange((page) => page - 1)
                    }
                  >
                    Previous
                  </button>

                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    className="secondary-button"
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      handlePageChange((page) => page + 1)
                    }
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </section>

        <footer className="page-footer">
          <span>Product Explorer</span>
          <span>Discover. Explore. Organize.</span>
        </footer>
      </main>

      {isAddModalOpen && (
        <AddProductModal
          categories={categories.map(
            (category) => category.slug
          )}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleSubmitProduct}
          isSubmitting={isAddingProduct}
        />
      )}
    </div>
  );
}