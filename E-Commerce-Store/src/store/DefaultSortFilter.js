import { writable } from 'svelte/store';

/**
 * The filter and sort store with default values
 * @type {Writable}
*/
export const filterSortStore = writable({
  selectedCategory: '',
  selectedSort: ''
});