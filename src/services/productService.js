const BASE_URL = "https://dummyjson.com/products";

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getCategories() {
  const categories = await request(`${BASE_URL}/categories`);

  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
  }));
}

export async function getProducts({
  search = "",
  category = "all",
  limit = 10,
  skip = 0,
} = {}) {
  const query = search.trim();

  // When search and category are both selected,
  if (query && category !== "all") {
    const data = await request(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=0`
    );

    const filteredProducts = data.products.filter(
      (product) => product.category === category
    );

    return {
      products: filteredProducts.slice(skip, skip + limit),
      total: filteredProducts.length,
      skip,
      limit,
    };
  }

  // Search products.
  if (query) {
    const params = new URLSearchParams({
      q: query,
      limit: String(limit),
      skip: String(skip),
    });

    return request(`${BASE_URL}/search?${params}`);
  }

  // Get products by category.
  if (category !== "all") {
    const params = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
    });

    return request(
      `${BASE_URL}/category/${encodeURIComponent(category)}?${params}`
    );
  }

  // Get all products with pagination.
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  return request(`${BASE_URL}?${params}`);
}

export async function addProduct(productData) {
  return request(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
}
