<script>
  import { onMount } from 'svelte';
  import ProductCard from "./ProductCard.svelte";
  import CardSkeleton from "./CardSkeleton.svelte";
  import { productStore, filteredSortedProducts } from "../../store/ProductStore";

  onMount(() => {
    productStore.fetchProducts();
    productStore.fetchCategories();
  });
</script>

{#if $productStore.loading}
  <div class="grid justify-center">
    <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      {#each Array(20) as _}
        <CardSkeleton />
      {/each}
    </div>
  </div>
{:else if $productStore.error}
  <div class="grid justify-center">
    <p>Error: {$productStore.error}</p>
  </div>
{:else}
  <div class="grid justify-center">
    <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      {#each $filteredSortedProducts as product (product.id)}
        <ProductCard {...product} />
      {/each}
    </div>
  </div>
{/if}