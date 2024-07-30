<script>
  import { onMount } from 'svelte';
  import ProductDetail from './ProductDetail.svelte';
  import ProductSkeleton from './ProductSkeleton.svelte';

  export let id;

  let product = null;
  let error = null;
  let loading = true;

  onMount(() => {
    fetchProduct(id);
  });

  async function fetchProduct(productId) {
    loading = true;
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      product = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function backButton() {
    window.history.back();
  }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="absolute top-20 left-4 sm:left-6 lg:left-8">
    <button on:click={backButton} class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
      Back to Products
    </button>
  </div>
  
  <div class="mt-28 sm:mt-32">
    {#if error}
      <div class="text-red-500 text-xl font-bold text-center">{error}</div>
    {:else if loading}
      <ProductSkeleton />
    {:else if product}
      <ProductDetail {...product} />
    {:else}
      <div class="text-red-500 text-xl font-bold text-center">Product not found</div>
    {/if}
  </div>
</div>