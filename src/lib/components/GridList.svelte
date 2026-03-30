<script>
  import FadeInStagger from './FadeInStagger.svelte';
  
  /**
   * GridList component - displays a responsive grid of items with staggered fade-in animation
   * 
   * Based on original React implementation:
   * - Uses FadeInStagger for sequential animation of children
   * - Responsive grid: 1 column on mobile, 2 on sm, 3 on lg
   * - Gap of 10 (2.5rem) between items
   * 
   * @prop {string} class - Additional CSS classes
   * @prop {Snippet} children - GridListItem components
   */
  let { class: className = '', children, ...restProps } = $props();
</script>

<FadeInStagger>
  <ul
    role="list"
    class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 {className}"
    {...restProps}
  >
    {@render children?.()}
  </ul>
</FadeInStagger>
