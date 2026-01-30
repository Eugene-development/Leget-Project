<script>
  /**
   * Button component - renders as <a> when href is provided, otherwise <button>
   * Supports color inversion via `invert` prop
   * 
   * @prop {string|null} href - URL for link (renders as <a> if provided)
   * @prop {boolean} invert - Invert colors (white bg when true, dark bg when false)
   * @prop {string} class - Additional CSS classes
   * @prop {Snippet} children - Child content
   */
  let { 
    href = null, 
    invert = false, 
    class: className = '',
    children,
    ...restProps
  } = $props();
  
  const baseClasses = "inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition";
  
  // Color classes based on invert prop
  // invert=true: white background with dark text (for dark backgrounds)
  // invert=false: dark background with white text (for light backgrounds)
  $effect.pre(() => {});
  
  const colorClasses = $derived(
    invert 
      ? "bg-white text-neutral-950 hover:bg-neutral-200"
      : "bg-neutral-950 text-white hover:bg-neutral-800"
  );
  
  const allClasses = $derived(`${baseClasses} ${colorClasses} ${className}`);
</script>

{#if href}
  <a {href} class={allClasses} {...restProps}>
    <span class="relative top-px">
      {@render children?.()}
    </span>
  </a>
{:else}
  <button class={allClasses} {...restProps}>
    <span class="relative top-px">
      {@render children?.()}
    </span>
  </button>
{/if}
