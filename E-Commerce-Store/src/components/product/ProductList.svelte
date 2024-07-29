<script>
  import { onMount } from 'svelte';
  import ProductCard from "./ProductCard.svelte";
  import CardSkeleton from "./CardSkeleton.svelte";
  // import Error from "../Error.svelte";
  import { productStore, filteredSortedProducts } from "../../store/ProductStore";

  onMount(() => {
    productStore.fetchProducts();
  });

  $: ({ loading, error } = $productStore);
</script>

{#if loading && !error}
  <div class="grid justify-center">
    <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      {#each Array(20) as _, index}
        <CardSkeleton {index} />
      {/each}
    </div>
  </div>
{:else if error}
  <div class="grid justify-center">
    <!-- <Error {...error} /> -->
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