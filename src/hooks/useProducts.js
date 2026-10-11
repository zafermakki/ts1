import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCategories,
  getProducts,
  addProduct as createProduct,
} from "../services/productService";

const PAGE_SIZE = 10;
const STORAGE_KEY = "productExplorerPreferences";

const DEFAULT_PREFERENCES = {
  searchQuery: "",
  selectedCategory: "all",
  currentPage: 1,
};

function getSavedPreferences() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return DEFAULT_PREFERENCES;
    }

    const parsedValue = JSON.parse(savedValue);

    return {
      searchQuery:
        typeof parsedValue.searchQuery === "string"
          ? parsedValue.searchQuery
          : DEFAULT_PREFERENCES.searchQuery,

      selectedCategory:
        typeof parsedValue.selectedCategory === "string"
          ? parsedValue.selectedCategory
          : DEFAULT_PREFERENCES.selectedCategory,

      currentPage:
        Number.isInteger(parsedValue.currentPage) &&
        parsedValue.currentPage > 0
          ? parsedValue.currentPage
          : DEFAULT_PREFERENCES.currentPage,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export default function useProducts() {
  const [initialPreferences] = useState(getSavedPreferences);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchQuery, setSearchQuery] = useState(
    initialPreferences.searchQuery
  );

  const [selectedCategory, setSelectedCategory] = useState(
    initialPreferences.selectedCategory
  );

  const [currentPage, setCurrentPage] = useState(
    initialPreferences.currentPage
  );

  const [totalProducts, setTotalProducts] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalProducts / PAGE_SIZE)),
    [totalProducts]
  );

  // Persist search, category, and page preferences.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          searchQuery,
          selectedCategory,
          currentPage,
        })
      );
    } catch (err) {
      console.error("Could not save product preferences:", err);
    }
  }, [searchQuery, selectedCategory, currentPage]);

  // Fetch available categories.
  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const data = await getCategories();

        if (cancelled) return;

        setCategories(data);

        const savedCategoryExists =
          initialPreferences.selectedCategory === "all" ||
          data.some(
            (category) =>
              category.slug === initialPreferences.selectedCategory
          );

        if (!savedCategoryExists) {
          setSelectedCategory("all");
          setCurrentPage(1);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load categories:", err);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, [initialPreferences.selectedCategory]);

  // Fetch products based on the active filters and page.
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getProducts({
          search: searchQuery,
          category: selectedCategory,
          limit: PAGE_SIZE,
          skip: (currentPage - 1) * PAGE_SIZE,
        });

        if (cancelled) return;

        const availablePages = Math.max(
          1,
          Math.ceil(data.total / PAGE_SIZE)
        );

        if (currentPage > availablePages) {
          setCurrentPage(availablePages);
          return;
        }

        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err) {
        if (cancelled) return;

        setProducts([]);
        setTotalProducts(0);

        setError(
          "Could not load products. Check your internet connection and try again."
        );

        console.error("Failed to load products:", err);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [
    searchQuery,
    selectedCategory,
    currentPage,
    refreshKey,
  ]);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  }, []);

  const handleRetry = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  const handlePageChange = useCallback(
    (nextPage) => {
      setCurrentPage((page) => {
        const requestedPage =
          typeof nextPage === "function"
            ? nextPage(page)
            : nextPage;

        return Math.min(
          Math.max(1, requestedPage),
          totalPages
        );
      });
    },
    [totalPages]
  );

  const handleAddProduct = useCallback(async (formData) => {
    const newProduct = await createProduct({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
    });

    const productWithImage = {
      ...newProduct,
      thumbnail: formData.imagePreview || "",
    };

    setProducts((currentProducts) => [
      productWithImage,
      ...currentProducts.filter(
        (product) => product.id !== productWithImage.id
      ),
    ]);

    setTotalProducts((total) => total + 1);

    return productWithImage;
  }, []);

  return {
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
  };
}
