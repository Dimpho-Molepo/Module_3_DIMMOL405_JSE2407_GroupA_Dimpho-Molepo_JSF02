import { writable, derived } from "svelte/store";
import { filterSortStore } from "./DefaultSortFilter";

function createProductStore() {
  const { subscribe, update } = writable({
    products: [],
    categories: [],
    loading: false,
    error: null,
  });

  return {
    subscribe,
    fetchProducts: async () => {
      update((store) => ({ ...store, loading: true }));
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        update((store) => ({
          ...store,
          products,
          loading: false,
          error: null,
        }));
      } catch (error) {
        update((store) => ({ ...store, loading: false, error: error.message }));
      }
    },
    fetchCategories: async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const categories = await response.json();
        update((store) => ({ ...store, categories }));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        update((store) => ({ ...store, error: error.message }));
      }
    },
  };
}

export const productStore = createProductStore();

export const filteredSortedProducts = derived(
  [productStore, filterSortStore],
  ([$productStore, $filterSortStore]) => {
    let filteredProducts = $filterSortStore.selectedCategory
      ? $productStore.products.filter((p) => p.category === $filterSortStore.selectedCategory)
      : $productStore.products;

    if ($filterSortStore.selectedSort === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if ($filterSortStore.selectedSort === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      // Default sorting: reset to original order
      filteredProducts.sort((a, b) => a.id - b.id);
    }

    return filteredProducts;
  }
);