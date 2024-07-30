<script>
    import { productStore } from '../store/ProductStore';
  
    let selectedCategory = '';
    let selectedSort = '';
  
    function handleCategoryChange(event) {
      selectedCategory = event.target.value;
      productStore.setFilter(selectedCategory);
    }
  
    function handleSortChange(event) {
      selectedSort = event.target.value;
      productStore.setSort(selectedSort);
    }
  
    function resetFilters() {
      selectedCategory = '';
      selectedSort = '';
      productStore.resetFilters();
    }
  
    $: categories = $productStore.categories || [];
  </script>
  
  <div class="flex justify-center space-x-4 my-4">
    <select bind:value={selectedCategory} on:change={handleCategoryChange}>
      <option value="">All Categories</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  
    <select bind:value={selectedSort} on:change={handleSortChange}>
      <option value="">Sort by</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  
    <button on:click={resetFilters} class="bg-gray-200 px-4 py-2 rounded">Reset Filters</button>
  </div>