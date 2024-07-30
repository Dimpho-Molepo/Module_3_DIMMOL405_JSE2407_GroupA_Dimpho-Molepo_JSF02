import { writable, derived } from 'svelte/store';

function createProductStore() {
  const { subscribe, set, update } = writable({
    products: [],
    categories: [],
    loading: false,
    error: null,
    filter: '',
    sort: ''
  });

  return {
    subscribe,
    fetchProducts: async () => {
      update(store => ({ ...store, loading: true }));
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        update(store => ({ ...store, products, loading: false, error: null }));
      } catch (error) {
        update(store => ({ ...store, loading: false, error: error.message }));
      }
    },
    fetchCategories: async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const categories = await response.json();
        update(store => ({ ...store, categories }));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        update(store => ({ ...store, error: error.message }));
      }
    },
    setFilter: (category) => update(store => ({ ...store, filter: category })),
    setSort: (sortOption) => update(store => ({ ...store, sort: sortOption })),
    resetFilters: () => update(store => ({ ...store, filter: '', sort: '' }))
  };
}

export const productStore = createProductStore();

export const filteredSortedProducts = derived(
  productStore,
  $store => {
    let filteredProducts = $store.filter 
      ? $store.products.filter(p => p.category === $store.filter)
      : $store.products;

    if ($store.sort === 'lowToHigh') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if ($store.sort === 'highToLow') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }
);