<script>
  import FadeInStagger from './FadeInStagger.svelte';
  
  /**
   * List component - container for list items with staggered fade-in animation
   * 
   * Based on original React implementation:
   * - Wraps children in FadeInStagger for sequential animation
   * - Uses semantic <ul> element with role="list"
   * - Applies base text styling (text-base text-neutral-600)
   * 
   * @prop {string} class - Additional CSS classes
   * @prop {Snippet} children - ListItem components
   */
  let { class: className = '', children } = $props();
</script>

<FadeInStagger>
  <ul role="list" class="text-base text-neutral-600 {className}">
    {@render children?.()}
  </ul>
</FadeInStagger>
