import { writable, derived } from 'svelte/store';

function createProductStore() {
  const { subscribe, set, update } = writable({
    products: [],
    loading: false,
    error: null
  });

  return {
    subscribe,
    fetchProducts: async () => {
      update(store => ({ ...store, loading: true }));
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        set({ products, loading: false, error: null });
      } catch (error) {
        set({ products: [], loading: false, error: error.message });
      }
    }
  };
}

export const productStore = createProductStore();

export const filteredSortedProducts = derived(
  productStore,
  $productStore => $productStore.products
);