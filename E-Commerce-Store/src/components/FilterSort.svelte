<script>
  import { productStore } from '../store/ProductStore';
  import { filterSortStore } from '../store/DefaultSortFilter';

  function handleCategoryChange(event) {
    filterSortStore.update(state => ({ ...state, selectedCategory: event.target.value }));
  }

  function handleSortChange(event) {
    filterSortStore.update(state => ({ ...state, selectedSort: event.target.value }));
  }

  function resetFilters() {
    filterSortStore.set({ selectedCategory: '', selectedSort: '' });
  }

  $: categories = $productStore.categories || [];
</script>
  
<div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 max-w-6xl mx-auto">
  <div class="w-[50%] sm:w-auto">
   
    <select bind:value={$filterSortStore.selectedCategory} on:change={handleCategoryChange}
    class="w-full sm:w-48 md:w-64 p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">All Categories</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </div>
    
  
  <div class="w-[50%] sm:w-auto">
  
    <select bind:value={$filterSortStore.selectedSort} on:change={handleSortChange}
      class="w-full sm:w-48 md:w-64 p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Default Sorting</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  </div>
  
  <button 
    on:click={resetFilters} 
    class="w-[50%] sm:w-auto px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
  >
    Reset Filters
  </button>
</div>