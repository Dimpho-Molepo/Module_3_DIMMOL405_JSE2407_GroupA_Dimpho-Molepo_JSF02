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

  function backButton(){
    window.history.back();
  }
</script>

<div class="flex justify-center">
  <div>
    <button  on:click={backButton} class="absolute top-20 left-4 bg-blue-500 text-white px-4 py-2 rounded">
      Back to Products
    </button>
  </div>
  
  {#if error}
    <div class="mt-28 text-red-500 text-xl font-bold">Error: {error}</div>
  {:else if loading}
    <ProductSkeleton />
  {:else if product}
    <ProductDetail {...product} />
  {:else}
    <div class="mt-28 text-red-500 text-xl font-bold">Product not found</div>
  {/if}
</div>