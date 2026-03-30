<script>
  /**
   * Container component - provides consistent max-width and padding
   * Supports dynamic tag via `as` prop using svelte:element
   * 
   * @prop {string} as - HTML tag to render (default: 'div')
   * @prop {string} class - Additional CSS classes
   * @prop {Snippet} children - Child content
   */
  let { as = 'div', class: className = '', children } = $props();
</script>

<svelte:element this={as} class="mx-auto max-w-7xl px-6 lg:px-8 {className}">
  <div class="mx-auto max-w-2xl lg:max-w-none">
    {@render children?.()}
  </div>
</svelte:element>
