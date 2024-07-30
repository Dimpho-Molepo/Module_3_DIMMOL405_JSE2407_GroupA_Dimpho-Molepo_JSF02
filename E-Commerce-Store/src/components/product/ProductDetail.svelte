<script>
  export let id, title, description, image, price, rating, category;
</script>
  
<div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="w-full h-full items-center justify-center flex lg:w-2/5 mb-8 lg:mb-0">
    <img src={image} alt={title} class="w-[50%] h-auto object-contain" />
  </div>
  <div class="w-full lg:w-3/5 lg:pl-8 space-y-4">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">{title}</h1>
    {#if rating}
      <div class="flex items-center gap-2 text-sm sm:text-base">
        <svg
          class="w-4 h-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <span>{rating.rate}</span>
        <span>Reviews: {rating.count}</span>
      </div>
    {/if}

    <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      {category}
    </span>

    <h3 class="text-xl sm:text-2xl font-bold">R{price}</h3>
    <button class="bg-cyan-700 hover:bg-cyan-900 w-full sm:w-auto text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
      Add To Cart
    </button>
    <h2 class="text-lg font-bold mt-6">Description</h2>
    <p class="text-sm sm:text-base">{description}</p>
  </div>
</div>